var divs = document.getElementsByTagName('div'),
    body = document.getElementsByTagName('body')[0],
    trigger = 1;

function jump() {
    if (trigger) {
        homeSpeed = 15;
        trigger = 0;
        var homeInterval = setInterval(function () {
            h1.style.top = (parseInt(h1.style.top) - homeSpeed) + 'px';
            homeSpeed--;
            if (parseInt(h1.style.top) > 60) {
                h1.style.top = '61px'
                clearInterval(homeInterval);
                trigger = 1;
            }
        }, 20)
    }
}
var n = 0;
var emerge = setInterval(function () {
    if (n >= 1) {
        clearInterval(emerge);
        body.style.opacity = 1;
    }
    body.style.opacity = n;
    n += 0.025;
}, 50)


for (let i = 0; i < (divs.length - 1); i++) {
    divs[i].addEventListener('mouseenter', function () {
        this.children[0].style.color = 'gold';
        this.children[1].style.display = 'block';
        jump();
    });
    divs[i].addEventListener('mouseleave', function () {
        this.children[0].style.color = 'floralwhite';
        this.children[1].style.display = 'none';
    })
}

var h1 = document.getElementsByTagName('h1')[0],
    buttons = document.getElementsByTagName('button'),
    lock = 0;
h1.style.top = "60px";
h1.style.left = "330px"
h1.addEventListener('mouseenter', jump)


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', function () {
        buttons[i].style.background = "grey";
        buttons[i].style.color = 'white';
        buttons[i].style.fontSize = "32px";
    });
    buttons[i].addEventListener('mouseleave', function () {
        buttons[i].style.background = "honeydew";
        buttons[i].style.color = 'black';
        buttons[i].style.fontSize = "30px";
    });
    buttons[i].addEventListener('click', function () {
        if (!lock) {
            lock = 1;
            var num = 1
            setInterval(function () {
                if (num <= 0) {
                    if (i) {
                        window.location.href = "schedule.html";
                    } else {
                        window.location.href = "home.html";
                    }
                }
                body.style.opacity = num;
                num -= 0.025;
            }, 50)
        }
    })
}