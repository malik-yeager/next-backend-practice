import "reflect-metadata"
import { AppDataSource } from "./config/data-source"
import app from "./app"

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected")
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => console.error("❌ Database connection failed:", err))
