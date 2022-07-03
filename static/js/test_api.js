
// 비동기 통신 async
var abcdef; 

async function style_transfer(){

    const result_file = document.getElementById("result_file")

    var formdata = new FormData();
    formdata.append("content", document.querySelector("#base_file").files[0])
    formdata.append("style", document.querySelector("#style_file").files[0]) // File Object

    var filename1 = document.querySelector("#base_file").files[0].name 
    var filename2 = document.querySelector("#style_file").files[0].name 

    var extension = filename1.split('.')[1] // .png
    var f_name = filename1.split('.')[0] + '_' + filename2.split('.')[0] + '.' + extension

    console.log('===', f_name)

    var objectURL;
    const response = await fetch(`${backend_base_url}/ai/inference/`,{
        headers:{
            // Accept: "application/json",
            // 'content-type': "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: formdata,
    }).then(response => response.blob())
    .then(function(myBlob) {
      objectURL = URL.createObjectURL(myBlob);
      abcdef = new File([myBlob], f_name, myBlob) // File Object
      console.log('====filesi', abcdef)
      result_file.src = objectURL;
    });
    console.log('완료')
}

async function product_upload(){
  const formdata = new FormData();
  formdata.append("category", document.querySelector("#category").value)
  formdata.append("img_shape", document.querySelector("#shape").value)
  formdata.append("title", document.querySelector("#title").value)
  formdata.append("description", document.querySelector("#description").value)
  formdata.append("price", document.querySelector("#price").value)
  payload = JSON.parse(localStorage.getItem("payload"))
  user_id = payload['user_id']
  console.log(user_id)
  console.log(payload)

  formdata.append('img_path', abcdef)

  const response = await fetch(`${backend_base_url}/ai/`,{
      headers:{
          // Accept: "application/json",
          // 'content-type': "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access"),
      },
      method: 'POST',
      body: formdata,
  })
  // response_json = await response.json()
  console.json(response)
  window.location.replace(`${frontend_base_url}/templates/art/mygallery.html`);
}
// 이미지 미리보기
function base_image_preview(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('result_base_file').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById('result_base_file').src = "";
    }
}
function style_image_preview(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('result_style_file').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById('result_style_file').src = "";
    }
}