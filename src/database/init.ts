import * as SQLite from "expo-sqlite";
import { db } from "./database";

type Tx = SQLite.SQLiteDatabase
export const initDB = () => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS courses (
        course_id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        description_short TEXT,
        instructor_name TEXT,
        instructor_expertise_level TEXT,
        duration_weeks INTEGER,
        price_usd REAL,
        is_premium INTEGER,
        tags TEXT,
        rating REAL,
        last_updated TEXT,
        is_enrolled INTEGER DEFAULT 0
      );
    `)
};