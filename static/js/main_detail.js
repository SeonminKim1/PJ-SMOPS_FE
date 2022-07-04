
let product_id;
async function loadMainProductDetailPage() {
    console.log("main_detail.js - loadMainProductDetailPage")


    if (localStorage.getItem('product_img_id')) {
        product_id = localStorage.getItem('product_img_id')
    }
    console.log('main_detail.js - product_id1', product_id)
    product_id = product_id.replace(MAIN_PROUCT_IMG_ID, '')
    product_id = parseInt(product_id)
    console.log('main_detail.js - product_id2', product_id)
    const response = await fetch(`${backend_base_url}/product/detail/${product_id}`, {
        headers: {
            Accept: "application/json",
            'content-type': "application/json"
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })

    response_json = await response.json()

    if (response.status == 200) {
        MainProductDetailPutData(response_json)
    } else {
        alert('ERROR: ', response.status)
    }

    return response_json
}


function MainProductDetailPutData(product_one) {
    // Loading tag objects
    const item_img = document.querySelector('.img-main-detail')
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
    var created_dateString = created_date.getFullYear() + '-' + (created_date.getMonth() + 1) + '-' + created_date.getDate();

    // Put Value in html-tag-contents
    item_img.src = 'https:/' + product_one['img_path']
    title_detail.innerText = product_one['title']
    category_detail.innerText = product_one['category']
    create_user_detail.innerText = product_one['created_user']
    selling_user_detail.innerText = product_one['owner_user']
    img_shape_detail.innerText = product_one['img_shape']
    update_date_detail.innerText = created_dateString
    price_detail.innerText = product_one['price'] + '원'
    description_detail.text = product_one['description']

    // json log data convert to logline
    // var product_one['log'] = product_one['log']
    // var log_text = ''

    // for (var i = 0; i < product_one['log'].length; i++) {
    //     var update_date = new Date(product_one['log'][i]['updated_date']);
    //     var update_dateString = update_date.getFullYear() + '-' + (update_date.getMonth() + 1) + '-' + update_date.getDate();
    //     if (i == 0) {
    //         log_text = log_text + '아티스트:' + product_one['log'][i]['old_owner'] + '\n생성일자: ' + update_dateString + '\n\n'
    //     } else {
    //         log_text = log_text + '구매자:' + product_one['log'][i]['old_owner'] + '\n구매일자: ' + update_dateString + '\n구매금액:' + product_one['log'][i]['old_price'] + '원' + '\n\n'
    //     }
    // }

    // log_content_detail.innerText = log_text


    const history_btn = document.querySelector("#history_btn")
    console.log(history_btn)
    history_btn.innerHTML = `
    <button class="btn-log" onclick="history_modalOn(${product_id})">히스토리 보기</button>

    <!-- detail_Modal -->
    <div id="history_modal_${product_id}" class="modal-overlay">
        <div class="detail-modal-window">
            <div class="modal-title">
                <h3>작품 상세 정보</h3>
            </div>
            <div class="modal-close" onclick="history_modalOff(${product_id})">X</div>
            <hr>
            <div class="main-content">
                <img src="${'https:/' + product_one['img_path']}">
                <div class="modal-mygallery-info">
                    <h4>기본 정보</h4>
                    <p>아티스트 : ${product_one['created_user']}</p>
                    <p>작품명 : ${product_one['title']}</p>
                    <p>생성일자 : ${created_dateString}</p>
                    <h4>히스토리</h4>
                    <div id=history_box_${product_id}></div>
                </div>
            </div>
            <hr>
            <div class="modal-btn-box">
                <button type="button" class="modal-btn" onclick="deleteProduct(${product_id})">작품 삭제하기</button>
            </div>
        </div>
    </div>
    `


    // 로그 기록들 출력
    var updated_date = new Date(product_one['log'][0]['updated_date']);
    var log_updated_dateString = updated_date.getFullYear() + '-' + (updated_date.getMonth() + 1) + '-' + updated_date.getDate();

    const history = document.getElementById("history_box_" + product_id)
    // append를 이용하기 위해서 div 생성
    const history_item = document.createElement('p')
    history_item.innerHTML = `${log_updated_dateString} 에 ${product_one['log'][0].old_owner} 님이 ${product_one['log'][0].old_price} 원에 생성`
    history.append(history_item)
    console.log(history)


    for (var i = 1; i < product_one['log'].length; i++) {
        var updated_date = new Date(product_one['log'][i]['updated_date']);
        var log_updated_dateString = updated_date.getFullYear() + '-' + (updated_date.getMonth() + 1) + '-' + updated_date.getDate();

        const history = document.getElementById("history_box_" + product_id)
        // append를 이용하기 위해서 div 생성
        const history_item = document.createElement('p')
        history_item.innerHTML = `${log_updated_dateString} 에 ${product_one['log'][i].old_owner} 님이 ${product_one['log'][i].old_price} 원에 구매`
        history.append(history_item)
        console.log(history)
    }


}

async function buy_product() {
    if (confirm("작품을 구매하시겠습니까?")) {
        // 입력받은 데이터 가져오기
        let product_id;
        if (localStorage.getItem('product_img_id')) {
            product_id = localStorage.getItem('product_img_id')
        }
        product_id = product_id.replace(MAIN_PROUCT_IMG_ID, '')
        product_id = parseInt(product_id)

        const price = parseInt((document.querySelector('.price-detail').innerText).replace('원', ''))

        const date = new Date();
        const update_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        const formData = {
            product_id: product_id,
            price: price,
            updated_date: update_date
        }

        const response = await fetch(`${backend_base_url}/product/detail/buy/log/`, {
            headers: {
                'content-type': "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: "POST",
            body: JSON.stringify(formData)
        })
        console.log('==response', response)
        confirm('구매 완료 되었습니다.')
        window.location.replace(`${frontend_base_url}/templates/art/mygallery.html`);
    } else {
        confirm('구매가 취소 되었습니다.')
    }
}


// 히스토리 보기 모달 창 on/off
var detail_modal;
// detail modal on
function history_modalOn(input_id) {
    history_modal = document.getElementById("history_modal_" + input_id)
    history_modal.style.display = "flex"
    console.log(detail_modal)
}

// detail modal off
function history_modalOff(input_id) {
    history_modal = document.getElementById("history_modal_" + input_id)
    history_modal.style.display = "none"
}

// 모달창 바깥 클릭 시 모달창 닫히게
window.addEventListener("click", e => {
    const evTarget = e.target
    if (evTarget.classList.contains("modal-overlay")) {
        detail_modal.style.display = "none";
    }
})
