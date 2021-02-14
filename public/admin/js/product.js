document.addEventListener('DOMContentLoaded', () => {
    // product form =========================
    const productForm = document.querySelector('#addProduct');

    // product cart =========================
    const contentProductAdd = document.querySelector('.add-wrapper');
    const contentProductClose = document.querySelector('.add-wrapper__button-close');
    const tabButtonWrapper = document.querySelector('.form-button__wrapper');
    const tabButton = document.querySelectorAll('.form-button__item');
    const tabPage = document.querySelectorAll('.form-tabs');
    const currency = document.querySelector('input[name="pricein"]');
    const price = document.querySelector('input[name="price"');
    const attrBtnAdd = document.querySelector('.btn-attr__add');
    const attrBtnDelete = document.querySelectorAll('.btn-attr__remove');


    //product cart ==========================

    //open cart-wrapper
    const addProduct = () => {
        contentProductAdd.style.animation = 'add 1s';
        contentProductAdd.style.right = "80px";
        contentProductAdd.style.opacity = '1';
        contentProductAdd.style.height = 'auto';
    }
    //close cart-wrapper
    const closeProduct = () => {
        contentProductAdd.style.animation = 'add 1s';
        contentProductAdd.style.right = "-2000px";
        contentProductAdd.style.opacity = '0';
        contentProductAdd.style.height = '0';
    }
    //product tabs
    const productTab = (e) => {

        const target = e.target.closest('.form-button__item');
        const index = Array.from(tabButton).findIndex( item => item == target);

        tabButton.forEach( item => item.classList.remove('form-button__item-active'));
        tabPage.forEach( item => item.classList.remove('form-tabs__active'));
        target.classList.add('form-button__item-active');
        tabPage[index].classList.add('form-tabs__active');
    }

    //delite attribute colums
    const attrDelete = (e) => {
        e.target.closest('.attribute-item').remove();
    }
    
    //add attribute colums
    const attrGetCount = () => document.querySelectorAll('.attribute-item').length + 1;

    const attrAddTable = () => {

        const attrHTML = `
            <div class="attribute-item">
                <input type="text" name="attrname[${attrGetCount()}]" placeholder="Характеристики">
                <textarea name="textareaname[${attrGetCount()}]" rows="4" placeholder="Текст"></textarea>
                <div class="btn btn-attr__remove"><i class="fas fa-minus" aria-hidden="true"></i></div>
            </div>
        `;
        
        document.querySelector('.attribute-head').insertAdjacentHTML('afterEnd', attrHTML);

        document.querySelectorAll('.btn-attr__remove').forEach( item => {
            item.addEventListener('click', attrDelete);
        })
    }
    


    //Action ========================================
    if (addProductButton) {
        addProductButton.addEventListener('click', addProduct);
    }

    if (contentProductClose) {
        contentProductClose.addEventListener('click', closeProduct);
    }

    if (tabButtonWrapper) {
        tabButtonWrapper.addEventListener('click', productTab);
    }

    //currency in cart
    if (currency) {
        currency.addEventListener('change', () => {
            const result = currency.value;
            const dollar = 27.6;

            if (result !== "") {
                price.value 
                    = Math.round(Number(result) * dollar);
                price.setAttribute('disabled', 'disabled');
            }
            

        })
    }

    //add attributes
    if (attrBtnAdd) {
        attrBtnAdd.addEventListener('click', attrAddTable);
    }
    //delete attribute
    if (attrBtnDelete) {
        attrBtnDelete.forEach( item => {
            item.addEventListener('click', attrDelete);
        })
    }


    //fetch api add product in database =======
    if (productForm) {    
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const serializeForm = function (form) {
                var obj = {};
                var formData = new FormData(form);
                for (var key of formData.keys()) {
                    obj[key] = formData.get(key);
                }
                return obj;
            };

            let response = await fetch('/product/add', {
                headers: {'Content-Type': "application/json"},
                method: 'POST',
                body: JSON.stringify(serializeForm(e.target))
            });

            const result = await response.json();

            if (response.ok) {
                document.querySelector('.form-allert').textContent = result.massage;
                document.querySelector('.form-allert').style.color = '#3C9C5A';

                setTimeout(() => {
                    window.location.replace('/product?route=catalog/product');
                }, 2000)
            } else {
                document.querySelector('.form-allert').textContent = result.massage;
                document.querySelector('.form-allert').style.color = '#E14C42';
            }
        })
    }
})