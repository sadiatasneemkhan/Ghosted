import pool from "./db.js"; // Adjust the path according to your project structure

async function testDbConnection() {
  try {
    const [rows] = await pool.query("SELECT VERSION()");
    console.log(
      "Database connection successful. MySQL version is:",
      rows[0]["VERSION()"]
    );
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

testDbConnection();
