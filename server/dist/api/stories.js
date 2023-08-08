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
exports.getNewsById = exports.getNewsByIds = exports.getNewsIds = exports._apiLimit = exports.HACKER_SUFFIX = exports.HACKER_URL = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
exports.HACKER_URL = "https://hacker-news.firebaseio.com/v0/";
exports.HACKER_SUFFIX = ".json?print=pretty";
exports._apiLimit = 100;
const getNewsIds = (useLimit = false) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${exports.HACKER_URL}newstories${exports.HACKER_SUFFIX}`;
    const response = yield axios_1.default.get(url);
    if ((0, utils_1.isResponseSuccess)(response) && Array.isArray(response.data)) {
        if (useLimit) {
            const slicedIDs = response.data.slice(0, exports._apiLimit);
            return slicedIDs;
        }
        else {
            return response.data;
        }
    }
    return [];
});
exports.getNewsIds = getNewsIds;
const getNewsByIds = (storiesIDs) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, utils_1.concurencyBalancer)(50, storiesIDs, exports.getNewsById);
    return result;
});
exports.getNewsByIds = getNewsByIds;
const getNewsById = (newsId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${exports.HACKER_URL}item/${newsId}${exports.HACKER_SUFFIX}`;
    const response = yield axios_1.default.get(url);
    if ((0, utils_1.isResponseSuccess)(response)) {
        return response.data;
    }
    return null;
});
exports.getNewsById = getNewsById;
