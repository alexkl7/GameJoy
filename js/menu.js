
document.addEventListener('DOMContentLoaded', function () {

    var menuLinks = document.querySelectorAll('.menuListLink');

    // Обработчик клика на ссылки меню
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {

            event.preventDefault();

            var targetId = link.getAttribute('href').slice(1); 
            var targetSection = document.getElementById(targetId);

            var position = targetSection.offsetTop;

            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        });
    });
});