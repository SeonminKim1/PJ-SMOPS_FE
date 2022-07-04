
async function loadMainProductDetailPage(){
    console.log("main_detail.js - loadMainProductDetailPage")

    let product_id;
    if(localStorage.getItem('product_img_id')){
        product_id = localStorage.getItem('product_img_id')
    }
    console.log('main_detail.js - product_id1', product_id)
    product_id = product_id.replace(MAIN_PROUCT_IMG_ID, '')
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
    // Loading tag objects
    const item_img = document.querySelector('.item-img-main-detail')
    const title_detail = document.querySelector('.title-detail')
    const category_detail = document.querySelector('.category-detail')
    const img_shape_detail = document.querySelector('.img-shape-detail')
    const create_user_detail = document.querySelector('.create-user-detail')
    const selling_user_detail = document.querySelector('.selling-user-detail')
    const update_date_detail = document.querySelector('.update-date-detail')
    const price_detail = document.querySelector('.price-detail')
    const description_detail = document.querySelector('.description-detail')
    const log_content_detail = document.querySelector('.log-content-detail')

    // json date data convert to 2022-06-29
    var created_date = new Date(product_one['created_date']);
    var created_dateString = created_date.getFullYear() + '-' + (created_date.getMonth() + 1)  + '-' + created_date.getDate();

    // Put Value in html-tag-contents
    item_img.src = 'https:/' + product_one['img_path']
    title_detail.innerText = product_one['title']
    category_detail.innerText = product_one['category']
    create_user_detail.innerText = product_one['created_user']
    selling_user_detail.innerText = product_one['owner_user']
    img_shape_detail.innerText = product_one['img_shape']
    update_date_detail.innerText = created_dateString
    price_detail.innerText = product_one['price'] +'원'
    description_detail.text = product_one['description']
    
    // json log data convert to logline
    var logs = product_one['log']
    var log_text = ''

    for(var i=0; i<logs.length; i++){
        var update_date = new Date(logs[i]['updated_date']);
        var update_dateString = update_date.getFullYear() + '-' + (update_date.getMonth() + 1)  + '-' + update_date.getDate();
        if(i==0){
            log_text = log_text + '아티스트:' + logs[i]['old_owner'] + '\n생성일자: ' + update_dateString + '\n\n'
        }else{
            log_text = log_text + '구매자:' + logs[i]['old_owner'] + '\n구매일자: ' + update_dateString + '\n구매금액:' + logs[i]['old_price'] + '원' +'\n\n'
        }
    }

    log_content_detail.innerText = log_text
}

async function buy_product(){
    if(confirm("작품을 구매하시겠습니까?")){        
        // 입력받은 데이터 가져오기
        let product_id;
        if(localStorage.getItem('product_img_id')){
            product_id = localStorage.getItem('product_img_id')
        }
        product_id = product_id.replace(MAIN_PROUCT_IMG_ID, '')
        product_id = parseInt(product_id)

        const price = parseInt((document.querySelector('.price-detail').innerText).replace('원',''))

        const date = new Date();
        const update_date = date.getFullYear() + '-' + (date.getMonth() + 1)  + '-' + date.getDate();

        const formData = {
            product_id : product_id,
            price : price,
            updated_date : update_date
        }

        const response = await fetch(`${backend_base_url}/product/detail/buy/log/`,{
            headers:{
                'content-type': "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: "POST",
            body: JSON.stringify(formData)
        })
        console.log('==response', response)
        confirm('구매 완료 되었습니다.')
        window.location.replace(`${frontend_base_url}/templates/art/mygallery.html`);
    }else{
        confirm('구매가 취소 되었습니다.')
    }
}