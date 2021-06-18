const express = require('express')
//Multer: Middleware for handling `multipart/form-data`.
const multer = require('multer')
//Sharp: High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, AVIF and TIFF image
const sharp = require('sharp')
const Product = require('../models/product')
const Cart = require('../models/cart')

const router = new express.Router()

router.get('/products', async (req, res) => {
    const match = {}
    const sort = {}
    const products = await Product.find() 
    try{
        res.send(products)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/products/image/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product || !product.image){
            throw new Error('Did not work !!!!!')
        } 
        res.set('Content-Type', 'image/jpg')
        res.send(product.image)
    } catch (e) {
        res.status(400).send('Imagem não encontrada')
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

router.post('/newproduct/image/:id', /*auth,*/ upload.single('image'), async (req, res)=> {
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

router.get('/product/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
        try{
            res.render('updateproduct', {
                title: product.title,
                price: product.price,
                id: product._id
            })            
        } catch(e) {
            res.status(500).send()
        }
    
})

router.get('/prod/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
    try{
        res.send(product)
    } catch(e){
        res.status(500).send()
    }    
})

router.delete('/product/:id', async(req, res) =>{
    try{
        const product = await Product.findOneAndDelete({_id: req.params.id})
        if(!product){
            return res.status(404).send()
        }
        res.send()
    } catch(e){
        res.status(500).send()
    }
})

router.put('/product/:id', /*auth, */ async (req, res)=>{
    const updates = Object.keys(req.body)

    try{
        const product = await Product.findOne({ _id: req.params.id})
        
        if(!product){
            return res.status(404).send()
        }
        updates.forEach( update =>product[update] = req.body[update])
        await product.save()

        const carts = await Cart.find({ "products.product" : product._id})
        carts.forEach(async function (cart) {
            cart.valueTotal = 0
            cart.products.forEach(item => {
                cart.valueTotal += item.qty * product.price 
            })
            await cart.save()
        })

        res.send(product)
    } catch (e){
        res.status(400).send({error: e})
    }    
})


module.exports = router