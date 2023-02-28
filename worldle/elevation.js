function writeElevation(lat_long) {
    var api_url = 'https://api.open-elevation.com/api/v1/lookup?locations=' + lat_long.lat + ',' + lat_long.lng
    var sol = document.getElementById('solution')
    fetch(api_url)
        // .then(res => res.text())
        .then(res => res.json())
        .then(res => {
            sol.innerHTML = res.results[0].elevation;
    });
}
function writeGuess(lat_long) {
    var api_url = 'https://api.open-elevation.com/api/v1/lookup?locations=' + lat_long.lat + ',' + lat_long.lng
    var g = document.getElementById('guess')
    fetch(api_url)
        // .then(res => res.text())
        .then(res => res.json())
        .then(res => {
            g.innerHTML = res.results[0].elevation;
    });
}