import * as React from "react";
import { useParams, useLocation } from "wouter";
import { useGetProject } from "@workspace/api-client-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/circular-progress";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp, AlertTriangle, Users, BookOpen,
  Presentation, DollarSign, Activity, Target, Briefcase,
  ArrowLeft, MapPin, Star, CheckCircle, Swords, Map
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useProjectCandidates, type Candidate } from "@/lib/useProjectCandidates";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend
} from "recharts";
import { LocationMap, type MapZone } from "@/components/LocationMap";

function ScoreBar({ label, value, color = "#f59e0b" }: { label: string; value: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-bold text-foreground">{pct}%</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function levelToScore(level: string): number {
  if (level === "Very High") return 90;
  if (level === "High") return 70;
  if (level === "Medium") return 45;
  return 20;
}

function riskToScore(risk: string): number {
  if (risk === "Low") return 85;
  if (risk === "Medium") return 55;
  return 25;
}

const marketShareBadgeClass: Record<string, string> = {
  dominant: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-xs" style={{ color: p.fill || p.color }}>
            {p.name}: <strong>${p.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function CandidateCard({ candidate, t }: { candidate: Candidate; t: any }) {
  const skillsList = candidate.skills.split(",").slice(0, 4).map((s: string) => s.trim());
  const isAvailable = candidate.availability === "available";

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">
              {candidate.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm leading-tight">{candidate.name}</p>
              <p className="text-xs text-primary">{candidate.title}</p>
            </div>
            <Badge variant={isAvailable ? "success" : "secondary"} className="text-xs flex-shrink-0">
              {isAvailable ? (
                <><CheckCircle className="w-2.5 h-2.5 mr-1" />{t.dashboard.available}</>
              ) : t.dashboard.busy}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{candidate.bio}</p>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((skill: string) => (
              <span key={skill} className="text-xs px-2 py-0.5 bg-secondary rounded-md text-muted-foreground border border-border">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{candidate.location}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-primary" />{candidate.yearsExperience} {t.dashboard.yearsExp}</span>
            <span className="font-semibold text-foreground">{formatCurrency(candidate.monthlyRate)}{t.dashboard.perMonth}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface CompetitorData {
  name: string;
  type: string;
  presence: string;
  strength: string;
  weakness: string;
  marketShare: "dominant" | "high" | "medium" | "low";
}

interface LocationPayload {
  cityLat: number;
  cityLng: number;
  cityName: string;
  zones: MapZone[];
}

function CompetitorCard({ competitor }: { competitor: CompetitorData }) {
  const badgeCls = marketShareBadgeClass[competitor.marketShare] || marketShareBadgeClass.medium;
  return (
    <Card className="hover:border-primary/30 hover:shadow-md transition-all h-full">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 border border-violet-500/20 flex items-center justify-center flex-shrink-0 text-violet-400 font-bold text-lg">
            {competitor.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-foreground text-sm leading-tight">{competitor.name}</p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border font-semibold capitalize", badgeCls)}>
                {competitor.marketShare}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{competitor.type} · {competitor.presence}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Strength</p>
            <p className="text-xs text-muted-foreground leading-snug">{competitor.strength}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Weakness</p>
            <p className="text-xs text-muted-foreground leading-snug">{competitor.weakness}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const id = parseInt(params.id || "0");
  const { data: project, isLoading, error } = useGetProject(id);
  const { data: candidates, isLoading: candidatesLoading } = useProjectCandidates(id);
  const { t, isRTL } = useTranslation();

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        <p className="text-muted-foreground text-sm">{t.common.loading}</p>
      </div>
    );
  }

  if (error || !project) {
    return <div className="p-8 text-center text-destructive">{t.common.error}</div>;
  }

  const analysis = project.analysis;
  if (!analysis) return <div className="p-8 text-center text-muted-foreground">Analysis pending...</div>;

  // Parse competitor and location data
  let competitors: CompetitorData[] = [];
  let locationPayload: LocationPayload | null = null;
  try { competitors = JSON.parse((analysis as any).competitors || "[]"); } catch {}
  try { locationPayload = JSON.parse((analysis as any).bestLocations || "null"); } catch {}

  const radarData = [
    { subject: t.dashboard.feasibility, A: analysis.successScore },
    { subject: t.dashboard.marketDemand, A: levelToScore(analysis.marketDemand) },
    { subject: "Competitive Edge", A: 100 - levelToScore(analysis.competitionLevel) },
    { subject: "Safety", A: riskToScore(analysis.riskLevel) },
  ];

  const revenueData = [
    { name: "Mo 1", min: Math.round(analysis.estimatedRevenueMin * 0.4), max: Math.round(analysis.estimatedRevenueMax * 0.4) },
    { name: "Mo 3", min: Math.round(analysis.estimatedRevenueMin * 0.7), max: Math.round(analysis.estimatedRevenueMax * 0.7) },
    { name: "Mo 6", min: analysis.estimatedRevenueMin, max: analysis.estimatedRevenueMax },
    { name: "Mo 9", min: Math.round(analysis.estimatedRevenueMin * 1.2), max: Math.round(analysis.estimatedRevenueMax * 1.25) },
    { name: "Mo 12", min: Math.round(analysis.estimatedRevenueMin * 1.5), max: Math.round(analysis.estimatedRevenueMax * 1.6) },
  ];

  const successFactors = [
    { label: t.dashboard.feasibility, value: analysis.successScore },
    { label: t.dashboard.marketDemand, value: levelToScore(analysis.marketDemand), color: "#3b82f6" },
    { label: "Competitive Edge", value: 100 - levelToScore(analysis.competitionLevel), color: "#10b981" },
    { label: "Financial Safety", value: riskToScore(analysis.riskLevel), color: "#8b5cf6" },
  ];

  const riskColor = analysis.riskLevel === "High" ? "text-red-500" : analysis.riskLevel === "Medium" ? "text-amber-500" : "text-emerald-500";
  const riskBg = analysis.riskLevel === "High" ? "bg-red-500/10 border-red-500/20" : analysis.riskLevel === "Medium" ? "bg-amber-500/10 border-amber-500/20" : "bg-emerald-500/10 border-emerald-500/20";

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-16">
      {/* Back + Header */}
      <div className={cn("flex items-start gap-4", isRTL ? "flex-row-reverse" : "")}>
        <button
          onClick={() => setLocation("/projects")}
          className="mt-1 p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
        >
          <ArrowLeft className={cn("w-5 h-5", isRTL ? "rotate-180" : "")} />
        </button>
        <div className="flex-1">
          <div className={cn("flex items-center gap-3 mb-2 flex-wrap", isRTL ? "flex-row-reverse" : "")}>
            <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-wider text-xs">{project.businessType}</Badge>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> {t.dashboard.budget}: {formatCurrency(project.budget)}
            </span>
            {project.location && (
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {project.location.city}, {project.location.country}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">{project.businessName}</h1>
          {(project as any).productsOrServices && (
            <p className="mt-2 text-sm text-primary/80 font-medium">
              Products & Services: {(project as any).productsOrServices}
            </p>
          )}
        </div>
      </div>

      {/* Top Metrics */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card className="h-full bg-gradient-to-br from-card to-secondary/20 border-primary/20">
            <CardContent className="flex flex-col items-center justify-center p-8 h-full">
              <CircularProgress value={analysis.successScore} label={t.dashboard.feasibility} size={160} strokeWidth={10} />
              <p className="mt-5 text-center text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                {t.dashboard.scoreDescription}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-8 flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            <Card className={cn("border", riskBg)}>
              <CardContent className="p-5 flex flex-col items-center text-center gap-1.5">
                <AlertTriangle className={cn("w-7 h-7", riskColor)} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t.dashboard.riskLevel}</span>
                <span className={cn("text-base font-bold", riskColor)}>{analysis.riskLevel}</span>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-5 flex flex-col items-center text-center gap-1.5">
                <TrendingUp className="w-7 h-7 text-blue-400" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t.dashboard.marketDemand}</span>
                <span className="text-base font-bold text-blue-400">{analysis.marketDemand}</span>
              </CardContent>
            </Card>
            <Card className="bg-violet-500/5 border-violet-500/20">
              <CardContent className="p-5 flex flex-col items-center text-center gap-1.5">
                <Activity className="w-7 h-7 text-violet-400" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{t.dashboard.competition}</span>
                <span className="text-base font-bold text-violet-400">{analysis.competitionLevel}</span>
              </CardContent>
            </Card>
          </div>
          <Card className="flex-1 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4" />{t.dashboard.estimatedRevenue}
              </span>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {formatCurrency(analysis.estimatedRevenueMin)}
                <span className="text-muted-foreground font-light mx-3">–</span>
                {formatCurrency(analysis.estimatedRevenueMax)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{t.dashboard.perMonth}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div variants={item}>
        <h3 className="text-xl font-bold mb-5 border-b border-border/50 pb-3">{t.dashboard.analysisCharts}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t.dashboard.metricsRadar}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t.dashboard.revenueProjection}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "11px", color: "hsl(var(--muted-foreground))" }} />
                  <Bar dataKey="min" name="Conservative" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="max" name="Optimistic" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t.dashboard.successFactors}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-2">
              {successFactors.map((f) => (
                <ScoreBar key={f.label} label={f.label} value={f.value} color={f.color} />
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Competitors Section */}
      {competitors.length > 0 && (
        <motion.div variants={item}>
          <div className={cn("flex items-end justify-between mb-5 border-b border-border/50 pb-3", isRTL ? "flex-row-reverse" : "")}>
            <div className={isRTL ? "text-right" : ""}>
              <h3 className="text-xl font-bold">Competitor Landscape</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Real competitors in your business category — know their strengths & exploit their weaknesses
              </p>
            </div>
            <Swords className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {competitors.map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <CompetitorCard competitor={comp} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Best Selling Locations Map */}
      {locationPayload && locationPayload.zones && locationPayload.zones.length > 0 && (
        <motion.div variants={item}>
          <div className={cn("flex items-end justify-between mb-5 border-b border-border/50 pb-3", isRTL ? "flex-row-reverse" : "")}>
            <div className={isRTL ? "text-right" : ""}>
              <h3 className="text-xl font-bold">Best Selling Locations in {locationPayload.cityName}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Top commercial zones matched to your business type — click markers for zone details
              </p>
            </div>
            <Map className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LocationMap
                cityLat={locationPayload.cityLat}
                cityLng={locationPayload.cityLng}
                cityName={locationPayload.cityName}
                zones={locationPayload.zones}
              />
            </div>
            <div className="space-y-3">
              {locationPayload.zones.map((zone, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="font-semibold text-foreground text-sm leading-tight">{zone.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize flex-shrink-0">
                      {zone.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{zone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Suggested Candidates */}
      <motion.div variants={item}>
        <div className={cn("flex items-end justify-between mb-5 border-b border-border/50 pb-3", isRTL ? "flex-row-reverse" : "")}>
          <div className={isRTL ? "text-right" : ""}>
            <h3 className="text-xl font-bold">{t.dashboard.suggestedCandidates}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{t.dashboard.suggestedCandidatesDesc}</p>
          </div>
          <Users className="w-5 h-5 text-primary flex-shrink-0" />
        </div>
        {candidatesLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : candidates && candidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {candidates.map((candidate, i) => (
              <motion.div key={candidate.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <CandidateCard candidate={candidate} t={t} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground border border-dashed rounded-xl">
            No candidates found for this project type.
          </div>
        )}
      </motion.div>

      {/* Strategic Breakdown */}
      <motion.div variants={item}>
        <h3 className="text-xl font-bold mb-5 border-b border-border/50 pb-3">{t.dashboard.strategicBreakdown}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />{t.dashboard.executiveSummary}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed text-sm">{analysis.explanation}</CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-primary flex-shrink-0" />{t.dashboard.marketAnalysis}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed text-sm">{analysis.marketAnalysis}</CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />{t.dashboard.pricingStrategy}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed text-sm">{analysis.pricingStrategy}</CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Presentation className="w-5 h-5 text-primary flex-shrink-0" />{t.dashboard.marketingBranding}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-foreground mb-1">{t.dashboard.marketing}</p>
                <p className="text-muted-foreground leading-relaxed">{analysis.marketingPlan}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">{t.dashboard.branding}</p>
                <p className="text-muted-foreground leading-relaxed">{analysis.brandingSuggestions}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="w-5 h-5 text-primary flex-shrink-0" />{t.dashboard.hiringNeeds}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed text-sm">{analysis.hiringNeeds}</CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
