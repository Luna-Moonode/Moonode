var imgul = document.getElementById("imgul");

imgul = imgul.children;
for (let i = 0; i < imgul.length; i++) {
    console.log(imgul[i].children[0])
    imgul[i].children[0].onmouseenter = function () {
        imgul[i].children[1].className = "activespan";
    }
    imgul[i].children[0].onmouseleave = function () {
        imgul[i].children[1].className = "inactivespan";
    }
}