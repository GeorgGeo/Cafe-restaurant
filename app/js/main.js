'use strict';

$(function () {
    // $('body').css('background-color', 'blue')
});

/**
 * Preload
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector('[data-preload]');

window.addEventListener('load', function () {
    preloader.classList.add('loaded');
    document.body.classList.add('loaded');
});

//** add event listener on multiple elements */

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

//** Navbar */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

//** Header */
const header = document.querySelector("[data-header]");
// BACK TOP BTN
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    };

    lastScrollPos = window.scrollY;
};
//
// Добавляем обработчик событий для клика на кнопку "наверх"
backTopBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки
    scrollToTop(); // Вызываем функцию для плавной прокрутки наверх
    return false; // Возвращаем false, чтобы предотвратить дополнительное выполнение события
});

function scrollToTop() {
    // Прокручиваем страницу вверх
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Делаем прокрутку плавной
    });
}


//
window.addEventListener("scroll", function () {
    if (this.window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
});

//**Hero Slider */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSlidePos].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    };

    updateSliderPos();
};

heroSliderNextBtn.addEventListener('click', slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    };

    updateSliderPos();
};

heroSliderPrevBtn.addEventListener('click', slidePrev);

//**auto slide */
let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseover', function () {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 'mouseout', autoSlide);

window.addEventListener('load', autoSlide);

//
document.addEventListener('DOMContentLoaded', clickCancelLink);

function clickCancelLink() {
    const imageLinks = document.querySelectorAll('.has-before');

    if (imageLinks) {
        imageLinks.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();// Отменяем стандартное действие по клику на ссылку
                e.stopPropagation();// Останавливаем распространение события, чтобы избежать всплытия события до родительского элемента
            })
        })
    };
};
//
// Создание элемента стиля
document.addEventListener("DOMContentLoaded", function () {
    const audioElement = document.getElementById("audioElement");
    audioElement.play().catch(function(error) {
        console.log("Автоматическое воспроизведение блокировано: " + error);
    });
    //
    const badge = document.querySelector('.badge-2');
    const badge1 = document.querySelector('.badge-1');
    if (badge && badge1) {
        badge.setAttribute('loading', 'lazy');
        badge1.setAttribute('loading', 'lazy');
    };
    // POPUP
    const btnPopup = document.querySelector('.popup__body');
    console.log(btnPopup);

    function closePopup(e) {
        e.preventDefault();
        const popupBody = document.querySelector('.popup');
        
        popupBody.classList.add('close');
    };

    btnPopup.addEventListener('click', closePopup);
});
// Parallax effect
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener('mousemove', function (e) {

    x = (e.clientX / window.innerWidth * 10) - 5;
    y = (e.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].computedStyleMap.transform = `translate3d(${x}px, ${y}px, 0px)`;
    };
});

window.addEventListener('touchmove', function (e) {
    // Получаем первое касание (для простоты, можно адаптировать для мультитача)
    const touch = e.touches[0];

    // Проверяем, что касание было обнаружено
    if (touch) {
        x = (touch.clientX / window.innerWidth * 10) - 5;
        y = (touch.clientY / window.innerHeight * 10) - 5;

        // reverse the number eg. 20 -> -20, -5 -> 5
        // Обратное преобразование чисел
        x = x - (x * 2);
        y = y - (y * 2);

        for (let i = 0, len = parallaxItems.length; i < len; i++) {
            x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
            y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
            parallaxItems[i].computedStyleMap.transform = `translate3d(${x}px, ${y}px, 0px)`;
        };
    }
});
//
//** код, который будет работать как с мышью, так и с тачпадом: */
function handleMove(e) {
    if (e.type === 'mousemove') {
        x = (e.clientX / window.innerWidth * 10) - 5;
        y = (e.clientY / window.innerHeight * 10) - 5;
    } else if (e.type === 'touchmove') {
        const touch = e.touches[0];
        if (touch) {
            x = (touch.clientX / window.innerWidth * 10) - 5;
            y = (touch.clientY / window.innerHeight * 10) - 5;
        }
    }

    // Reverse the number
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        xTransformed = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        yTransformed = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${xTransformed}px, ${yTransformed}px, 0px)`;
    }
}

window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', handleMove);


