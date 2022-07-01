async function loadMainProductPage(){
    console.log("main.js - loadMainProductPage")
    product_list = await getProductListbyCategory()
    console.log('===prouct_list ==\n', product_list)
    // const item_main_list = document.getElementsByClassName("item-main")    
    // const item_main_list = document.querySelectorAll(".item-main")
    const item_img_list = document.querySelectorAll('.item-img')
    const item_title_list = document.querySelectorAll('.title-main')
    const item_description_list = document.querySelectorAll('.description-main')
    const item_price_list = document.querySelectorAll('.price-main')

    // console.log(typeof(item_main_list), item_main_list, '길이==', item_main_list.length)

    for(let i=0; i<product_list.length; i++){
        console.log(product_list[i])

        item_img_list[i].src = 'https:/' + product_list[i]['img_path']
        item_title_list[i].innerText = product_list[i]['title']
        item_description_list[i].innerText = product_list[i]['description']
        item_price_list[i].innerText = product_list[i]['price']
    }
}

loadMainProductPage();
