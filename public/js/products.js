const getProducts = async (id) => {
    let response = await fetch('./js/products.json')
    if(response.status !== 200){
      throw new Error('cannot fetch the data')
    }
    let data =  await response.json();
    if(typeof(id)==='string'){
      data = Array.from(data.items).filter( e => e.sys.id === id)
    }
    return data
  }
