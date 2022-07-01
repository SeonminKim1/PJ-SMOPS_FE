const toggleBtn = document.querySelector('.bar-toggle-nav');
const menu = document.querySelector('.box-menu-nav');
const category = document.querySelector('.wrap-category-nav');

// nav toggleBtn event //

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    category.classList.toggle('category-active')
});