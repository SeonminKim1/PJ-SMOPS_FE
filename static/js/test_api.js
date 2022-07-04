var img_path;
// style transfer 실행 후 결과 태그에 전달해서 미리보기
async function style_transfer(){

    const formdata = new FormData();
    formdata.append("content", document.querySelector("#base_file").files[0])
    formdata.append("style", document.querySelector("#style_file").files[0])
    
    var filename1 = document.querySelector("#base_file").files[0].name 
    var filename2 = document.querySelector("#style_file").files[0].name 

    var extension = filename1.split('.')[1] // .png
    var f_name = filename1.split('.')[0] + '_' + filename2.split('.')[0] + '.' + extension

    const response = await fetch(`${backend_base_url}/ai/inference/`,{
        headers:{
            // Accept: "application/formdata",
            // 'content-type': "application/formdata",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: formdata,
    }).then(response => response.blob())
    .then(function(myBlob) {
      objectURL = URL.createObjectURL(myBlob);
      img_path = new File([myBlob], f_name, myBlob) // File Object
      console.log('====filesi', img_path)
      result_file.src = objectURL;
    })

        
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

async function product_upload(){
    const formdata = new FormData();
    
    formdata.append("img_path", img_path)
    formdata.append("category", document.querySelector("#category").value)
    formdata.append("img_shape", document.querySelector("#shape").value)
    formdata.append("title", document.querySelector("#title").value)
    formdata.append("description", document.querySelector("#description").value)
    formdata.append("price", document.querySelector("#price").value)

    payload = localStorage.getItem("payload")
    payload = JSON.parse(payload)
    
    formdata.append("created_user", payload["user_id"])
    formdata.append("owner_user", payload["user_id"])

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
    
    window.location.replace(`${frontend_base_url}/templates/art/mygallery.html`);

}