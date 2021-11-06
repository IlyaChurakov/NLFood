/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector('#result');

    let sex = 'female', 
        weight, height, age,
        k = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !k) {
            result.textContent = '____';
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round(((weight * 10) + (height * 6.25) - (age * 5) - 161) * k);
        } else {
            result.textContent = Math.round(((weight * 10) + (height * 6.25) - (age * 5) + 5) * k);
        }
    }

    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-k')) {
                    k = +e.target.getAttribute('data-k');
                } else {
                    sex = e.target.getAttribute('id');
                }
            
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

        
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {
    class Card {

        constructor(img, alt, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.classes = classes;
            this.descr = descr;
            this.price = `${price}</span> грн`;
            this.parent = document.querySelector(parentSelector);
            this.convertToRub();
        }

        convertToRub() {
            this.price = `${Math.round(parseFloat(this.price) * 2.76)} руб.`;
        }

        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }

            element.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        });
    });// С классами

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new Card(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });//Через axios


    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // } // Без классов
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', timer);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    const wrapper = document.querySelector('.offer__slider-wrapper'),
          slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.querySelector('#current'),
          circles = document.querySelectorAll('.offer__circle');
    
    let count = 0;
    let currentCount = 1;

    if(currentCount > 0 && currentCount < 10) {
        current.textContent = `0${currentCount}`;
    }

    wrapper.style.overflow = 'hidden';
    slides.forEach(item => {
        item.style.transition = '0.5s all';
    });

    function checkZero(numberOfCircle = currentCount) {
        if(currentCount > 0 && currentCount < 10) {
            current.textContent = `0${numberOfCircle}`;
        } else {
            current.textContent = `${numberOfCircle}`;
        }
    }

    function highlightActiveCircle() {
        circles.forEach((item, num) => {
            item.classList.remove('active');
            if(currentCount == 1) {
                circles[0].classList.add('active');
            } else if(currentCount == 2) {
                circles[1].classList.add('active');
            } else if(currentCount == 3) {
                circles[2].classList.add('active');
            } else if(currentCount == 4) {
                circles[3].classList.add('active');
            }
        });
    }

    function moveSlides() {
        slides.forEach(item => {
            item.style.transform = `translateX(${count}px)`;
        });
    }

    prev.addEventListener('click', () => {

        count = count + 650;
        currentCount = currentCount - 1;

        if(currentCount < 1) {
            currentCount = 4;
            count = -1950;
        }

        highlightActiveCircle();
        checkZero();
        moveSlides();
    });

    next.addEventListener('click', () => {

        count = count - 650;
        currentCount = currentCount + 1;

        if(currentCount > 4) {
            currentCount = 1;
            count = 0;
        }

        highlightActiveCircle();
        checkZero();
        moveSlides();
    });

    function navigate(numberOfPixels, numberOfCircle) {
        slides.forEach(item => {
            item.style.transform = `translateX(${numberOfPixels}px)`;
            circles.forEach(item => {
                item.classList.remove('active');
            });
            circles[numberOfCircle - 1].classList.add('active');

            checkZero(numberOfCircle);

        });
    }

    circles.forEach((item) => {
        item.addEventListener('click', (event) => {
            if(event.target == circles[0]) {
                navigate(0, 1);
            } else if(event.target == circles[1]) {
                navigate(-650, 2);
            } else if(event.target == circles[2]) {
                navigate(-1300, 3);
            } else if(event.target == circles[3]) {
                navigate(-1950, 4);
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(itemsSelector, parentItemSelector, tabcontentsSelector, itemsActiveSelector, tabcontentsActiveSelector) {
    const items = document.querySelectorAll(itemsSelector),
        parentItem = document.querySelector(parentItemSelector),
        tabcontents = document.querySelectorAll(tabcontentsSelector);


    parentItem.addEventListener('click', (e) => {

        items.forEach((item, num) => {

            if(e.target == item) {

                removeClassActiveAndAnimation(items, itemsActiveSelector);
                item.classList.add(itemsActiveSelector);

                removeClassActiveAndAnimation(tabcontents, tabcontentsActiveSelector, 'fade');
                tabcontents[num].classList.add(tabcontentsActiveSelector, 'fade');
            }
        });
    });

    function removeClassActiveAndAnimation(Element, deleteClass, animation) {
        Element.forEach((i) => {
            i.classList.remove(deleteClass);
            i.classList.remove(animation);
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadline) {

    function getTimeRemaining(endtime) {
        const diff = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours = Math.floor((diff - (days * 1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((diff - (days * 1000 * 60 * 60 * 24) - (hours * 1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((diff - (days * 1000 * 60 * 60 * 24) - (hours * 1000 * 60 * 60) - (minutes * 1000 * 60)) / 1000);

        return {
            'total': diff,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function zero(arg) {
        if(arg >= 0 && arg < 10) {
            return `0${arg}`;
        } else {
            return `${arg}`;
        }
    }

    function setTime(endtime) {
        const daysE = document.querySelector('#days'),
            hoursE = document.querySelector('#hours'),
            minutesE = document.querySelector('#minutes'),
            secondsE = document.querySelector('#seconds'),
            id = setInterval(update, 1000);

        update();

        function update() {
            const t = getTimeRemaining(endtime);

            daysE.innerHTML = zero(t.days);
            hoursE.innerHTML = zero(t.hours);
            minutesE.innerHTML = zero(t.minutes);
            secondsE.innerHTML = zero(t.seconds);

            if(t.total <= 0) {
                clearInterval(id);
            }
        }
    }

    setTime(deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");











window.addEventListener('DOMContentLoaded', () => {

    const modalTime = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTime), 5000);
    
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active', 'tabcontent__active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-modal]', modalTime);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('2021-11-30');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', '.btn', modalTime);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});



})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map