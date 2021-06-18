const updateProductform = document.getElementById('updateProductForm')
const id = document.getElementById('title')
const title = document.getElementById('price')

const products = new Product()


//Envia o novo produto
updateProductform.addEventListener('submit', e =>{
    e.preventDefault()
    const updateProduct =  {
        title: e.target.title.value, 
        price: e.target.price.value,
        id:    e.target.update.value
    }
    
    products.updateProduct(updateProduct)
    .then((data) => {
            //console.log('update.js ' , data)
            location.assign('/maintenance');
    })
    .catch((error) => {
            console.log(error)
    })
})
