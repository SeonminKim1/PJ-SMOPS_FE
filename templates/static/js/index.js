async function loadMyGalleryList(){
    console.log("loadMyGalleryList")
    mygalleryList = await getMyGalleryList()

    const printList = document.getElementById("mygallery")
    const username = document.getElementById("username")
    const images = document.getElementById("images")
    const img_div = document.getElementById("img_div")
// for mygallery in mygalleryList
    mygalleryList.forEach(mygallery => {
        console.log(mygallery)
        const myprint = document.createElement("li");
        myprint.setAttribute("id", mygallery._id)
        myprint.innerText = "제목 : " + mygallery.title + 
                            "\n가격 : " + mygallery.price +
                            "\n창조자 : " + mygallery.created_user
                            
        printList.appendChild(myprint)

        username.append(mygallery.created_user)
        

        // images.src = "https://luckyseven-todaylunch.s3.ap-northeast-2.amazonaws.com/Screenshot_220529_184837.jpg"
        console.log(mygallery.img_path)
        images.src = "https:/" + mygallery.img_path

        // img_div.innerHTML = "<img src='https:/${mygallery.img_path}' alt='' width='200' height='200'>"


        
    });

}

loadMyGalleryList();
