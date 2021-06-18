const newProductform = document.getElementById('newProductForm');

const product = new Product()

//Envia o novo produto
newProductform.addEventListener('submit', e =>{
    e.preventDefault()
    const newProduct =  { 
        title: e.target.title.value, 
        price: e.target.price.value
    }
    
    product.newProduct(newProduct)
    .then((data) => {
            //console.log('novo: ', data)
            location.assign('/');         
    })
    .catch((error) => {
            console.log(error)
    })
})

