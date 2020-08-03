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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Transaction_1 = __importDefault(require("../models/Transaction"));
var Category_1 = __importDefault(require("../models/Category"));
var ImportTransactionsService = /** @class */ (function () {
    function ImportTransactionsService() {
    }
    ImportTransactionsService.prototype.execute = function (_a) {
        var csv = _a.csv;
        return __awaiter(this, void 0, void 0, function () {
            var transactionRepository, categoryRepository, array, categories, transactions, existentCategories, existentCategoriesTitles, addCategories, newCategories, finalCategories, createdTransactions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transactionRepository = typeorm_1.getRepository(Transaction_1.default);
                        categoryRepository = typeorm_1.getRepository(Category_1.default);
                        array = csv.split('\n');
                        array.splice(0, 1);
                        array.splice(array.length - 1, 1);
                        categories = array.map(function (line) {
                            var _a = line.split(', '), category = _a[3];
                            return category;
                        });
                        transactions = array.map(function (line) {
                            var _a = line.split(', '), title = _a[0], type = _a[1], value = _a[2], category = _a[3];
                            return { title: title, type: type, value: value, category: category };
                        });
                        return [4 /*yield*/, categoryRepository.find({
                                where: {
                                    title: typeorm_1.In(categories),
                                },
                            })];
                    case 1:
                        existentCategories = _b.sent();
                        existentCategoriesTitles = existentCategories.map(function (category) {
                            return category.title;
                        });
                        addCategories = categories
                            .filter(function (category) { return !existentCategoriesTitles.includes(category); })
                            .filter(function (value, index, self) { return self.indexOf(value) === index; });
                        newCategories = categoryRepository.create(addCategories.map(function (title) { return ({ title: title }); }));
                        return [4 /*yield*/, categoryRepository.save(newCategories)];
                    case 2:
                        _b.sent();
                        finalCategories = __spreadArrays(newCategories, existentCategories);
                        createdTransactions = transactionRepository.create(transactions.map(function (transaction) { return ({
                            title: transaction.title,
                            type: transaction.type,
                            value: Number(transaction.value),
                            category: finalCategories.find(function (category) { return category.title === transaction.category; }),
                        }); }));
                        return [4 /*yield*/, transactionRepository.save(createdTransactions)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, createdTransactions];
                }
            });
        });
    };
    return ImportTransactionsService;
}());
exports.default = ImportTransactionsService;
