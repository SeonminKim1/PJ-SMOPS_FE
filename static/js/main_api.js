const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function getProductListbyCategory(){
    console.log("main api.js - getProductListbyCategory")
    const response = await fetch(`${backend_base_url}/product/인물화/`,{
        headers:{
            Accept: "application/json",
            'content-type': "application/json"
        },
        method: 'GET',
        // body: JSON.stringify(Data)
    })

    response_json = await response.json()    
    return response_json
}