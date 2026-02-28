"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHome = void 0;
const home_1 = require("../services/home");
const getHome = (req, res) => {
    const data = (0, home_1.getHomeData)();
    res.json(data);
};
exports.getHome = getHome;
//# sourceMappingURL=home.controller.js.map