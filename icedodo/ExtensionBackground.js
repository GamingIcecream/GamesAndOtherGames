"use strict";
// Do not import or export anything in this file. It is used as a background script for the Chrome extension.
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

var ExtensionBackground = /** @class */ (function () {
    function ExtensionBackground() {
        this.listenToMessages();
    }
    ExtensionBackground.prototype.onMessageReceived = function (code, payload, sendResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (code) {
                    case 'sync_extension_and_website':
                        void ExtensionBackground.syncExtensionAndWebsite(payload, sendResponse);
                        break;
                    case 'set_cloud_completed_maps':
                        void ExtensionBackground.setCloudCompletedMaps(payload, sendResponse);
                        break;
                    case 'clear_all_data':
                        void ExtensionBackground.clearAllData(payload, sendResponse);
                        break;
                    case 'set_favorite_map_ids':
                        void ExtensionBackground.setFavoriteMapIds(payload, sendResponse);
                        break;
                    default:
                        console.log('Unknown code: ' + code);
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    ExtensionBackground.prototype.listenToMessages = function () {
        var _this = this;
        chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
            if ((request.code == null) || (request.payload == null)) {
                console.error('Received message without code');
                return;
            }
            void _this.onMessageReceived(request.code, request.payload, sendResponse);
        });
    };
    ExtensionBackground.setStorageValue = function (key, value) {
        return new Promise(function (resolve) {
            var _a;
            var saveObject = (_a = {}, _a[key] = value, _a);
            chrome.storage.local.set(saveObject, function () {
                resolve();
            });
        });
    };
    ExtensionBackground.getStorageValue = function (key, valueIfNull) {
        return new Promise(function (resolve) {
            chrome.storage.local.get(key, function (result) {
                var _a, _b;
                resolve((_b = (_a = result[key]) !== null && _a !== void 0 ? _a : valueIfNull) !== null && _b !== void 0 ? _b : null);
            });
        });
    };
    ExtensionBackground.destroyEverything = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.clear();
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.local.clear(function () {
                            chrome.storage.sync.clear(function () {
                                resolve();
                            });
                        });
                    })];
            });
        });
    };
    ExtensionBackground.syncExtensionAndWebsite = function (remoteCompletedMapsStringified, sendResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var localCompletedMapsStringified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ExtensionBackground.setStorageValue('remoteCompletedMaps', remoteCompletedMapsStringified)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ExtensionBackground.getStorageValue('completedMaps', JSON.stringify([]))];
                    case 2:
                        localCompletedMapsStringified = _a.sent();
                        sendResponse(localCompletedMapsStringified);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtensionBackground.setCloudCompletedMaps = function (cloudCompletedMapsStringified, sendResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ExtensionBackground.setStorageValue('cloudCompletedMaps', cloudCompletedMapsStringified)];
                    case 1:
                        _a.sent();
                        sendResponse({});
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtensionBackground.clearAllData = function (payload, sendResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ExtensionBackground.destroyEverything()];
                    case 1:
                        _a.sent();
                        sendResponse({});
                        return [2 /*return*/];
                }
            });
        });
    };
    ExtensionBackground.setFavoriteMapIds = function (favoriteMapIdsStringified, sendResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ExtensionBackground.setStorageValue('favoriteMapIds', favoriteMapIdsStringified)];
                    case 1:
                        _a.sent();
                        sendResponse({});
                        return [2 /*return*/];
                }
            });
        });
    };
    return ExtensionBackground;
}());
new ExtensionBackground();
