'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import slider from './modules/slider';
import forms from './modules/forms';
import cards from './modules/cards';
import calculator from './modules/calculator';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTime = setTimeout(() => showModal('.modal', modalTime), 5000);
    
    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active', 'tabcontent__active');
    modal('.modal', '[data-modal]', modalTime);
    timer('2021-11-30');
    slider();
    forms('form', '.btn', modalTime);
    cards();
    calculator();
});


