"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const app_1 = __importDefault(require("./app"));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Database connected");
    const PORT = process.env.PORT || 4000;
    app_1.default.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
    .catch((err) => console.error("❌ Database connection failed:", err));
//# sourceMappingURL=server.js.map