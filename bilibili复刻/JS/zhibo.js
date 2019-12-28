var windows = document.getElementById("windows"),
    topli = document.getElementById("topUl").children,
    rightfloat = document.getElementById("rightfloat");

// 选择
windows.style.marginLeft = 0;
var lock_windows = 0;
for (let i = 0; i < topli.length; i++) {
    topli[i].addEventListener("click", function () {
        rightfloat.style.display = "none";
        if (!lock_windows) {
            lock_windows = 1;
            var start = parseInt(windows.style.marginLeft);
            var end = -parseInt(this.id) * 260;
            var moveInterval = setInterval(function () {
                if (parseInt(windows.style.marginLeft) === end) {
                    lock_windows = 0;
                    clearInterval(moveInterval)
                } else {
                    windows.style.marginLeft = parseInt(windows.style.marginLeft) + (end - start) / 10 + 'px';
                }
            }, 20)
        }
    })
}
topli[2].addEventListener("click", function () {
    rightfloat.style.display = "block";
});
// 
for (let i = 0; i < topli.length; i++) {
    topli[i].onmouseenter = function () {
        if (this.className !== 'liclick') {
            this.className = "limouseenter";
        }
    }
    topli[i].onmouseleave = function () {
        if (this.className !== 'liclick') {
            this.className = null;
        }
    }
    topli[i].onclick = function () {
        for (let i = 0; i < topli.length; i++) {
            topli[i].className = null;
        }
        this.className = "liclick";
    }
}
// 轮播图
var imgs = document.getElementById("rightScroll"),
    texts = document.getElementById("rightScrollh3").children,
    tiaos = document.getElementById("rightScrollspan").children;
    
var imgInterval1,
    scrollInterval1,
    num1 = 1;
document.onvisibilitychange = function () {
    if (document.visibilityState == "visible") {
        action1()
    } else {
        clearInterval(imgInterval1)
    }
}
imgs.style.marginLeft = 0;
function action1() {
    imgInterval1 = setInterval(function () {
        if (num1 % 4 === 0) {
            imgs.style.marginLeft = 0;
            num1 = 1
        }
        // 滑动
        var count = 0
        scrollInterval1 = setInterval(function () {
            imgs.style.marginLeft = (parseInt(imgs.style.marginLeft) - 10) + 'px';
            count += 10
            tiaos[j - 1].className = 'inactiveli';
            tiaos[j % 3].className = 'activeli';
            if (count === 260) {
                clearInterval(scrollInterval1)
            }
        }, 15);
        var j = num1;
        num1 += 1;
    }, 7000);
}
action1();
var lock_imgs = 0;
for (let i = 0; i < tiaos.length; i++) {
    tiaos[i].addEventListener("mouseenter", function () {
        clearInterval(imgInterval1);
        clearInterval(scrollInterval1);
        if (!lock_imgs) {
            lock_imgs = 1;
            var count = 0;
            var id = parseInt(this.id);
            // move
            var clickInterval = setInterval(function () {
                if ((id - num1 + 1) < 0) {
                    imgs.style.marginLeft = (parseInt(imgs.style.marginLeft) + 10) + 'px';
                    count -= 10
                } else if ((num1 - id) != 1) {
                    imgs.style.marginLeft = (parseInt(imgs.style.marginLeft) - 10) + 'px';
                    count += 10
                }
                if (count === ((id - num1 + 1) * 260)) {
                    lock_imgs = 0;
                    num1 = id + 1;
                    clearInterval(clickInterval);
                    action1();
                }
            }, 10)
            // style
            for (let h = 0; h < tiaos.length; h++) {
                tiaos[h].className = 'inactiveli';
                texts[h].className = 'h3inactive' /* 我起的什么破名。。*/
            }
            this.className = 'activeli';
            texts[id].className = 'h3active';
        }
    })
}