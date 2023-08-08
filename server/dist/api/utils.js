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
Object.defineProperty(exports, "__esModule", { value: true });
exports.concurencyBalancer = exports.isResponseSuccess = void 0;
const isResponseSuccess = (response) => {
    return response.status == 200 && response.data;
};
exports.isResponseSuccess = isResponseSuccess;
const concurencyBalancer = (concurrencyLimit = 50, listOfArguments, asyncOperation) => __awaiter(void 0, void 0, void 0, function* () {
    const emptyArray = [];
    const argsCopy = emptyArray.concat(listOfArguments.map((value, index) => ({ value, index })));
    const result = new Array(listOfArguments.length);
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());
    function chainNext(p) {
        if (argsCopy.length) {
            const arg = argsCopy.shift();
            return p.then(() => {
                // Store the result into the array upon Promise completion
                if (!arg) {
                    return;
                }
                const operationPromise = asyncOperation(arg.value).then((r) => {
                    result[arg.index] = r;
                });
                return chainNext(operationPromise);
            });
        }
        return p;
    }
    yield Promise.all(promises.map(chainNext));
    return result;
});
exports.concurencyBalancer = concurencyBalancer;
