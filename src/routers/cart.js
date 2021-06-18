const express = require('express')
const Product = require('../models/product')
const Cart = require('../models/cart')
const router = new express.Router()

router.post('/newCart', /* auth , */ async (req, res) =>{
    const cart = new Cart({
        ...req.body //.... for spread
    })
    try{
        await cart.save()
        res.status(201).send(cart)
    } catch {
        res.status(500).send()
    }
})

router.delete('/destroyCart', /* auth, */ async (req, res) =>{
    const cart = await Cart.deleteMany()
        try{
        res.status(201).send()
    } catch(e){
        res.status(500).send()
    }    
})


router.get('/myCart/:id', /* auth, */ async (req, res) =>{
    const cart = await Cart.findById(req.params.id)
    try{
        res.status(201).send(cart)
        
    } catch(e){
        res.status(500).send()
    }    
})


router.patch('/mycart/:id', /*auth, */ async (req, res)=>{
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true})
    try{
        await cart.save()
        res.status(201).send(cart)
    } catch {
        res.status(500).send()
    }
})

router.delete('/myCart/:id', /* auth, */ async (req, res) =>{
    const cart = await Cart.findByIdAndDelete(req.params.id)
        try{
        res.send(cart)
    } catch(e){
        res.status(500).send()
    }    
})

router.get('/mycart/:cart/product/:item', /*auth, */ async (req, res)=>{
    const cart = await Cart.find({"_id": req.params.cart ,"products.product" : req.params.item})
    try{
        res.status(201).send(cart)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router