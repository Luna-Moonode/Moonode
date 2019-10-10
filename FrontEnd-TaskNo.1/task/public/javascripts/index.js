vm = new Vue({
    el: h1,
    data: {
        homeClass: "home0"
    }
});


// h1 button
var button = document.getElementsByTagName('button')[0];
var homepage = document.getElementsByTagName('h1')[0];
//home 550 button 630
//home 0   button 
//550        870
var speed = 1;
button.style.left = '1500px';
homepage.style.left = '0';
function move() {
    if (parseInt(button.style.left) > 680) {
        button.style.left = (parseInt(button.style.left) - speed) + 'px';
    }
    if (parseInt(homepage.style.left) < 560) {
        homepage.style.left = parseInt(homepage.style.left) + speed + 'px';
    }
    speed += 2;
}
mark = setInterval(move, 20);
setTimeout(function () {
    clearInterval(mark);
    changeColor();
}, 600)

function changeColor() {
    var count = 0;
    setInterval(function () {
        vm.homeClass = "home" + (count % 3);
        count++;
    }, 800);
}
