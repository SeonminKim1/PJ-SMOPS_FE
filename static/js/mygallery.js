// 비동기 통신 async 내가 가진 상품 리스트 출력
async function getMyGalleryList() {

    const response = await fetch(`${backend_base_url}/mygallery/`, {
        headers: {
            Accept: "application/json",
            'content-type': "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })

    response_json = await response.json()

    if (response.status == 200) {

        mygalleryList = response_json

        // 상품 리스트를 출력할 div선택해서 가져와 준비
        const list_box = document.querySelector('.wrap-mygallery');

        // response 받은 json 데이터를 forEach 이용해서 하나씩 접근
        mygalleryList.forEach(mygallery => {
            console.log(mygallery)

            // 이미지 path 정리
            // img_src = "https://luckyseven-todaylunch.s3.ap-northeast-2.amazonaws.com/Screenshot_220529_184837.jpg"
            const img_src = "https:/" + mygallery.img_path

            // 판매중 여부에 따라 출력문 결정
            var is_selling;
            if (mygallery.is_selling) {
                is_selling = "판매 중"
            } else {
                is_selling = "보유 작품"
            }

            // 날짜 출력형태 정리
            // json date data convert to 2022-06-29
            var created_date = new Date(mygallery['created_date']);
            var created_dateString = created_date.getFullYear() + '-' + (created_date.getMonth() + 1) + '-' + created_date.getDate();


            // append를 이용하기 위해서 div 생성
            const item_mygallery = document.createElement('div')
            // class 명 지정
            item_mygallery.className = 'item-mygallery';
            // innerHTML로 원하는 형태로 데이터 출력
            item_mygallery.innerHTML = `
            <img src="${img_src}" id=product_img_${mygallery.id} onclick="detail_modalOn(${mygallery.id})">
            <div class="box-text-mygallery">
                <span class="title-mygallery">${mygallery.title}</span>
                <p>아티스트 : ${mygallery.created_user}</p>
                <span>가격 : ${mygallery.price.toLocaleString()}</span>
                <span class="sell-status_${mygallery.is_selling}" onclick="status_modalOn(${mygallery.id})">${is_selling}</span>
            </div>
            
            <!-- detail_Modal -->
            <div id="detail_modal_${mygallery.id}" class="modal-overlay">
                <div class="detail-modal-window">
                    <div class="modal-title">
                        <h3>작품 상세 정보</h3>
                    </div>
                    <div class="modal-close" onclick="detail_modalOff(${mygallery.id})">X</div>
                    <hr>
                    <div class="main-content">
                        <img src="${img_src}">
                        <div class="modal-mygallery-info">
                            <h4>기본 정보</h4>
                            <p>아티스트 : ${mygallery.created_user}</p>
                            <p>작품명 : ${mygallery.title}</p>
                            <p>카테고리 : ${mygallery.category}</p>
                            <p>형태 : ${mygallery.img_shape}</p>
                            <p>생성일자 : ${created_dateString}</p>
                            <p>작품설명 : <p class="long-desc">${mygallery.description}</p></p>
                            <h4>히스토리</h4>
                            <div id=history_box_${mygallery.id} class="history-list">
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="modal-btn-box">
                        <button type="button" class="modal-btn" onclick="deleteProduct(${mygallery.id})">작품 삭제하기</button>
                    </div>
                </div>
            </div>
            
            <!-- status_Modal -->
            <div id="status_modal_${mygallery.id}" class="modal-overlay">
                <div class="status-modal-window">
                    <div class="modal-title">
                        <h3>작품 판매정보 수정</h3>
                    </div>
                    <div class="modal-close" onclick="status_modalOff(${mygallery.id})">X</div>
                    <hr>
                    <div class="status-main-content">
                        <img src="${img_src}">
                        <div class="status-modal-mygallery-info">
                            <div><label for="is_selling_${mygallery.id}">판매상태 
                                <select id="is_selling_${mygallery.id}" value="${mygallery.is_selling}">
                                    <option value="1">판매로 등록</option>
                                    <option value="0">보유로 전환</option>
                                </select>
                            </label></div>
                            <div><label for="price_${mygallery.id}">가격<input class="input-price" id="price_${mygallery.id}" type="text" value="${mygallery.price.toLocaleString()}"></label></div>
                            <div><label for="description_${mygallery.id}">내용<input class="input-text" id="description_${mygallery.id}" type="text" value="${mygallery.description}"></label></div>
                        </div>
                    </div>
                    <hr>
                    <div class="status-modal-btn-box">
                        <button type="button" class="status-modal-btn" onclick="updateProduct(${mygallery.id})">판매정보 수정하기</button>
                    </div>
                </div>
            </div>
            `

            // 상품리스트에 출력하기위해 만든 div append
            list_box.prepend(item_mygallery)

            var updated_date = new Date(mygallery.log[0]['updated_date']);
            var log_updated_dateString = updated_date.getFullYear() + '-' + (updated_date.getMonth() + 1) + '-' + updated_date.getDate();
            const history = document.getElementById("history_box_" + mygallery.id)
            const history_item = document.createElement('p')
            history_item.innerHTML = `${log_updated_dateString} 에 ${mygallery.log[0].old_owner} 님이 ${mygallery.log[0].old_price.toLocaleString()} 원에 생성`
            history.prepend(history_item)

            // 로그 기록들 출력
            for (var i = 1; i < mygallery.log.length; i++) {
                var updated_date = new Date(mygallery.log[i]['updated_date']);
                var log_updated_dateString = updated_date.getFullYear() + '-' + (updated_date.getMonth() + 1) + '-' + updated_date.getDate();

                const history = document.getElementById("history_box_" + mygallery.id)
                // append를 이용하기 위해서 div 생성
                const history_item = document.createElement('p')
                history_item.innerHTML = `${log_updated_dateString} 에 ${mygallery.log[i].old_owner} 님이 ${mygallery.log[i].old_price.toLocaleString()} 원에 구매`
                history.prepend(history_item)
            }


        });
    }

}
getMyGalleryList();

// modal - 상품 삭제
async function deleteProduct(product_id) {

    if (confirm("정말 상품을 삭제하시겠습니까?")) {

        const response = await fetch(`${backend_base_url}/mygallery/${product_id}`, {
            headers: {
                Accept: "application/json",
                'content-type': "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access")
            },
            method: 'DELETE',
            // body: JSON.stringify(Data)
        })

        response_json = await response.json()
        alert(response_json["result"])
        window.location.reload()
    }

}
// modal - 상품 수정
async function updateProduct(product_id) {

    const Data = {
        description: document.getElementById("description_" + product_id).value,
        price: parseInt(String(document.getElementById("price_" + product_id).value).replace(',' , "")),
        is_selling: document.getElementById("is_selling_" + product_id).value
    }

    const response = await fetch(`${backend_base_url}/mygallery/${product_id}`, {
        headers: {
            Accept: "application/json",
            'content-type': "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify(Data)
    })
    alert("수정이 완료되었습니다.")
    window.location.reload()
}

var detail_modal;
// detail modal on
function detail_modalOn(product_id) {
    detail_modal = document.getElementById("detail_modal_" + product_id)
    detail_modal.style.display = "flex"
    detail_modal.style.top = window.pageYOffset + 'px';
    document.querySelector('body').style.overflow = 'hidden'
}

// detail modal off
function detail_modalOff(product_id) {
    detail_modal = document.getElementById("detail_modal_" + product_id)
    detail_modal.style.display = "none"
    detail_modal.style.top = window.pageYOffset + 'px';
    document.querySelector('body').style.overflow = 'scroll'
}

var status_modal;
// status modal on
function status_modalOn(product_id) {
    status_modal = document.getElementById("status_modal_" + product_id)
    status_modal.style.display = "flex"
    status_modal.style.top = window.pageYOffset + 'px';
    document.querySelector('body').style.overflow = 'hidden'
}

// status modal off
function status_modalOff(product_id) {
    status_modal = document.getElementById("status_modal_" + product_id)
    status_modal.style.display = "none"
    status_modal.style.top = window.pageYOffset + 'px';
    document.querySelector('body').style.overflow = 'scroll'
}


// 모달창 바깥 클릭 시 모달창 닫히게
window.addEventListener("click", e => {
    const evTarget = e.target
    if (evTarget.classList.contains("modal-overlay")) {
        detail_modal.style.display = "none";
    }
})

window.addEventListener("click", e => {
    const evTarget = e.target
    if (evTarget.classList.contains("modal-overlay")) {
        status_modal.style.display = "none";
    }
})


// 메뉴 선택시 선택됨 표시
window.addEventListener('load', function () {
    document.querySelector(".my-menu-nav").className = "selected-menu-nav";
})
