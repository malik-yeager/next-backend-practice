import { AppDataSource } from "./src/config/data-source";

async function testConnection() {
    try {
        console.log("Attempting to connect to database...");
        console.log("Database URL present:", !!process.env.DATABASE_URL);
        await AppDataSource.initialize();
        console.log("✅ Database connected successfully!");
        await AppDataSource.destroy();
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
}

testConnection();
