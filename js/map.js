ymaps.ready(init);
function init() {
    let map = new ymaps.Map("map", {
        center: [47.235713, 39.701505],
        zoom: 16
    });
    let address = "Город Ростов-на-Дону, площадь Гагарина 1";
    ymaps.geocode(address, {
        results: 1
    }).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        let coords = firstGeoObject.geometry.getCoordinates();
        let placemark = new ymaps.Placemark(coords, {
            balloonContent: address
        });
        map.geoObjects.add(placemark);
        map.setCenter(coords);
    });
}