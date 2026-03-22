import json
import os
import sys
from contextlib import asynccontextmanager
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db import fetchall, fetchone, execute, count_table, get_connection
from services.analysis_engine import AnalysisInput, run_analysis
from services.seed import seed_if_empty


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        seed_if_empty()
    except Exception as e:
        print(f"[startup] Seed failed: {e}", file=sys.stderr, flush=True)
    yield


app = FastAPI(root_path="/api", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def parse_json_field(value: Any) -> Any:
    if isinstance(value, str):
        try:
            return json.loads(value)
        except Exception:
            return value
    return value


def iso(dt) -> str | None:
    return dt.isoformat() if dt else None


# ─── Health ──────────────────────────────────────────────────────────────────

@app.get("/healthz")
def healthz():
    return {"status": "ok", "server": "FastAPI"}


# ─── Categories ──────────────────────────────────────────────────────────────

@app.get("/categories")
def list_categories():
    return fetchall("SELECT id, name, description, icon FROM categories ORDER BY name ASC")


@app.get("/categories/{category_id}")
def get_category(category_id: int):
    row = fetchone("SELECT id, name, description, icon FROM categories WHERE id = %s", [category_id])
    if not row:
        raise HTTPException(status_code=404, detail="Category not found")
    return row


# ─── Locations ────────────────────────────────────────────────────────────────

@app.get("/locations")
def list_locations():
    rows = fetchall(
        "SELECT id, city, country, region, size_category AS \"sizeCategory\" FROM locations ORDER BY city ASC"
    )
    return rows


@app.get("/locations/{location_id}")
def get_location(location_id: int):
    row = fetchone(
        "SELECT id, city, country, region, size_category AS \"sizeCategory\" FROM locations WHERE id = %s",
        [location_id]
    )
    if not row:
        raise HTTPException(status_code=404, detail="Location not found")
    return row


def _fmt_location(row: dict) -> dict:
    return {
        "id": row.get("loc_id"),
        "city": row.get("city"),
        "country": row.get("country"),
        "region": row.get("region"),
        "sizeCategory": row.get("size_category"),
    }


def _fmt_category(row: dict) -> dict:
    return {
        "id": row.get("cat_id"),
        "name": row.get("cat_name"),
        "description": row.get("cat_desc"),
        "icon": row.get("cat_icon"),
    }


# ─── Projects ─────────────────────────────────────────────────────────────────

class CreateProjectBody(BaseModel):
    businessName: str
    businessType: str
    description: str
    budget: float
    targetAudience: str
    productsOrServices: str = ""
    categoryId: int
    locationId: int


PROJECTS_SELECT = """
    SELECT
        p.id, p.business_name, p.business_type, p.description,
        p.budget, p.target_audience, p.products_or_services,
        p.category_id, p.location_id, p.created_at,
        c.id AS cat_id, c.name AS cat_name, c.description AS cat_desc, c.icon AS cat_icon,
        l.id AS loc_id, l.city, l.country, l.region, l.size_category
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN locations l ON p.location_id = l.id
"""


def _fmt_project(row: dict, analysis: dict | None = None) -> dict:
    out = {
        "id": row["id"],
        "businessName": row["business_name"],
        "businessType": row["business_type"],
        "description": row["description"],
        "budget": float(row["budget"]) if row["budget"] is not None else 0,
        "targetAudience": row["target_audience"],
        "productsOrServices": row.get("products_or_services", ""),
        "categoryId": row["category_id"],
        "locationId": row["location_id"],
        "createdAt": iso(row.get("created_at")),
        "category": _fmt_category(row) if row.get("cat_id") else None,
        "location": _fmt_location(row) if row.get("loc_id") else None,
    }
    if analysis is not None:
        out["analysis"] = analysis
    return out


def _fmt_analysis(row: dict | None) -> dict | None:
    if not row:
        return None
    return {
        "id": row["id"],
        "projectId": row["project_id"],
        "successScore": row["success_score"],
        "riskLevel": row["risk_level"],
        "marketDemand": row["market_demand"],
        "competitionLevel": row["competition_level"],
        "estimatedRevenueMin": row["estimated_revenue_min"],
        "estimatedRevenueMax": row["estimated_revenue_max"],
        "explanation": row["explanation"],
        "marketAnalysis": row["market_analysis"],
        "pricingStrategy": row["pricing_strategy"],
        "marketingPlan": row["marketing_plan"],
        "brandingSuggestions": row["branding_suggestions"],
        "hiringNeeds": row["hiring_needs"],
        "competitors": parse_json_field(row["competitors"]),
        "bestLocations": parse_json_field(row["best_locations"]),
        "createdAt": iso(row.get("created_at")),
    }


@app.get("/projects")
def list_projects():
    rows = fetchall(PROJECTS_SELECT + " ORDER BY p.created_at DESC")
    return [_fmt_project(r) for r in rows]


@app.post("/projects", status_code=201)
def create_project(body: CreateProjectBody):
    category = fetchone("SELECT id, name, description, icon FROM categories WHERE id = %s", [body.categoryId])
    if not category:
        raise HTTPException(status_code=400, detail="Category not found")

    location = fetchone(
        "SELECT id, city, country, region, size_category FROM locations WHERE id = %s",
        [body.locationId]
    )
    if not location:
        raise HTTPException(status_code=400, detail="Location not found")

    products = body.productsOrServices or ""

    project_row = execute(
        """INSERT INTO projects
           (business_name, business_type, description, budget, target_audience,
            products_or_services, category_id, location_id)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
           RETURNING id, business_name, business_type, description, budget,
           target_audience, products_or_services, category_id, location_id, created_at
        """,
        [body.businessName, body.businessType, body.description, str(body.budget),
         body.targetAudience, products, body.categoryId, body.locationId]
    )

    inp = AnalysisInput(
        businessType=body.businessType,
        description=body.description,
        budget=body.budget,
        targetAudience=body.targetAudience,
        productsOrServices=products,
        categoryName=category["name"],
        locationSizeCategory=location["size_category"],
        city=location["city"],
        country=location["country"],
    )
    ar = run_analysis(inp)

    analysis_row = execute(
        """INSERT INTO analyses
           (project_id, success_score, risk_level, market_demand, competition_level,
            estimated_revenue_min, estimated_revenue_max, explanation, market_analysis,
            pricing_strategy, marketing_plan, branding_suggestions, hiring_needs,
            competitors, best_locations)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
           RETURNING id, project_id, success_score, risk_level, market_demand,
           competition_level, estimated_revenue_min, estimated_revenue_max,
           explanation, market_analysis, pricing_strategy, marketing_plan,
           branding_suggestions, hiring_needs, competitors, best_locations, created_at
        """,
        [project_row["id"], ar.successScore, ar.riskLevel, ar.marketDemand, ar.competitionLevel,
         ar.estimatedRevenueMin, ar.estimatedRevenueMax, ar.explanation, ar.marketAnalysis,
         ar.pricingStrategy, ar.marketingPlan, ar.brandingSuggestions, ar.hiringNeeds,
         ar.competitors, ar.bestLocations]
    )

    project_row["cat_id"] = category["id"]
    project_row["cat_name"] = category["name"]
    project_row["cat_desc"] = category["description"]
    project_row["cat_icon"] = category["icon"]
    project_row["loc_id"] = location["id"]
    project_row["city"] = location["city"]
    project_row["country"] = location["country"]
    project_row["region"] = location["region"]
    project_row["size_category"] = location["size_category"]
    project_row["category_id"] = body.categoryId
    project_row["location_id"] = body.locationId

    return _fmt_project(project_row, _fmt_analysis(analysis_row))


@app.get("/projects/{project_id}")
def get_project(project_id: int):
    row = fetchone(PROJECTS_SELECT + " WHERE p.id = %s", [project_id])
    if not row:
        raise HTTPException(status_code=404, detail="Project not found")

    analysis_row = fetchone(
        """SELECT id, project_id, success_score, risk_level, market_demand, competition_level,
           estimated_revenue_min, estimated_revenue_max, explanation, market_analysis,
           pricing_strategy, marketing_plan, branding_suggestions, hiring_needs,
           competitors, best_locations, created_at
           FROM analyses WHERE project_id = %s""",
        [project_id]
    )
    return _fmt_project(row, _fmt_analysis(analysis_row))


@app.delete("/projects/{project_id}")
def delete_project(project_id: int):
    existing = fetchone("SELECT id FROM projects WHERE id = %s", [project_id])
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    execute("DELETE FROM analyses WHERE project_id = %s", [project_id])
    execute("DELETE FROM projects WHERE id = %s", [project_id])
    return {"message": "Project deleted successfully"}


# ─── Jobs ─────────────────────────────────────────────────────────────────────

def _fmt_job(row: dict) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "company": row["company"],
        "description": row["description"],
        "requiredSkills": parse_json_field(row["required_skills"]),
        "salaryMin": row["salary_min"],
        "salaryMax": row["salary_max"],
        "jobType": row["job_type"],
        "location": row["location"],
        "experienceLevel": row["experience_level"],
        "isActive": row["is_active"],
        "createdAt": iso(row.get("created_at")),
    }


