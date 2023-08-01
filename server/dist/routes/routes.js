"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../api");
const storiesRouter = express_1.default.Router();
var ROUTES;
(function (ROUTES) {
    ROUTES["MAIN"] = "/";
    ROUTES["NEWS_PAGE"] = "/:id";
})(ROUTES || (ROUTES = {}));
const storiesTimeSortFunction = (a, b) => {
    return b.time - a.time;
};
storiesRouter.get(ROUTES.MAIN, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storiesIDs = yield (0, api_1.getNewsIds)(true);
    const data = yield (0, api_1.getNewsByIds)(storiesIDs);
    const sortedData = data.sort(storiesTimeSortFunction);
    res.json({ data: sortedData });
}));
storiesRouter.get(ROUTES.NEWS_PAGE, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const storyId = Number(req.params.id);
    if (!storyId) {
        res.send({ data: "Please enter id" });
    }
    const storyInformation = yield (0, api_1.getNewsById)(storyId);
    const comments = yield (0, api_1.getNewsByIds)((_a = storyInformation === null || storyInformation === void 0 ? void 0 : storyInformation.kids) !== null && _a !== void 0 ? _a : []);
    const data = {
        story: storyInformation,
        comments,
    };
    res.json({ data });
}));
exports.default = storiesRouter;
