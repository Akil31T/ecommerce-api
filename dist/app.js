"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = require("./app/modules/products/product.routes");
const app = (0, express_1.default)();
const port = 5000;
// parse option
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/products', product_routes_1.ProductRoutes);
app.get('/', (req, res) => {
    res.send('E-Commerce server is runing');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
