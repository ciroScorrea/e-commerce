//Node module to work with files and directories
const path = require('path') 
//Web Micro-Framework  
const express = require('express')
//Express.js view engine for handlebars.js
const hbs = require('hbs')

// Define paths for Express concatenating __dirname (project directory) with the subsequent string
const publicDirectory = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'E-commerce',
        name: 'Ciro'
    })
})


module.exports = app