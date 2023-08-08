"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = 8000;
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
exports.app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'none'"],
        fontSrc: ["'self'", "https://fonts.googleapis.com"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
    },
}));
exports.app.get("/ping", (req, res) => {
    res.send("Pong");
});
exports.app.use("/api", routes_1.default);
exports.app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
