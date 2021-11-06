import {getResource} from "../services/services";

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

    

    getResource('http://localhost:3000/menu')
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

export default cards;