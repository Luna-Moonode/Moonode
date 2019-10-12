var h1 = document.getElementsByTagName('h1')[0],
    divs = document.getElementsByTagName('div'),
    buttons = document.getElementsByTagName('button'),
    table = document.getElementsByTagName('table')[0],
    body = document.getElementsByTagName('body')[0];

table.style.display = "none";
table.style.left = '-400px';

function fly() {
    var speed = 1;
    var flyInterval = setInterval(function () {
        if (parseInt(table.style.left) >= 360) {
            clearInterval(flyInterval);
            speed = 1;
            var backInterval = setInterval(function () {
                if (parseInt(table.style.left) <= 300) {
                    clearInterval(backInterval);
                    table.style.left = '300px';
                }
                table.style.left = (parseInt(table.style.left) - speed) + 'px';
                speed += 0.2;
            }, 10);
        }
        table.style.left = parseInt(table.style.left) + speed + 'px';
        speed++;
    }, 10);
}



var n = 0;
var emerge = setInterval(function () {
    if (n >= 1) {
        clearInterval(emerge);
        body.style.opacity = 1;
        table.style.display = "table"
        fly();
    }
    body.style.opacity = n;
    n += 0.025;
}, 50)


for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener('mouseenter', function () {
        this.children[0].style.display = 'none';
        this.children[1].style.display = 'block';
    });
    divs[i].addEventListener('mouseleave', function () {
        this.children[0].style.display = 'block';
        this.children[1].style.display = 'none';
    })
}

var lock = 0;
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', function () {
        this.style.color = "orange";
        this.style.fontSize = "32px";
    });
    buttons[i].addEventListener('mouseleave', function () {
        this.style.color = "black";
        this.style.fontSize = "30px";
    });
    buttons[i].addEventListener('click', function () {
        if (!lock) {
            lock = 1;
            var num = 1
            setInterval(function () {
                if (num <= 0) {
                    if (i) {
                        window.location.href = "resume.html";
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

var trigger = 1;
h1.style.top = "67px";
h1.style.left = "330px"
h1.addEventListener('mouseenter', function () {
    if (trigger) {
        homeSpeed = 15;
        trigger = 0;
        var homeInterval = setInterval(function () {
            h1.style.top = (parseInt(h1.style.top) - homeSpeed) + 'px';
            homeSpeed--;
            if (parseInt(h1.style.top) > 67) {
                h1.style.top = '68px'
                clearInterval(homeInterval);
                trigger = 1;
            }
        }, 20)
    }
});



