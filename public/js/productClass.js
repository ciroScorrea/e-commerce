class Product{
    constructor(id, title, price, image){
        this.id = id,
        this.title = title,
        this.price = price,
        this.image = image
    }

    getProducts = async function() {
        let response = await fetch(`/products`)
        if(response.status !== 200){
          throw new Error('cannot fetch the data')
        }
        let data =  await response.json();
        if(typeof(id)==='string'){ 
          data = Array.from(data).filter( e => e._id === id)
        }
        return data
    }
    productsList = (data) =>{
        let products = data;
        products.forEach( (e) =>{
            productsCenter.innerHTML += 
            `
                <!-- single product -->
                <article class="product">
                    <div class="img-container">
                        <img src="/products/image/${e._id}" alt="product" class="product-img">
                        <button class="bag-btn" data-id=${e._id}>
                            <i class="fas fa-shopping-cart"></i>add to bag</button>
                    </div>
                    <h3>${e.title}</h3> 
                    <h4>${e.price}</h4> 
                </article>
                <!-- end of single product -->        
            `
        })
        return 'products loaded';
    }

    getProduct = async function(id) {
        let response = await fetch(`/product/${id}`)
        if(response.status !== 200){
          throw new Error('cannot fetch the data')
        }
         let data =  await response.json();
        console.log('data', data)
        return data        
    }

    getProd = async function(id) {
        let response = await fetch(`/prod/${id}`)
        if(response.status !== 200){
          throw new Error('cannot fetch the data')
        }
        let data =  await response.json();
        return data        
    }

    updateProduct = async function(product) {
        console.log(product)
        let updated = await fetch(`../product/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })

        let updatedJson = await updated.json()
        
        const image = document.querySelector('#customFile');
        const formImage = new FormData()
        formImage.append('image', image.files[0])
        
        let updatedImage = await fetch(`/newproduct/image/`+updatedJson._id, {
            method: 'POST',
            body: formImage
        })

        let savedComplete = await updatedImage.json()

    }

    deleteProduct = async function (id) {
        let deleted = await fetch(`/product/${id}`, {
            method: 'DELETE'
        })
       
        // lembrete this não funciona com arrow function
    }

    newProduct = async function(product) {
        let saved = await fetch(`/newproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })
     
        let savedJson = await saved.json()
        
        const image = document.querySelector('#customFile');
        const formImage = new FormData()
        formImage.append('image', image.files[0])
        
        let savedImage = await fetch(`/newproduct/image/`+savedJson._id, {
            method: 'POST',
            body: formImage
        })

        let savedComplete = await savedImage.json()

        return savedComplete
    }

    productsMaintenance = async function (data) {
        let products = data;
        products.forEach( (e) =>{
            productsList.innerHTML += ` 
            <!-- single product -->
            <div class="row">
                <div class="col"><img src="/products/image/${e._id}" alt="product"  class="img-fluid"></div>
                <div class="col-6">${e.title}</div>
                <div class="col">${e.price}</div>
                <div class="col">
                    <button type="button" class="btn btn-primary update" data-id=${e._id}>
                        <a href="/product/${e._id}" class="update-btn"></a>
                        Edit
                    </button>
                </div>
                <div class="col"><button type="button" class="btn btn-danger delete" data-id=${e._id}>Delete</button></div>
            </div>
            <!-- end of single product -->`
        })
        return 'products loaded';
    }
    
}
