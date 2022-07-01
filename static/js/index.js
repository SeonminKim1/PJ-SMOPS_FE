async function loadMyGalleryList(){
    console.log("loadMyGalleryList")
    mygalleryList = await getMyGalleryList()

    const printList = document.getElementById("mygallery")
    const username = document.getElementById("username")
    const images = document.getElementById("images")
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

        images.src = "http://localhost:8000" + mygallery.img_path

        
    });

}

loadMyGalleryList();
