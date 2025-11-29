"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
mongoose_1.default
    .connect(config_1.default.db_url)
    .then(() => {
    console.log("✅ MongoDB connected");
})
    .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
});
module.exports = app_1.default;
