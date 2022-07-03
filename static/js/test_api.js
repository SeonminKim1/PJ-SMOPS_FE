
// 비동기 통신 async
async function style_transfer(){

    var formdata = new FormData();
    formdata.append("content", document.querySelector("#base_file").files[0])
    formdata.append("style", document.querySelector("#style_file").files[0])

    const response = await fetch(`${backend_base_url}/ai/inference/`,{
        headers:{
            // Accept: "application/json",
            // 'content-type': "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: formdata,
    })
    console.log(response)
    console.log(typeof(response))
    console.log(response["body"])
    
    
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