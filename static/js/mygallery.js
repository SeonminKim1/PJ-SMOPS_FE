// 비동기 통신 async
async function getMyGalleryList(){
    console.log("mygallery_list")
    // const Data = {
    //     username : document.getElementById("username").value
    // }
     
    const response = await fetch(`${backend_base_url}/mygallery/`,{
        headers:{
            Accept: "application/json",
            'content-type': "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })

    response_json = await response.json()    
    
    if (response.status == 200){
        
        mygalleryList = response_json

        // 상품 리스트를 출력할 div선택해서 가져와 준비
        const list_box = document.querySelector('.wrap-mygallery');

        // response 받은 json 데이터를 forEach 이용해서 하나씩 접근
        mygalleryList.forEach(mygallery => {
            console.log(mygallery)
            // img_src = "https://luckyseven-todaylunch.s3.ap-northeast-2.amazonaws.com/Screenshot_220529_184837.jpg"
            const img_src = "https:/" + mygallery.img_path

            // append를 이용하기 위해서 div 생성
            const item_mygallery = document.createElement('div')
            // class 명 지정
            item_mygallery.className = 'item-mygallery';
            // innerHTML로 원하는 형태로 데이터 출력
            item_mygallery.innerHTML = `
            <img src="${img_src}" id=product_img_${mygallery.id} onclick="product_info(${mygallery.id})">
            <div class="box-text-mygallery">
                <span class="title-mygallery">${mygallery.title}</span>
                <p>${mygallery.description}</p>
                <span>가격 : ${mygallery.price}</span>
                <span class="sell-status">${mygallery.is_selling}</span>
            </div>`
            console.log(item_mygallery)
            // 상품리스트에 출력하기위해 만든 div append
            list_box.append(item_mygallery)

        });
    }

}
getMyGalleryList();


async function product_info(product_id) {
    const response = await fetch(`${backend_base_url}/mygallery/${product_id}`,{
        headers:{
            Accept: "application/json",
            'content-type': "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })

    response_json = await response.json()    
    
    if (response.status == 200){

    }

}