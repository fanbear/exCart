'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // product form =========================
    const productForm = document.querySelector('#add-product');
    const productFormImage = document.querySelector('#add-product__image');

    // product cart =========================
    const tabButtonWrapper = document.querySelector('.form-button__wrapper');
    const tabButton = document.querySelectorAll('.form-button__item');
    const tabPage = document.querySelectorAll('.form-tabs');
    const currency = document.querySelector('input[name="pricein"]');
    const price = document.querySelector('input[name="price"');
    const attrBtnAdd = document.querySelector('.btn-attr__add');
    const attrBtnDelete = document.querySelectorAll('.btn-attr__remove');
    const addMainImg = document.querySelector('.main-img__btn');
    const closeImgWrapper = document.querySelector('.add-image__close');
    const imageCollection = document.querySelector('.image-colection');


    //product cart ==========================

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
    const attrAddTable = () => {

        const attrGetCount = () => document.querySelectorAll('.attribute-item').length + 1;

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
    
    //open add img wrapper
    const toggleAddImgWrapper = (e) => {
    
        const item = document.querySelector('.add-image');

        if (item.classList.contains('hidden')) {
            item.classList.remove('hidden');
            item.style.zIndex = '1030';
        } else {
            item.classList.add('hidden');
            item.style.zIndex = '-1';
        }
    }

    //alert massage
    const alertMassange = (selector, massage,  color, url) => {

        const  item = document.querySelector(selector);

        item.textContent = !url ? massage : massage + ' ' + url;
        item.style.color = color;
        item.style.right = '0';
        item.style.opacity = '1';

        setTimeout(() => {
            item.style.right = '600px';
        item.style.opacity = '0';
        }, 5000)
    }

    //add img from image collection
    const addImageCollection = (e) => {
        const index = e.target.src.indexOf('/u');

        document.querySelector('.img-wrapper img').src =  e.target.src.substr(index);
        document.querySelector('.img-wrapper input[name="img_src"]').
            setAttribute('value', e.target.src.substr(index));

        toggleAddImgWrapper();
    }

    //Action ========================================
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
    
    //open add img wraper 
    if(addMainImg) {
        addMainImg.addEventListener('click', toggleAddImgWrapper);
    }
    //close add img wrapper
    if (closeImgWrapper) {
        closeImgWrapper.addEventListener('click', toggleAddImgWrapper);
    }

    //add image src from image collection
    if (imageCollection) {
        imageCollection.addEventListener('click', addImageCollection);
    }


    //Fetch ==============================
    //Add product image
    if (productFormImage) {
        productFormImage.addEventListener('submit', async (e) => {
            e.preventDefault();

            let formData = new FormData(e.target);

            let res = await fetch('/product/image', {
                method: 'POST',
                body: formData
            })

            let result = await res.json();

            if (res.ok) {

                let src = result.url.replace('public', '');

                alertMassange('.form-allert', result.massage, '#3C9C5A', result.url);
                document.querySelector('.img-wrapper img').src = src;
                document.querySelector('.img-wrapper input[name="img_src"]').setAttribute('value', src);
                setTimeout(() => { toggleAddImgWrapper() }, 1000);
            } else {

                alertMassange('.form-allert', result.massage, '#E14C42');
            }
        })
    }

    //Add all product data in database =======
    if (productForm) {    
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            //concatenation of a name with a description
            const addAttribute = (name, desc) => {
                let attribute = [];

                for (let i = 0; i < name.length; i++){
                    attribute[i] = ({ [name[i]] : desc[i]})
                }
                return attribute;
            }

            const serializeForm = function (form) {

                let obj = {};
                let attrName = [];
                let attrDesc = [];
                const formData = new FormData(form);

                for (let key of formData.keys()) {
                    if (key.indexOf('attrname') != -1) {
                        attrName.push(formData.get(key));
                    } else if (key.indexOf('textareaname') != -1){
                        attrDesc.push(formData.get(key));
                    } else {
                        obj[key] = formData.get(key);
                    }
                }

                obj.attribute = addAttribute(attrName, attrDesc);
                return obj;
            };

            let response = await fetch('/product/add', {
                headers: {'Content-Type': "application/json"},
                method: 'POST',
                body: JSON.stringify(serializeForm(e.target))
            });

            let result = await response.json();

            if (response.ok) {
                alertMassange('.form-allert', result.massage, '#3C9C5A');

                setTimeout(() => {
                    window.location.replace('/product?route=catalog/product');
                }, 2000)
            } else {
                alertMassange('.form-allert', result.massage, '#E14C42');
            }
        })
    }

})