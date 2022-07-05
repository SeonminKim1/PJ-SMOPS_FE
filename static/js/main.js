

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
        category_name = `${DEFAULT_CATEGORY}`
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
    const item_created_user_list = document.querySelectorAll('.created-user-main')
    const item_price_list = document.querySelectorAll('.price-main')

    product_list_length = product_list.length // 5
    for (let i = 0; i < item_img_list.length; i++) {

        if (product_list_length <= i ){ // 
            item_img_list[i].style.visibility = "hidden"
            item_title_list[i].style.visibility = "hidden"
            item_created_user_list[i].style.visibility = "hidden"
            item_price_list[i].style.visibility = "hidden"
        }
        else{ 
            item_img_list[i].style.visibility = "visible"
            item_title_list[i].style.visibility = "visible"
            item_created_user_list[i].style.visibility = "visible"
            item_price_list[i].style.visibility = "visible"

            item_img_list[i].setAttribute("id", MAIN_PROUCT_IMG_ID + product_list[i]['id'])
            item_img_list[i].src = 'https:/' + product_list[i]['img_path']
            item_title_list[i].innerText = product_list[i]['title']
            item_created_user_list[i].innerText = product_list[i]['created_user']
            item_price_list[i].innerText = product_list[i]['price'] +'원'
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

// 필터링
async function getFilterResult() {
    console.log("main.js - getFilterResult")
    const ordering_radio = document.getElementsByName('ordering')
    const price_radio = document.getElementsByName('price')
    const img_shape_radio = document.getElementsByName('img_shape')

    let category_name;
    if(localStorage.getItem('category_name')){
        category_name = localStorage.getItem('category_name')
    }else{
        category_name = `${DEFAULT_CATEGORY}`
    }

    var ordering_value='', price_value='', img_shape_value='';
    ordering_radio.forEach((node) => { if(node.checked){ ordering_value = node.value }}) 
    price_radio.forEach((node) => { if(node.checked){ price_value = node.value }})
    img_shape_radio.forEach((node) => { if(node.checked){ img_shape_value = node.value }})

    console.log(ordering_value + '/' + price_value + '/' + img_shape_value);

    const response = await fetch(
        `${backend_base_url}/product/?category_name=${category_name}&price=${price_value}&image_shape=${img_shape_value}&ordering_value=${ordering_value}`,
        {
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


// 필터링
async function getSearchResult() {
    console.log("main.js - getSearchResult")
    search_input = document.querySelector(".item-search")
    search_input_value = search_input.value
    console.log(search_input_value)  

    let category_name;
    if(localStorage.getItem('category_name')){
        category_name = localStorage.getItem('category_name')
    }else{
        category_name = `${DEFAULT_CATEGORY}`
    }

    const response = await fetch(
        `${backend_base_url}/product/${category_name}/${search_input_value}`,
        {
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

// 필터링
async function getFilterInitialize() {
    console.log("main.js - getFilterInitialize")
    const ordering_radio = document.getElementsByName('ordering')
    const price_radio = document.getElementsByName('price')
    const img_shape_radio = document.getElementsByName('img_shape')

    ordering_radio.forEach((node) => { if(node.checked){ 
        node.checked=false;

    }}) 
    price_radio.forEach((node) => { if(node.checked){ 
        node.checked=false 
    }})
    img_shape_radio.forEach((node) => { if(node.checked){
        node.checked=false 
    }})

}