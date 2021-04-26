const express = require('express')
//Multer: Middleware for handling `multipart/form-data`.
const multer = require('multer')
//Sharp: High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, AVIF and TIFF image
const sharp = require('sharp')
const router = new express.Router()
const Product = require('../models/product')

router.get('/products', async (req, res) => {
    const match = {}
    const sort = {}
/*
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 :0
    }

    try{
        await products.populate({
            path: 'products',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(products)
    } catch(e){
        res.status(500).send()
    }*/
    const products = await Product.find() 
    try{
        res.send(products)
    } catch(e){
        res.status(500).send()
    }
  })

router.get('/products/:id/image', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product || !product.image){
            throw new Error('Did not work !!!!!')
        } 
        res.set('Content-Type', 'image/jpg')
        res.send(product.image)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/newproduct', (req, res) => {
    res.render('newproduct')
})

router.post('/newproduct', /*auth, */ async (req, res)=>{
    const product = new Product({
        ...req.body //.... for spread
    })
    try{
        await product.save()
        res.status(201).send(product)
    } catch {
        res.status(500).send()
    }
})

const upload = multer({
    //dest: 'avatars', //when we comment this line, the file will be saved on a database, without  file system and it will be defined on router.post(users/me/avatar)
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please, just images are allowed.'))
        }
        cb(undefined, true)
    }
})

router.post('/newproduct/image/:id', /*productNew,*/ upload.single('image'), async (req, res)=> {
        const product = await Product.findOne({_id : req.params.id})
        if(!product){
            return res.status(404).send()
        }
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
        product.image = buffer
        await product.save()
        res.send(product)
    }, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router