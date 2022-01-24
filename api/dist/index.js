"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Initialize app
var app_1 = require("./src/app");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.listen(process.env.PORT, function () {
    console.log("Example app listening at port:", process.env.PORT);
});
app.use(app_1.router);
//# sourceMappingURL=index.js.map