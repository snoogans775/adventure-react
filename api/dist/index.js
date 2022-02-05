"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Initialize app
var app_1 = require("./src/app");
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var app = express_1.default();
var log = function (target, name, descriptor) {
    console.log('inside a decorator');
    console.log(target, name, descriptor);
};
var Example = /** @class */ (function () {
    function Example() {
        this.test();
    }
    Example.prototype.test = function () {
        console.log('inside a class');
    };
    __decorate([
        log
    ], Example.prototype, "test", null);
    return Example;
}());
var example = new Example();
example.test();
app.listen(process.env.PORT, function () {
    console.log("Example app listening at port:", process.env.PORT);
});
app.use(app_1.router);
//# sourceMappingURL=index.js.map