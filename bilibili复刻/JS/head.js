var leftli = document.getElementById("head_leftul").children;

for (let i = 0; i < leftli.length; i++) {
    leftli[i].onmouseenter = function () {
        leftli[i].children[1].className = "activeheaddiv";
    }
    leftli[i].onmouseleave = function () {
        leftli[i].children[1].className = null;
    }
}