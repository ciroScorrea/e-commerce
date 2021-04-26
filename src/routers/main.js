const express = require('express')
const router = new express.Router()
const Product = require('../models/product')

const app = express()

router.get('/', async (req,res) => {
    res.render('index')
})

module.exports = router