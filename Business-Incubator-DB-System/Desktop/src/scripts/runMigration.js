const db = require("../electron/backend/config/database.cjs");
const fs = require("fs").promises;
const path = require("path");

async function applyMigration() {
  try {
    const migrationsDir = path.join(process.cwd(), "../database/migrations");

    // Read all migration files from the migrations directory
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files.filter((file) => file.endsWith(".sql")).sort();

    if (migrationFiles.length === 0) {
      console.log("ℹ️  No migration files found.");
      process.exit(0);
    }

    console.log(
      `🔄 Found ${migrationFiles.length} migration file(s). Starting execution...\n`,
    );

    for (const file of migrationFiles) {
      console.log(`🔄 Running migration: ${file}...`);
      const migrationPath = path.join(migrationsDir, file);
      const sql = await fs.readFile(migrationPath, "utf-8");

      // Split SQL statements by semicolon and filter out empty ones
      const statements = sql
        .split(";")
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0);

      for (const statement of statements) {
        await db.query(statement);
        console.log("  ✅ Executed:", statement.substring(0, 80) + "...");
      }

      console.log(`✅ Migration ${file} completed!\n`);
    }

    console.log("✅ All migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

applyMigration();
