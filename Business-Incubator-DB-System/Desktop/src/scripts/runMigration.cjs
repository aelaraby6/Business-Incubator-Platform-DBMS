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
        try {
          await db.query(statement);
          console.log("  ✅ Executed:", statement.substring(0, 80) + "...");
        } catch (error) {
          // Check if error is due to object already existing
          const alreadyExistsErrors = ["42701", "42P07", "42P06", "42P16"];
          const isDuplicateError = alreadyExistsErrors.includes(error.code);
          const isAlreadyExistsMessage =
            error.message?.includes("already exists");

          if (isDuplicateError || isAlreadyExistsMessage) {
            console.log(
              "  ⏭️  Skipped (already exists):",
              statement.substring(0, 80) + "...",
            );
          } else {
            throw error;
          }
        }
      }

      console.log(`✅ Migration ${file} completed!\n`);
    }

    console.log("✅ All migrations completed successfully!\n");

    // Run seeders
    await applySeeders();

    console.log("✅ All seeders completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

async function applySeeders() {
  try {
    const seedersDir = path.join(process.cwd(), "../database/seeders");

    // Check if seeders directory exists
    const seedersExist = await fs
      .access(seedersDir)
      .then(() => true)
      .catch(() => false);
    if (!seedersExist) {
      console.log("ℹ️  No seeders directory found.");
      return;
    }

    // Read all seeder files from the seeders directory
    const files = await fs.readdir(seedersDir);
    const seederFiles = files.filter((file) => file.endsWith(".sql")).sort();

    if (seederFiles.length === 0) {
      console.log("ℹ️  No seeder files found.");
      return;
    }

    console.log(
      `🔄 Found ${seederFiles.length} seeder file(s). Starting execution...\n`,
    );

    for (const file of seederFiles) {
      console.log(`🌱 Running seeder: ${file}...`);
      const seederPath = path.join(seedersDir, file);
      const sql = await fs.readFile(seederPath, "utf-8");

      // Split SQL statements by semicolon and filter out empty ones
      const statements = sql
        .split(";")
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0);

      for (const statement of statements) {
        try {
          await db.query(statement);
          console.log("  ✅ Executed:", statement.substring(0, 80) + "...");
        } catch (error) {
          // Check if error is due to object already existing or duplicate key
          const alreadyExistsErrors = [
            "42701",
            "42P07",
            "42P06",
            "42P16",
            "23505",
          ];
          const isDuplicateError = alreadyExistsErrors.includes(error.code);
          const isAlreadyExistsMessage =
            error.message?.includes("already exists") ||
            error.message?.includes("duplicate key");

          if (isDuplicateError || isAlreadyExistsMessage) {
            console.log(
              "  ⏭️  Skipped (already exists):",
              statement.substring(0, 80) + "...",
            );
          } else {
            throw error;
          }
        }
      }

      console.log(`✅ Seeder ${file} completed!\n`);
    }
  } catch (error) {
    console.error("❌ Seeder failed:", error.message);
    throw error;
  }
}

applyMigration();
