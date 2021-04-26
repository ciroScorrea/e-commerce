// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("icon");


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const newProductform = document.getElementById('newProductForm');

//Envia o novo produto
newProductform.addEventListener('submit', e =>{
    e.preventDefault()
    const product =  { 
        title: e.target.title.value, 
        price: e.target.price.value
    }
    newProduct(product)
    .then((data) => {
            console.log(data)
    })
    .catch((error) => {
            console.log(error)
    })
})

const newProduct = async(product) => {
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
}

/*
// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/