class Cart {
    constructor(id, status, owner, products, qtyTotal, valueTotal){
        this.id = id,
        this.status = status,
        this.owner = owner,
        this.products = products,
        this.qtyTotal = qtyTotal,
        this.valueTotal = valueTotal
    }

    destroyCart = async function(){
        let response = await fetch(`/destroyCart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.status !== 201) {
            throw new Error('Cannot fetch the data')
        }
    }

    createCart = async function(mainCart){
        let response = await fetch(`/newCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mainCart)
        })

        if(response.status !== 201) {
            throw new Error('Cannot fetch the data')
        }
        let cart = await response.json()
        return cart
    }

    getCart = async function(id){
        let response = await fetch(`/myCart/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.status !== 201){
            throw new Error('Cannot fetch the data')
        }
        let cart = await response.json()
        return cart
    }

    open = async function(id) {
            cartPanel.classList.add('transparentBcg')
            cartPanel.firstElementChild.classList.add('showCart')
            if(id !=='#'){
                let response = await fetch(`/myCart/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if(response.status !== 201) {
                        throw new Error('Cannot fetch the data')
                    }
                let cart = await response.json()
                return cart
            } else {
                return undefined
            }
    }

    load = async function(id){
        if(id !=='#'){
            let response = await fetch(`/myCart/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(response.status !== 201) {
                    throw new Error('Cannot fetch the data')
                }
            let cart = await response.json()
            return cart
        } else {
            return undefined
        }
    }

    close(){
            cartPanel.classList.remove('transparentBcg')
            cartPanel.firstElementChild.classList.remove('showCart')
    }

    clear = async function(cart){
        let response = await fetch(`/myCart/${cart._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })

        if(response.status !== 201) {
            throw new Error('Cannot fetch the data')
        }
        let cleaned = await response.json()
        return cleaned
    }

    addItem = async function(cart){
        let response = await fetch(`/mycart/${cart._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })

        if(response.status !== 201){
          throw new Error('cannot fetch the data')
        }
        let item =  await response.json();
        
        return item        
    }
    updateItem = async function(cart, id, qty){
        for(let i = 0; i < cart.products.length; i++){
            if(cart.products[i].product === id){
                if(qty !== 0){
                        cart.products[i].qty += qty
                } else {
                    cart.products.splice(i,1)                   
                    }                    
            }   
        }

        let response = await fetch(`/mycart/${cart._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })

        if(response.status !== 201){
          throw new Error('cannot fetch the data')
        }
        let item =  await response.json();
        return item        
    }

    searchItem = async function(cart , item) { 
            let response = await fetch(`/mycart/${cart._id}/product/${item}`)
            if(response.status !== 201){
              throw new Error('cannot fetch the data')
            }
            let data =  await response.json();
            return data        
    }

    itemQty(item){
        let qty=0
        Array.from(cartContent.children).forEach(e =>{
            if(e.getAttribute('data-id') === item){
                qty = e.querySelector('p').innerHTML                
            } 
        })
        return qty
    }

    getPrice = async function(id) {
        let response = await fetch(`/prod/${id}`)
        if(response.status !== 200){
          throw new Error('cannot fetch the data')
        }
        let data =  await response.json();
        return data        
    }

}