@app.get("/jobs")
def list_jobs():
    rows = fetchall(
        """SELECT id, title, company, description, required_skills, salary_min, salary_max,
           job_type, location, experience_level, is_active, created_at
           FROM jobs WHERE is_active = TRUE ORDER BY created_at DESC"""
    )
    return [_fmt_job(r) for r in rows]


@app.get("/jobs/{job_id}")
def get_job(job_id: int):
    row = fetchone(
        """SELECT id, title, company, description, required_skills, salary_min, salary_max,
           job_type, location, experience_level, is_active, created_at
           FROM jobs WHERE id = %s""",
        [job_id]
    )
    if not row:
        raise HTTPException(status_code=404, detail="Job not found")
    return _fmt_job(row)


class ApplyBody(BaseModel):
    applicantName: str
    email: str
    phone: str = ""
    skills: str = ""
    yearsOfExperience: int = 0
    coverLetter: str = ""
    cvText: str = ""


@app.post("/jobs/{job_id}/apply", status_code=201)
def apply_for_job(job_id: int, body: ApplyBody):
    job = fetchone("SELECT id FROM jobs WHERE id = %s AND is_active = TRUE", [job_id])
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    app_row = execute(
        """INSERT INTO applications
           (job_id, applicant_name, email, phone, skills,
            years_of_experience, cover_letter, cv_text, status)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
           RETURNING id, job_id, applicant_name, email, status, created_at
        """,
        [job_id, body.applicantName, body.email, body.phone, body.skills,
         body.yearsOfExperience, body.coverLetter, body.cvText, "pending"]
    )

    return {
        "id": app_row["id"],
        "jobId": app_row["job_id"],
        "applicantName": app_row["applicant_name"],
        "email": app_row["email"],
        "status": app_row["status"],
        "createdAt": iso(app_row.get("created_at")),
    }


