class Item{
    constructor(id, title, price, url){
        this.id = id,
        this.title = title,
        this.price = price,
        this.url = url
    }
    productsList = (data) =>{
        let products = data.items;
        products.forEach( (e) =>{
            productsCenter.innerHTML += 
            `
                <!-- single product -->
                <article class="product">
                    <div class="img-container">
                        <img src=${e.fields.image.fields.file.url} alt="product" class="product-img">
                        <button class="bag-btn" data-id=${e.sys.id}>
                            <i class="fas fa-shopping-cart"></i>
                            add to bag
                        </button>
                    </div>
                    <h3>${e.fields.title}</h3>
                    <h4>${e.fields.price}</h4>
                </article>
                <!-- end of single product -->        
            `
        })
        return 'lista de produtos carregada';
    }
}

