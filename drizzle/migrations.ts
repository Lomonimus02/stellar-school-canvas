import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "@shared/schema";
import * as dotenv from "dotenv";

dotenv.config();

async function runMigrations() {
  const DATABASE_URL = process.env.DATABASE_URL || '';
  
  if (!DATABASE_URL) {
    console.error("DATABASE_URL not found in environment variables");
    process.exit(1);
  }
  
  const migrationClient = postgres(DATABASE_URL, { max: 1 });
  
  try {
    console.log("Starting database migration...");
    
    // Add the schedule_date column to the schedules table if it doesn't exist
    await migrationClient`
      DO 4303
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'schedules' AND column_name = 'schedule_date'
        ) THEN
          ALTER TABLE schedules ADD COLUMN schedule_date DATE;
        END IF;
      END 4303;
    `;
    
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

runMigrations();
