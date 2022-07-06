var img_path;
// style transfer 실행 후 결과 태그에 전달해서 미리보기
async function style_transfer() {
  // 작동 개시 시 PROCESS 화면에 출력되도록
  document.querySelector(".container-painting").style.display = "none"
  document.querySelector('nav').style.display = "none"
  document.querySelector(".container-process").style.display = "block"

  result_file = document.getElementById("result_file")

  const formdata = new FormData();
  formdata.append("content", document.querySelector("#base_img").files[0])
  formdata.append("style", document.querySelector("#style_img").files[0])

  // 테스트
  var filename1 = document.querySelector("#base_img").files[0].name
  var filename2 = document.querySelector("#style_img").files[0].name

  var extension = filename1.split('.')[1] // .png
  var f_name = filename1.split('.')[0] + '_' + filename2.split('.')[0] + '.' + extension

  // style transfer 작업
  const response = await fetch(`${backend_base_url}/ai/inference/`, {
    headers: {
      // Accept: "application/formdata",
      // 'content-type': "application/formdata",
      "Authorization": "Bearer " + localStorage.getItem("access"),
    },
    method: 'POST',
    body: formdata,
  }).then(response => response.blob())
    .then(function (myBlob) {
      objectURL = URL.createObjectURL(myBlob);
      img_path = new File([myBlob], f_name, myBlob) // File Object
      console.log('====filesi', img_path)
      result_file.src = objectURL;
    })

  // 결과 , 등록 화면 출력
  document.querySelector('nav').style.display = "block"
  document.querySelector(".container-process").style.display = "none"
  document.querySelector(".container-result").style.display = "block"
  alert("유화 제작 완료~!")

}


// 이미지 미리보기
function base_image_preview(input) {
  const base_div = document.querySelector("#base_img_preview")
  base_div.innerHTML = `<img src="" id="result_base_file" class="base-img">`

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('result_base_file').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('result_base_file').src = "";
  }
}
function style_image_preview(input) {
  const style_div = document.querySelector("#style_img_preview")
  style_div.innerHTML = `<img src="" id="result_style_file" class="style-img">`

  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('result_style_file').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('result_style_file').src = "";
  }
}

// 이미지 업로드 (S3)
async function product_upload() {

  // 이미지와 함께 저장하기 위해서 FormData 클래스 사용
  const formdata = new FormData();

  formdata.append("img_path", img_path)

  // 라디오 버튼 중 선택된 항목의 value 가져오기
  categoryNodeList = document.getElementsByName('painting-category');
  shapeNodeList = document.getElementsByName('painting-shape');
  categoryNodeList.forEach((node) => {
    if (node.checked) {
      formdata.append("category", node.value)
      console.log(node.value)
    }
  })
  shapeNodeList.forEach((node) => {
    if (node.checked) {
      formdata.append("img_shape", node.value)
      console.log(node.value)
    }
  })

  formdata.append("title", document.querySelector("#title").value)
  formdata.append("description", document.querySelector("#description").value)
  formdata.append("price", document.querySelector("#price").value)

  payload = localStorage.getItem("payload")
  payload = JSON.parse(payload)

  formdata.append("created_user", payload["user_id"])
  formdata.append("owner_user", payload["user_id"])

  const response = await fetch(`${backend_base_url}/ai/`, {
    headers: {
      // Accept: "application/json",
      // 'content-type': "application/json",
      "Authorization": "Bearer " + localStorage.getItem("access"),
    },
    method: 'POST',
    body: formdata,
  })
  response_json = await response.json()
  console.log(response_json)

  alert('유화 등록 완료~!')
  window.location.replace(`${frontend_base_url}/templates/art/mygallery.html`);

}


// 메뉴 선택시 선택됨 표시
window.addEventListener('load', function () {
  document.querySelector(".box-ai-nav").className = "selected-box-ai-nav";
  document.querySelector(".painting-menu-nav").style.color = "white"
})