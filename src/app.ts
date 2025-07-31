// const express = require('express')
import express from "express"
import cors from 'cors';
import { ProductRoutes } from "./app/modules/products/product.routes";
import path from "path";


const app = express()
const port = 5000

// parse option
app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); 

// Routes
app.use('/api/products', ProductRoutes)


app.get('/', (req, res) => {
  res.send('E-Commerce server is runing')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app