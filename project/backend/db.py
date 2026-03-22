import os
import psycopg2
import psycopg2.extras

DATABASE_URL = os.environ.get("DATABASE_URL", "")


def get_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn


def fetchall(sql: str, params=None):
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(sql, params or [])
            return [dict(row) for row in cur.fetchall()]
    finally:
        conn.close()


def fetchone(sql: str, params=None):
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(sql, params or [])
            row = cur.fetchone()
            return dict(row) if row else None
    finally:
        conn.close()


def execute(sql: str, params=None):
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(sql, params or [])
            conn.commit()
            try:
                row = cur.fetchone()
                return dict(row) if row else None
            except Exception:
                return None
    finally:
        conn.close()


def execute_many(sql: str, params_list: list):
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            psycopg2.extras.execute_batch(cur, sql, params_list)
            conn.commit()
    finally:
        conn.close()


def count_table(table: str) -> int:
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(f"SELECT COUNT(*) FROM {table}")
            return cur.fetchone()[0]
    finally:
        conn.close()
