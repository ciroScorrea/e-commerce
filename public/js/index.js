const product        = document.querySelector('.product')
const productsCenter = document.querySelector('.products-center')
const bannerBtn      = document.querySelector('.banner-btn')
const ourProducts    = document.querySelector('.products')
const products = new Product()

products.getProducts()
.then(data => products.productsList(data))
.catch(err => console.log('rejected', err.message)) 


bannerBtn.addEventListener('click', e => {
    ourProducts.scrollIntoView()
    console.log('it works')
})

//Add Item
productsCenter.addEventListener('click', e =>{
    if(e.target.className === 'bag-btn' & e.target.nodeName === 'BUTTON'){
        mainCart.getCart(cartIcon.getAttribute('data-id'))
            .then(cart => {
                mainCart.searchItem(cart, e.target.getAttribute('data-id'))
                    .then(data => {
                        if(data.length === 0){
                            const item = {
                                "product": e.target.getAttribute('data-id'),
                                "qty": 1 
                            }
                            cart.products.push(item)
                            cart.qtyTotal = cart.qtyTotal + 1
                            mainCart.getPrice(e.target.getAttribute('data-id'))
                                .then(prod => {
                                    cart.valueTotal += prod.price
                                    mainCart.addItem(cart)
                                        .then(data => {
                                            cartItems.innerText = data.qtyTotal
                                            e.target.innerText = "In Cart"                                       
                                        })
                                        .catch(err => console.log('addItem ', err))
                                })
                                .catch(err => console.log('getPrice ', err))
                        } else {
                            mainCart.getPrice(e.target.getAttribute('data-id'))
                                .then(prod => {
                                    cart.valueTotal += prod.price
                                    mainCart.updateItem(cart, e.target.getAttribute('data-id'),1)
                                        .then(data => {
                                            cartItems.innerText = data.qtyTotal
                                            e.target.innerText = "In Cart"
                                        })
                                        .catch(err => console.log('updateItem ', err))
                                })
                                .catch(err => console.log('getPrice ', err))
                        }
                    })
                    .catch(err => console.log('searchItem:' , err))
            })
            .catch(err => console.log('getCart: ', err))
    }
})


//Direciona para página de atualização
productsCenter.addEventListener('click', e =>{
    //console.log('clique: ', e.target.getAttribute('data-id'))
    if(e.target.className === 'update-btn' & e.target.nodeName === 'BUTTON'){
            products.getProduct(e.target.getAttribute('data-id'))
            .then(data => console.log('resolved:' ))
            .catch(err => console.log('rejected app.js', err.message))
    }
})
