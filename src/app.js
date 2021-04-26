//Web Micro-Framework  
const express = require('express')
//Mongoose MongoDB Object Modeling Tool designed to work in asynchronous environment, supporting promises and callbacks.
require('./db/mongoose')
//Node module to work with files and directories
const path = require('path') 
//Express.js view engine for handlebars.js
const hbs = require('hbs')
// Define paths for Express concatenating __dirname (project directory) with the subsequent string
const publicDirectory = path.join(__dirname, '../public/')
console.log('Public: ', publicDirectory)
const viewsPath = path.join(__dirname, '../templates/views')
console.log('Views: ', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
console.log('Path: ', partialsPath)

// Routers
const productRouter = require('./routers/product.js')
const mainRouter = require('./routers/main.js')

const app = express()

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

//Converts to Json Automatically
app.use(express.json())
//
app.use(mainRouter)
app.use(productRouter)

module.exports = app
