

function goMainProductPage(category_name){
    localStorage.setItem('category_name', category_name);
    window.location.replace(`${frontend_base_url}/templates/art/main.html`);
}