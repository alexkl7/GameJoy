let peoplesBlock = document.querySelector('.peoplesBlock');
let peoplesBlockTwo = document.querySelector('.peoplesBlockTwo');
let slideInterval = setInterval(switchSlides, 3000);
function switchSlides() {
    if (peoplesBlock.style.display !== 'none') {
        peoplesBlock.classList.add('slide-left');
        setTimeout(function () {
            peoplesBlock.style.display = 'none';
            peoplesBlockTwo.style.display = 'flex';
            peoplesBlockTwo.classList.remove('slide-left');
        }, 500);
    } else {
        peoplesBlockTwo.classList.add('slide-left');
        setTimeout(function () {
            peoplesBlockTwo.style.display = 'none';
            peoplesBlock.style.display = 'flex';
            peoplesBlock.classList.remove('slide-left');
        }, 500);
    }
}