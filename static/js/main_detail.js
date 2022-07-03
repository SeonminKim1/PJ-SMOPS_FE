
async function loadMainProductDetailPage(){
    console.log("main_detail.js - loadMainProductDetailPage")

    let product_id;
    if(localStorage.getItem('product_img_id')){
        product_id = localStorage.getItem('product_img_id')
    }
    console.log('main_detail.js - product_id1', product_id)
    product_id = product_id.replace(`${main_product_img_id}`, '')
    product_id = parseInt(product_id)
    console.log('main_detail.js - product_id2', product_id)
    const response = await fetch(`${backend_base_url}/product/detail/${product_id}`,{
        headers:{
            Accept: "application/json",
            'content-type': "application/json"
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })

    response_json = await response.json()  

    if(response.status == 200) {
        MainProductDetailPutData(response_json)
    } else {
        alert('ERROR: ', response.status)
    }

    return response_json
}


function MainProductDetailPutData(product_one){
    const item_img = document.querySelector('.item-img-detail')
    // const item_title_list = document.querySelectorAll('.title-main')
    // const item_description_list = document.querySelectorAll('.description-main')
    // const item_price_list = document.querySelectorAll('.price-main')
    console.log(product_one)

    item_img.src = 'https:/' + product_one['img_path']
}