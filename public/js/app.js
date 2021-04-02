const product        = document.querySelector('.product')
const cartIcon       = document.querySelector('.cart-btn')
const cartPanel      = document.querySelector('.cart-overlay')
const cartClose      = document.querySelector('.fa-window-close')
const cartClear      = document.querySelector('.clear-cart')
const cartContent    = document.querySelector('.cart-content')
const cartTotal      = document.querySelector('.cart-total')
const productsCenter = document.querySelector('.products-center')
const cartItens      = document.querySelector('.cart-items')
const bannerBtn      = document.querySelector('.banner-btn')
const ourProducts    = document.querySelector('.products')

const products = new Item()

getProducts()
.then(data => console.log('resolved:', products.productsList(data)))
.catch(err => console.log('rejected', err.message)) 


const mainCart = new Cart()
cartIcon.addEventListener('click', e => {
    mainCart.open()
})
cartClose.addEventListener('click', e => {
    mainCart.close()
})  
cartClear.addEventListener('click', e => {
    cartItens.innerHTML = 0
    cartTotal.innerHTML = 0
    mainCart.clear()
})
bannerBtn.addEventListener('click', e => {
    ourProducts.scrollIntoView()
})

//Adiciona novo item ou incrementa se já existente
productsCenter.addEventListener('click', e =>{
    if(e.target.className === 'bag-btn' & e.target.nodeName === 'BUTTON'){
        const id = e.target.getAttribute('data-id')
        const result = mainCart.searchItem(id)
        if(result === 0){
            getProducts(e.target.getAttribute('data-id'))
            .then(data => console.log('resolved:', mainCart.addItem(data)))
            .catch(err => console.log('rejected', err.message))
        } else {
            getProducts(e.target.getAttribute('data-id'))
            .then(data => console.log('resolved:', mainCart.increaseItem(data)))
            .catch(err => console.log('rejected', err.message))
        }
    }
})

//Aumenta uma unidade de item já existente no carrinho
cartContent.addEventListener('click', e=>{
    if(e.target.className === 'fas fa-chevron-up'){
        const result = mainCart.searchItem(e.target.parentElement.parentElement.getAttribute('data-id'))
        getProducts(result)
        .then(data => console.log('resolved:', mainCart.increaseItem(data)))
        .catch(err => console.log('rejected', err.message))
    }
})

//Retira uma unidade de item já existente no carrinho
cartContent.addEventListener('click', e=>{
    if(e.target.className === 'fas fa-chevron-down'){
        const result = mainCart.searchItem(e.target.parentElement.parentElement.getAttribute('data-id'))
        getProducts(result)
        .then(data => console.log('resolved:', mainCart.decreaseItem(data)))
        .catch(err => console.log('rejected', err.message))
    }
})

//Exclui item do carrinho
cartContent.addEventListener('click', e=>{
    if(e.target.className === 'remove-item' & e.target.nodeName==='SPAN'){
        const result = mainCart.searchItem(e.target.parentElement.parentElement.getAttribute('data-id'))
        getProducts(result)
        .then(data => console.log('resolved:', mainCart.removeItem(data)))
        .catch(err => console.log('rejected', err.message))
    }
})    