# ─── Startup Ideas ─────────────────────────────────────────────────────────────

def _fmt_idea(row: dict) -> dict:
    return {
        "id": row["id"],
        "title": row["title"],
        "description": row["description"],
        "category": row["category"],
        "requiredBudget": row["required_budget"],
        "expectedReturn": float(row["expected_return"]) if row["expected_return"] is not None else 0,
        "riskLevel": row["risk_level"],
        "stage": row["stage"],
        "isFeatured": row["is_featured"],
        "createdAt": iso(row.get("created_at")),
    }


@app.get("/startup-ideas")
def list_startup_ideas():
    rows = fetchall(
        """SELECT id, title, description, category, required_budget, expected_return,
           risk_level, stage, is_featured, created_at
           FROM startup_ideas ORDER BY is_featured DESC, created_at DESC"""
    )
    return [_fmt_idea(r) for r in rows]


@app.get("/startup-ideas/{idea_id}")
def get_startup_idea(idea_id: int):
    row = fetchone(
        """SELECT id, title, description, category, required_budget, expected_return,
           risk_level, stage, is_featured, created_at
           FROM startup_ideas WHERE id = %s""",
        [idea_id]
    )
    if not row:
        raise HTTPException(status_code=404, detail="Startup idea not found")
    return _fmt_idea(row)


# ─── Candidates ───────────────────────────────────────────────────────────────

def _fmt_candidate(row: dict) -> dict:
    return {
        "id": row["id"],
        "name": row["name"],
        "title": row["title"],
        "skills": parse_json_field(row["skills"]),
        "yearsExperience": row["years_experience"],
        "bio": row["bio"],
        "availability": row["availability"],
        "monthlyRate": row["monthly_rate"],
        "location": row["location"],
        "categories": parse_json_field(row["categories"]),
    }


@app.get("/candidates")
def list_candidates():
    rows = fetchall(
        """SELECT id, name, title, skills, years_experience, bio, availability,
           monthly_rate, location, categories
           FROM candidates ORDER BY name ASC"""
    )
    return [_fmt_candidate(r) for r in rows]


@app.get("/candidates/{candidate_id}")
def get_candidate(candidate_id: int):
    row = fetchone(
        """SELECT id, name, title, skills, years_experience, bio, availability,
           monthly_rate, location, categories
           FROM candidates WHERE id = %s""",
        [candidate_id]
    )
    if not row:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return _fmt_candidate(row)


# ─── Admin ─────────────────────────────────────────────────────────────────────

@app.get("/admin/stats")
def admin_stats():
    return {
        "projects": count_table("projects"),
        "categories": count_table("categories"),
        "locations": count_table("locations"),
        "jobs": count_table("jobs"),
        "startupIdeas": count_table("startup_ideas"),
        "candidates": count_table("candidates"),
        "applications": count_table("applications"),
    }


@app.post("/admin/reseed")
def admin_reseed():
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM analyses")
            cur.execute("DELETE FROM projects")
            cur.execute("DELETE FROM applications")
            cur.execute("DELETE FROM jobs")
            cur.execute("DELETE FROM startup_ideas")
            cur.execute("DELETE FROM candidates")
            cur.execute("DELETE FROM locations")
            cur.execute("DELETE FROM categories")
            conn.commit()
    finally:
        conn.close()
    seed_if_empty()
    return {"message": "Database reseeded successfully"}
