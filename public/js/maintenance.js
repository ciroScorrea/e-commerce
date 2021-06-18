const updateProductform = document.getElementById('updateProductForm');
const productsList = document.querySelector('.container-fluid')

const products = new Product()

products.getProducts()
.then(data => products.productsMaintenance(data))
.catch(err => console.log('rejected', err.message)) 


// //Envia o novo produto
// updateProductform.addEventListener('submit', e =>{
//     e.preventDefault()
//     const newProduct =  { 
//         title: e.target.title.value, 
//         price: e.target.price.value
//     }
    
//     products.newProduct(newProduct)
//     .then((data) => {
//             console.log(data)
//     })
//     .catch((error) => {
//             console.log(error)
//     })
// })

productsList.addEventListener('click', e =>{
    e.preventDefault()
    if(e.target.classList[2] === 'delete' & e.target.nodeName === 'BUTTON'){
        products.deleteProduct(e.target.dataset.id)
        .then(() => {
            e.target.parentElement.parentElement.remove()        
        })
        .catch(err => console.log( err.message))
    }
})

productsList.addEventListener('click', e =>{
    e.preventDefault()
    //console.log('clicou', e)
    if(e.target.classList[2] === 'update' & e.target.nodeName === 'BUTTON'){
       location.assign('/product/'+e.target.dataset.id)
    }
})

