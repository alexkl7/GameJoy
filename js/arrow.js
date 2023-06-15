document.addEventListener('DOMContentLoaded', function () {
    let arrow = document.querySelector('.mainArrow');
    arrow.addEventListener('click', function () {
        let gamesSection = document.getElementById('games');
        let position = gamesSection.offsetTop;
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    });
});