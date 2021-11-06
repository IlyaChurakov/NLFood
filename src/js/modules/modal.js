function showModal(elemForGet, timer) {
    const modal = document.querySelector(elemForGet);

    modal.classList.add('modal__show');
    document.body.style.overflow = 'hidden';
    
    if(timer) {
        clearInterval(timer);
    }
}

function closeModal(elemForGet) {
    const modal = document.querySelector(elemForGet);

    modal.classList.remove('modal__show');
    document.body.style.overflow = '';
}

function modal(getModal, getBtns, timer) {
    const modal = document.querySelector(getModal),
          modalBtns = document.querySelectorAll(getBtns);

    modalBtns.forEach((item) => {
        item.addEventListener('click', () => {
            showModal(getModal, timer);
        });
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(getModal);
            window.removeEventListener('scroll', showModalToScrollEnd);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('modal__show')) {
            closeModal(getModal);
            window.removeEventListener('scroll', showModalToScrollEnd);
        }
    });

    // document.documentElement.clientHeight//Высота видимой области
    // window.pageYOffset//То что пролистано от начала страницы до начала видимой области  
    // document.documentElement.scrollHeight//Общая высота документа
    
    function showModalToScrollEnd() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(getModal, timer);
            window.removeEventListener('scroll', showModalToScrollEnd);
        }
    }

    window.addEventListener('scroll', showModalToScrollEnd);
}


export default modal;
export {closeModal, showModal};