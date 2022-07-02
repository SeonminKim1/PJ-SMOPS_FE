async function loadMainProductDetailPage(product_id){
    console.log("main.js - loadMainProductDetailPage")
    product = await getProductDetailbyCategory(product_id)
    console.log('===product ==\n', product)

    const item_img_list = document.querySelector('.item-img-detail')
    const item_title_list = document.querySelector('.title-main-detail')
    const item_description_list = document.querySelector('.description-main-detail')
    const item_price_list = document.querySelector('.price-main-detail')

    // console.log(typeof(item_main_list), item_main_list, '길이==', item_main_list.length)
    item_img_list.src = 'https:/' + product['img_path']
    item_title_list.innerText = product['title']
    item_description_list.innerText = product['description']
    item_price_list.innerText = product['price']
}
