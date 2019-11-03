var refreshButton = document.getElementById("refreshButton"),
    waith3 = document.getElementById('wait');


refreshButton.addEventListener('click', function () {
    waith3.style.display = 'block';
});

// var req = new XMLHttpRequest();
// req.open("GET", "/static/json", false);
// req.send();
var searchinput = document.getElementById("searchinput");
searchinput.addEventListener('click', function () {
    searchinput.value = '';
})
searchinput.addEventListener('blur', function () {
    if (searchinput.value == '') {
        searchinput.value = 'keywords here!'
    }
})