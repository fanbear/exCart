const menuItem = document.querySelector('.admin-panel__sitebar');
const date = document.querySelector('.content-wrapper__date');


//menu ==========================
const dropdown = (e) => {

    const target = e.target.closest('.admin-panel__item');
    
    if (!target.classList.contains('admin-panel__item-active')) {
        target.classList.toggle('admin-panel__item-active');
    } else {
        target.classList.remove('admin-panel__item-active');
    }
    
}
const menuParams = (e) => {

    const urlParams = document.location; 
    const menuLink = document.querySelectorAll('.dropdown-item a');
    const link = Array.from(menuLink).find(item => item.href == urlParams);

    if (link) {
        link.closest('.dropdown-item').classList.add('link-active');
        link.closest('.admin-panel__item').classList.add('admin-panel__item-active');
    }
    
}


menuItem.addEventListener('click', dropdown);
window.addEventListener('load', menuParams);

