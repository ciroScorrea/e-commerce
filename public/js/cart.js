class Cart {
    constructor(id, qty, price){
        this.id = id,
        this.qty = qty,
        this.price = price 
    }
    open(){
            cartPanel.classList.add('transparentBcg')
            cartPanel.firstElementChild.classList.add('showCart')
    }
    close(){
            cartPanel.classList.remove('transparentBcg')
            cartPanel.firstElementChild.classList.remove('showCart')
    }
    clear(){
        cartPanel.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = ""
    }
    addItem(data){
        let product = data[0]
        cartContent.innerHTML += 
        `
        <div class="cart-item" data-id=${product.sys.id}>
            <img src=${product.fields.image.fields.file.url} alt="product">
            <div>
                <h4>${product.fields.title}</h4>
                <h5>${product.fields.price}</h5>
                <span class="remove-item">remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" aria-hidden="true"></i>
                <p class="item-amount">1</p>
                <i class="fas fa-chevron-down" aria-hidden="true"></i>
            </div>
        </div>
        `
        cartItens.innerHTML = parseInt(cartItens.innerHTML) + 1
        cartTotal.innerHTML = Math.round((Number(cartTotal.innerHTML)*100 + product.fields.price*100))/100
        return 'produto adicionado'
    }
    increaseItem(data){
        let product = data[0]
        Array.from(cartContent.children).forEach(e =>{
            if(e.getAttribute('data-id') === product.sys.id){
                let qtyTag = parseInt(e.querySelector('p').innerHTML)
                qtyTag = qtyTag + 1
                e.querySelector('p').innerHTML = qtyTag
                cartItens.innerHTML = parseInt(cartItens.innerHTML) + 1
                cartTotal.innerHTML = Math.round((Number(cartTotal.innerHTML)*100 + product.fields.price*100))/100
            } 
        })
    }
    decreaseItem(data){
        let product = data[0]
        Array.from(cartContent.children).forEach(e =>{
            if(e.getAttribute('data-id') === product.sys.id){
                let qtyTag = parseInt(e.querySelector('p').innerHTML)
                if(qtyTag > 1){
                    qtyTag = qtyTag - 1
                    e.querySelector('p').innerHTML = qtyTag
                    cartItens.innerHTML = parseInt(cartItens.innerHTML) - 1
                    console.log(parseFloat(cartTotal.innerHTML))
                    console.log(product.fields.price)
                    cartTotal.innerHTML = Math.round((Number(cartTotal.innerHTML)*100 - product.fields.price*100))/100
                } else {
                    this.removeItem(data)
                } 
                
            } 
        })
    }
    searchItem(item){
        let code = 0
        Array.from(cartContent.children).forEach(e =>{
            if(e.getAttribute('data-id') === item){
                code = e.getAttribute('data-id')
            } 
        })
        return code
    }
    removeItem(data){
        let product = data[0]
        Array.from(cartContent.children).forEach(e =>{
            if(e.getAttribute('data-id') === product.sys.id){
                const qty = parseInt(this.itemQty(e.getAttribute('data-id')))
                cartItens.innerHTML = parseInt(cartItens.innerHTML) - qty
                cartTotal.innerHTML = Math.round((Number(cartTotal.innerHTML)*100 - product.fields.price*100))/100
                e.remove()
            } 
        })

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
}
