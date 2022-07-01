const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http//127.0.0.1:5500";

// 비동기 통신 async
async function getMyGalleryList(){
    console.log("mygallery_list")
    // const Data = {
    //     username : document.getElementById("username").value
    // }
     
    const response = await fetch(`${backend_base_url}/mygallery/`,{
        headers:{
            Accept: "application/json",
            'content-type': "application/json"
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })

    response_json = await response.json()    

    return response_json

    // if (response.status == 200){
    //     window.location.replace('$(frontend_base_url}/test.html');
    // } else {
    //     alert(response.status)
    // }

}