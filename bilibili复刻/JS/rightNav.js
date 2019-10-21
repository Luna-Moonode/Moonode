var rightnav = document.getElementById("rightNav");

var trigger = 1;
setInterval(function () {
    if (window.scrollY >= 230 && trigger) {
        trigger = 0;
        rightnav.className = "activerightNav";
    } else if (window.scrollY <= 230 && !trigger) {
        trigger = 1;
        rightnav.className = "inactiverightNav";
    }
}, 100)
//---------
//inactiverightdownload, activerightdownload
// 一个图片80px，-80px 第11个开始振荡 (n - 1) * -80 ： -800到-1200之间振荡
var app = document.getElementById("animationapp"),
    downloadimg = document.getElementById("download");

var acitivateInterval,
    runningInterval,
    shutdownInterval;

app.onmouseenter = function () {
    clearInterval(shutdownInterval);
    downloadimg.className = "activerightdownload";
    acitivateInterval = setInterval(function () {
        app.style.backgroundPositionX = parseInt(app.style.backgroundPositionX) - 80 + 'px';
        if (parseInt(app.style.backgroundPositionX) === (-720)) {
            clearInterval(acitivateInterval);
            var num;
            runningInterval = setInterval(function () {
                if (parseInt(app.style.backgroundPositionX) === (-720)) {
                    num = 80;
                } else if (parseInt(app.style.backgroundPositionX) === (-1200)) {
                    num = -80;
                }
                app.style.backgroundPositionX = parseInt(app.style.backgroundPositionX) - num + 'px';
            }, 120)
        }
    }, 90)
}
app.onmouseleave = function () {
    downloadimg.className = "inactiverightdownload";
    clearInterval(acitivateInterval);
    clearInterval(runningInterval);
    shutdownInterval = setInterval(function () {
        app.style.backgroundPositionX = parseInt(app.style.backgroundPositionX) + 80 + 'px';
        if (parseInt(app.style.backgroundPositionX) === 0) {
            clearInterval(shutdownInterval);
        }
    },90)
}