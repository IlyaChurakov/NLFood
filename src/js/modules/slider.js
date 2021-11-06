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

export default slider;