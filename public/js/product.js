class Product{
    constructor(id, title, price, image){
        this.id = id,
        this.title = title,
        this.price = price,
        this.image = image
    }
    productsList = (data) =>{
        let products = data;
        products.forEach( (e) =>{
            productsCenter.innerHTML += 
            `
                <!-- single product -->
                <article class="product">
                    <div class="img-container">
                        <img src="/products/${e._id}/image" alt="product" class="product-img">
                        <button class="bag-btn" data-id=${e._id}>
                            <i class="fas fa-shopping-cart"></i>
                            add to bag
                        </button>
                    </div>
                    <h3>${e.title}</h3>
                    <h4>${e.price}</h4>
                </article>
                <!-- end of single product -->        
            `
        })
        return 'lista de produtos carregada';
    }
}

