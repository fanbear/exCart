const menuItem = document.querySelector('.admin-panel__sitebar');

const dropdown = (e) => {
    const target = e.target.closest('.admin-panel__item');
    if (!target.classList.contains('admin-panel__item-active')) {
        target.classList.add('admin-panel__item-active');
    } else {
        target.classList.remove('admin-panel__item-active');
    }
    
}

menuItem.addEventListener('click', dropdown);