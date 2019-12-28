var imgul = document.getElementById("imgul"),
    h3ul = document.getElementById("h3ul2").children;

imgul = imgul.children;
for (let i = 0; i < imgul.length; i++) {
    imgul[i].children[0].onmouseenter = function () {
        imgul[i].children[1].className = "tuiguang_activespan";
        h3ul[i].children[0].className = "tuiguang_activeh3";
    }
    imgul[i].children[1].onmouseleave = function () {
        imgul[i].children[1].className = "tuiguang_inactivespan";
        h3ul[i].children[0].className = null;
    }
}