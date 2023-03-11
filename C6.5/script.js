const btn = document.querySelector('.j-btn-test');

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

btn.addEventListener('click', () => {

    alert(`Размер экрана: ${screenWidth}px x ${screenHeight}px`);
});