var scroll = document.getElementById("scroll"),
    circles = document.getElementById("circles").children,
    text = document.getElementById("text").children;

scroll.style.marginLeft = 0; // init
var scrollInterval,
    imgInterval;
var num = 1;
document.onvisibilitychange = function () {
    if (document.visibilityState == "visible") {
        action();
    } else {
        clearInterval(imgInterval)
    }
}
function action() {
    imgInterval = setInterval(function () {
        if (num % 6 === 0) {
            scroll.style.marginLeft = 0;
            num = 1
        }
        // 滑动
        var counter = 0
        var j = num;
        scrollInterval = setInterval(function () {
            scroll.style.marginLeft = (parseInt(scroll.style.marginLeft) - 10) + 'px';
            counter += 10
            if (counter === 440) {
                clearInterval(scrollInterval)
                circles[j - 1].className = "circlespan0";
                circles[(j % 5)].className = "circlespan1";
                text[j - 1].className = "inactive";
                text[(j % 5)].className = "active";
                counter = 0;
            }
        }, 20)
        num += 1;
    }, 7000);
}
action();
var lock_videos = 0;
for (let h = 0; h < circles.length; h++) {
    circles[h].addEventListener("click", function () {
        if (!lock_videos) {
            lock_videos = 1;
            var id = parseInt(this.id);
            clearInterval(scrollInterval);
            clearInterval(imgInterval);
            var counter = 0;
            var clickInterval = setInterval(function () {
                if ((id - num + 1) < 0) {
                    counter -= 10;
                    scroll.style.marginLeft = (parseInt(scroll.style.marginLeft) + 10) + 'px';
                } else if ((num - id) != 1) {
                    counter += 10;
                    scroll.style.marginLeft = (parseInt(scroll.style.marginLeft) - 10) + 'px';
                }
                if (counter === ((id - num + 1) * 440)) {
                    clearInterval(clickInterval)
                    num = id + 1;
                    lock_videos = 0;
                    action();
                }
            }, 5)
            for (let index = 0; index < circles.length; index++) {
                circles[index].className = "circlespan0";
                text[index].className = "inactive"
            }
            this.className = "circlespan1";
            text[parseInt(this.id)].className = "active";
        }
    });
}
var more = document.getElementById("more");
scroll.onmouseenter = function () {
    more.className = "moreactive iconfont";
}
scroll.onmouseleave = function () {
    more.className = "more iconfont";
}

// 蒙版
var videos_uls = document.getElementsByClassName("videos_ulid");
for (let j = 0; j < 2; j++) {
    for (let i = 0; i < videos_uls[j].children.length; i++) {
        videos_uls[j].children[i].children[0].onmouseenter = function () {
            videos_uls[j].children[i].children[1].className = "activediv";
            videos_uls[j].children[i].children[2].className = "inactiveouterh4";
        }
        videos_uls[j].children[i].children[1].onmouseleave = function () {
            videos_uls[j].children[i].children[1].className = null;
            videos_uls[j].children[i].children[2].className = null;
        }
    }
}

var rightvideos = document.getElementById("rightvideos"),
    buttons = document.getElementById("videos").getElementsByTagName("button");

rightvideos.onmouseenter = function () {
    buttons[0].className = "fl activelbtn iconfont";
    buttons[1].className = "fr activerbtn iconfont";
}
rightvideos.onmouseleave = function () {
    buttons[0].className = "fl lbtn iconfont";
    buttons[1].className = "fr rbtn iconfont";
}