"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contracts = void 0;
const UserContract_1 = require("./User/UserContract");
var UserContract_2 = require("./User/UserContract");
Object.defineProperty(exports, "UserContract", { enumerable: true, get: function () { return UserContract_2.UserContract; } });
const CardContract_1 = require("./Card/CardContract");
var CardContract_2 = require("./Card/CardContract");
Object.defineProperty(exports, "CardContract", { enumerable: true, get: function () { return CardContract_2.CardContract; } });
exports.contracts = [CardContract_1.CardContract, UserContract_1.UserContract];
//# sourceMappingURL=index.js.map