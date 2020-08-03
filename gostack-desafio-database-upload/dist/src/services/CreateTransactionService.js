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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var AppError_1 = __importDefault(require("../errors/AppError"));
var Category_1 = __importDefault(require("../models/Category"));
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService() {
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type, category = _a.category;
        return __awaiter(this, void 0, void 0, function () {
            var categoryRepository, transactionRepository, total, foundCategory, transaction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        categoryRepository = typeorm_1.getRepository(Category_1.default);
                        transactionRepository = typeorm_1.getCustomRepository(TransactionsRepository_1.default);
                        if (!(type === 'outcome')) return [3 /*break*/, 2];
                        return [4 /*yield*/, transactionRepository.getBalance()];
                    case 1:
                        total = (_b.sent()).total;
                        if (value > total) {
                            throw new AppError_1.default('Invalid balance', 400);
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, categoryRepository.findOne({
                            where: { title: category },
                        })];
                    case 3:
                        foundCategory = _b.sent();
                        if (!!foundCategory) return [3 /*break*/, 5];
                        foundCategory = categoryRepository.create({ title: category });
                        return [4 /*yield*/, categoryRepository.save(foundCategory)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        transaction = transactionRepository.create({
                            title: title,
                            value: value,
                            type: type,
                            category: foundCategory,
                        });
                        return [4 /*yield*/, transactionRepository.save(transaction)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
