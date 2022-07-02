async function loadMainProductPage(category_name) {
    console.log("main.js - loadMainProductPage", category_name)
    // console.log("main api.js - getProductList")
    // Category 눌렀을 때 페이지 이동
    const category_nav_human = document.querySelector('.category-nav-human');
    const category_nav_view = document.querySelector('.category-nav-view');
    const category_nav_still = document.querySelector('.category-nav-still');
    const category_nav_animal = document.querySelector('.category-nav-animal');

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
    console.log('===prouct_list ==\n', response_json)
    if(response.status == 200) {
        window.location.replace(`${frontend_base_url}/templates/art/main.html`);
    } else {
        alert(response.status)
    }
    const item_img_list = document.querySelectorAll('.item-img')
    const item_title_list = document.querySelectorAll('.title-main')
    const item_description_list = document.querySelectorAll('.description-main')
    const item_price_list = document.querySelectorAll('.price-main')

    for (let i = 0; i < product_list.length; i++) {
        console.log(product_list[i])
        item_img_list[i].setAttribute("id", 'main_product_' + product_list[i]['id'])
        item_img_list[i].src = 'https:/' + product_list[i]['img_path']
        item_title_list[i].innerText = product_list[i]['title']
        item_description_list[i].innerText = product_list[i]['description']
        item_price_list[i].innerText = product_list[i]['price']
    }
}
// loadMainProductPage('인물화')

// 필터
// const filterBtn = document.querySelector('.filter-active');
// const filterDropDown = document.querySelector('.wrap-filter-category');

// filterBtn.addEventListener('click', () => {
//     filterDropDown.classList.toggle('active');
// });
/*
function go_detail(){ // get 방식
    const response = await fetch(`${backend_base_url}/product/detail/3`, {
        headers: {
            Accept: "application/json",
            'Content-type': "application/json"
        },
        method: "POST",
        // body: JSON.stringify(loginData)
    })
}*/