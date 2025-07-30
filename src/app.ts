// const express = require('express')
import express from "express"
import cors from 'cors';
import { ProductRoutes } from "./app/modules/products/product.routes";


const app = express()
const port = 5000

// parse option
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', ProductRoutes)


app.get('/', (req, res) => {
  res.send('E-Commerce server is runing')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app