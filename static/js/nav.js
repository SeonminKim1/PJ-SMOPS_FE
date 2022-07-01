const toggleBtn = document.querySelector('.nav-bar-toggle');
const menu = document.querySelector('.nav-box-menu');

// toggleBtn.addEventListener('click', () => {});

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});