import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, formBtn, timer) {
    const forms = document.querySelectorAll(formSelector),
          btnSend = document.querySelectorAll(formBtn);

          console.log(btnSend);

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div'),
                  loadingSpinner = document.createElement('img');

            loadingSpinner.src = message.loading;
            
            statusMessage.append(loadingSpinner);
            loadingSpinner.style.cssText = `
                display: block;
                margin: 30px auto 0 auto;
            `;
            btnSend[2].setAttribute('disabled', 'disabled');
            btnSend[3].setAttribute('disabled', 'disabled');
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);

            const object = {};

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            formData.forEach((value, key) => {
                object[key] = value;
            });

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
                loadingSpinner.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
                loadingSpinner.remove();
            })
            .finally(() => {
                form.reset();
            });  
        });
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('modal__hide');
        showModal('.modal', timer);

        const thanksModal = document.createElement('div');

        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('modal__show');
            prevModalDialog.classList.remove('modal__hide');
            btnSend[2].removeAttribute('disabled');
            btnSend[3].removeAttribute('disabled');
            closeModal('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

export default forms;