const cartItems      = document.querySelector('.cart-items')
const cartIcon       = document.querySelector('.cart-btn')
const cartClose      = document.querySelector('.fa-window-close')
const cartClear      = document.querySelector('.clear-cart')
const cartContent    = document.querySelector('.cart-content')
const cartPanel      = document.querySelector('.cart-overlay')
const cartTotal      = document.querySelector('.cart-total')


const mainCart = new Cart()

let newCart = localStorage.getItem('cart')

if(newCart === null){
    mainCart.qtyTotal = 0
    mainCart.valueTotal = 0
    mainCart.status = "open"
    
    mainCart.createCart(mainCart)
    .then(cart => {
        localStorage.setItem('cart', cart._id)
        cartIcon.setAttribute('data-id', cart._id)
        cartContent.setAttribute('data-id', cart._id)
        cartItems.innerText = cart.qtyTotal
    })
    .catch(err => console.log('createCart(): ', err))
} else {
    mainCart.getCart(newCart)
    .then(cart => {
        cartIcon.setAttribute('data-id', newCart)
        cartContent.setAttribute('data-id', cart._id)
        cartItems.innerText = cart.qtyTotal 
        mainCart.load(cart._id)
            .then(cart => {
                if (cart !== undefined){
                    cartContent.innerHTML = ""
                    cart.products.forEach(element => {
                        products.getProd(element.product)
                            .then(item => {
                                const bagbtn = document.querySelector(`button.bag-btn[data-id="${item._id}"]`)
                                bagbtn.innerText = "In Cart"
                            })
                            .catch(err => {console.log('getProd: ', err)})
                        })
                    }
            })
    })
    .catch(err => {
        console.log('getCart: ', err)
    })
}

cartIcon.addEventListener('click', e => {
    mainCart.open(cartIcon.getAttribute('data-id'))
        .then(cart => {
            if (cart !== undefined){
                cartContent.innerHTML = ""
                cart.products.forEach(element => {
                    products.getProd(element.product)
                        .then(item => {
                            cartContent.innerHTML += 
                            `
                            <div class="cart-item" data-id=${element.product}>
                                <img src=/products/image/${element.product} alt="product">
                                <div>
                                    <h4>${item.title}</h4>
                                    <h5>${item.price}</h5>
                                    <span class="remove-item">remove</span>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-up" aria-hidden="true"></i>
                                    <p class="item-amount">${element.qty}</p>
                                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                                </div>
                            </div>
                            `       
                            cartTotal.innerText = parseFloat(cart.valueTotal).toFixed(2)    
                        })
                        .catch(err => {console.log('getProd: ', err)})
                    })
                }
        })
})


cartClose.addEventListener('click', e => {
    mainCart.close()
})  

cartClear.addEventListener('click', e => {
    mainCart.getCart(cartIcon.getAttribute('data-id'))
        .then(cart => {
            cartContent.innerHTML = ""
            cartItems.innerText = 0
            cartTotal.innerText = 0
            cart.products = []
            cart.qtyTotal = 0
            cart.valueTotal = 0
            mainCart.clear(cart)
                .catch(err => console.log('cartClear: ', err))   
    })
        .catch(err => console.log('getCart ', err))

})

//Aumenta uma unidade de item já existente no carrinho
cartContent.addEventListener('click', e=>{
    if(e.target.className === 'fas fa-chevron-up'){
        mainCart.getCart(cartIcon.getAttribute('data-id'))
            .then(cart => {
                mainCart.getPrice(e.target.parentElement.parentElement.getAttribute('data-id'))
                .then(prod => {
                    cart.valueTotal += prod.price
                    cartTotal.innerText = parseFloat(cart.valueTotal).toFixed(2)
                    mainCart.updateItem(cart, e.target.parentElement.parentElement.getAttribute('data-id'),1)
                        .then(update => {
                            for(i=0; i< update.products.length; i++) {
                                if(update.products[i].product === e.target.parentElement.parentElement.getAttribute('data-id')){
                                    e.target.nextElementSibling.innerText = update.products[i].qty
                                     
                                }
                            }
                        })
                        .catch(err => console.log('updateItem: ', err))
                })
                .catch(err => console.log('getPrice ', err))
            })
            .catch(err => console.log('getCart: ', err))
    }
})

//Retira uma unidade de item já existente no carrinho
cartContent.addEventListener('click', e=>{
    if(e.target.className === 'fas fa-chevron-down'){
        mainCart.getCart(cartIcon.getAttribute('data-id'))
            .then(cart => {
                mainCart.getPrice(e.target.parentElement.parentElement.getAttribute('data-id'))
                .then(prod => {
                    let op = -1
                    for(i=0; i< cart.products.length; i++){
                        if((cart.products[i].qty === 1) && (e.target.parentElement.parentElement.getAttribute('data-id') === cart.products[i].product)){
                            op = 0
                            cart.qtyTotal -= 1
                            e.target.parentElement.parentElement.remove()  
                        }
                    }
                    cartItems.innerText = cart.qtyTotal
                    cart.valueTotal -= prod.price
                    cartTotal.innerText = parseFloat(cart.valueTotal).toFixed(2)
                    mainCart.updateItem(cart, e.target.parentElement.parentElement.getAttribute('data-id'),op)
                    .then(update => {
                        for(i=0; i< update.products.length; i++) {
                            if(update.products[i].product === e.target.parentElement.parentElement.getAttribute('data-id')){
                                e.target.previousElementSibling.innerText = update.products[i].qty 
                                
                            }
                        }
                    })
                    .catch(err => console.log('updateItem: ', err))
                })
                .catch(err => console.log('getPrice ', err))
            })
            .catch(err => console.log('getCart: ', err))
    }
})

//Exclui item do carrinho
cartContent.addEventListener('click', e=>{
    if(e.target.className === 'remove-item' & e.target.nodeName==='SPAN'){
        mainCart.getCart(cartIcon.getAttribute('data-id'))
            .then(cart => {
                mainCart.getPrice(e.target.parentElement.parentElement.getAttribute('data-id'))
                    .then(data => {
                        for(i=0; i< cart.products.length; i++) {
                            if(cart.products[i].product === data._id){
                                cart.valueTotal -= cart.products[i].qty * data.price
                                cart.qtyTotal -= 1
                                e.target.parentElement.parentElement.remove()                             
                            }
                        }
                        mainCart.updateItem(cart, e.target.parentElement.parentElement.getAttribute('data-id'),0)
                        .then( newdata => {
                            cartItems.innerText = newdata.qtyTotal
                            cartTotal.innerText = parseFloat(newdata.valueTotal).toFixed(2)
                        })    
                        .catch(err => console.log('removeItem: ', err))
                    })
                    .catch(err => console.log('getPrice: ', err))
            })
            .catch(err => console.log('getCart: ', err))
    }
})    
