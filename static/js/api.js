const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function join(){

    // 입력받은 데이터 가져오기
    const joinData = {
        email : document.getElementById("input-id-join").value,
        fullname : document.getElementById("input-fullname-join").value,
        password : document.getElementById("input-password-join").value,
        password_confirm : document.getElementById("input-password-confirm").value,
    }

    // 입력받은 데이터를 BE서버에 회원가입 url로 request 요청
    const response = await fetch(`${backend_base_url}/user/`, {
        // headers를 통해 json 데이터임을 알려줘야 415 오류가 발생하지않는다.
        headers: {
            Accept: "application/json",
            'Content-type': "application/json"
        },
        method: "POST",
        body: JSON.stringify(joinData)
    })

    // response 받은 내용을 json 화
    respose_json = await response.json()

    // 정상적인 통신이 되었을 경우 = 회원가입 완료 > 로그인페이지로
    if(response.status == 201) {
        window.location.replace(`${frontend_base_url}/templates/user/login.html`);
    } else {
        alert(response.status)
    }
    

}

async function login() {
    const loginData = {
        email : document.getElementById("input-id-init").value,
        password : document.getElementById("input-password-init").value,
    }
    
    const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            Accept: "application/json",
            'Content-type': "application/json"
        },
        method: "POST",
        body: JSON.stringify(loginData)
    })

    response_json = await response.json()

    if (response.status == 200){
        // 로컬스토리지에 jwt access 토큰과 refresh 토큰 저장
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)

        // 파싱하는 부분 복사해서 사용하기! 
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        // window.location.replace(`${frontend_base_url}/`);
        window.location.replace(`${frontend_base_url}/templates/art/mygallery.html`);
    } else {
        alert(response.status)
    }

}

// 페이지를 다시 로딩 하면 벌어지는 일들!
window.onload = ()=>{
    const payload = JSON.parse(localStorage.getItem("payload"));

    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)){
        document.querySelector("#loginForm").setAttribute("style", "display:none");

        document.querySelector("#access-token").value = localStorage.getItem("access");
        document.querySelector("#refresh-token").value = localStorage.getItem("refresh");
        document.querySelector("#payload").value = JSON.stringify(localStorage.getItem("payload"));

    } else {
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
              const response = await fetch(url, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  method: "POST",
                  body: JSON.stringify({
                      "refresh": localStorage.getItem("refresh")
                  })}
              );
              return response.json();
        };

        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken("/user/api/token/refresh/").then((data)=>{
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            document.querySelector("#access-token").value = accessToken;

            localStorage.setItem("access", accessToken);
            document.querySelector("#refresh-token").value = localStorage.getItem("refresh");
            document.querySelector("#payload").value = JSON.stringify(localStorage.getItem("payload"));

            document.querySelector("#loginForm").setAttribute("style", "display:none");
        });
    }
};

// 인증여부 확인 fetch api 통신
const onRequestButtonClick = () => {
    const requestAuthData = async () => {
        const response = await fetch(`${backend_base_url}/user/api/authonly/`, {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " +localStorage.getItem("access")
            },
        });
  
        return response.json();
    }
    requestAuthData().then((data)=>{
        // 인증여부 에 대해서 메세지 뿌리기
        //   document.querySelector("#auth-only").value = data.message;
    })
  };
