

async function loadMainProductPage() {
    console.log('==현재위치==', window.location.href)
    if (window.location.href != `${frontend_base_url}/templates/art/main.html`){
        window.location.replace(`${frontend_base_url}/templates/art/main.html`);
    }
    // window.location.reload()
    let category_name;
    if(localStorage.getItem('category_name')){
        category_name = localStorage.getItem('category_name')
    }else{
        category_name = `${default_category}`
    }

    console.log("main.js - loadMainProductPage", category_name)
    const response = await fetch(`${backend_base_url}/product/${category_name}/`,{
        headers:{
            Accept: "application/json",
            'content-type': "application/json"
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })
    console.log('============================================', response)
    
    response_json = await response.json()
    
    if(response.status == 200) {
        MainProductPutData(response_json)
    } else {
        alert('ERROR: ', response.status)
    }
}

function MainProductPutData(product_list){
    const item_img_list = document.querySelectorAll('.item-img')
    const item_title_list = document.querySelectorAll('.title-main')
    const item_description_list = document.querySelectorAll('.description-main')
    const item_price_list = document.querySelectorAll('.price-main')

    product_list_length = product_list.length // 5
    for (let i = 0; i < item_img_list.length; i++) {

        if (product_list_length <= i ){ // 
            item_img_list[i].style.visibility = "hidden"
            item_title_list[i].style.visibility = "hidden"
            item_description_list[i].style.visibility = "hidden"
            item_price_list[i].style.visibility = "hidden"
        }
        else{ 
            item_img_list[i].style.visibility = "visible"
            item_title_list[i].style.visibility = "visible"
            item_description_list[i].style.visibility = "visible"
            item_price_list[i].style.visibility = "visible"

            item_img_list[i].setAttribute("id", main_product_img_id + product_list[i]['id'])
            item_img_list[i].src = 'https:/' + product_list[i]['img_path']
            item_title_list[i].innerText = product_list[i]['title']
            item_description_list[i].innerText = product_list[i]['description']
            item_price_list[i].innerText = product_list[i]['price']
        }
    }
}

function goMainProductDetailPage(img_id){
    localStorage.setItem('product_img_id', img_id);
    window.location.replace(`${frontend_base_url}/templates/art/main_detail.html`);
}

document.addEventListener("DOMContentLoaded", () => {
    // 필터
    const filterBtn = document.querySelector('.filter-active');
    const filterDropDown = document.querySelector('.wrap-filter-category');

    filterBtn.addEventListener('click', () => {
        filterDropDown.classList.toggle('active');
    });
});