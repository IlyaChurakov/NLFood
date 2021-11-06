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

export default calculator;