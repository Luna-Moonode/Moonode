var vm_h1 = new Vue({
    el: '#h1',
    data: {
        homeClass: "home0"
    }
});
var vm_button = new Vue({
    el: '#button',
    data: {
        buttonClass: 'button0'
    },
    methods: {
        mouseenter: function () {
            this.buttonClass = 'button1'
        },
        mouseleave: function () {
            this.buttonClass = 'button0'
        }
    }
});


function changeColor() {
    var count = 0;
    setInterval(function () {
        vm_h1.homeClass = "home" + (count % 3);
        count++;
    }, 800);
}


var button = document.getElementById('button'),
    homepage = document.getElementById('h1'),
    speed = 1;
button.style.left = '1500px';
homepage.style.top = '238px'
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

var trigger = 1;
homepage.addEventListener('mouseenter', function () {
    if (trigger) {
        homeSpeed = 20;
        trigger = 0;
        var homeInterval = setInterval(function () {
            homepage.style.top = (parseInt(homepage.style.top) - homeSpeed) + 'px';
            homeSpeed--;
            if (parseInt(homepage.style.top) > 220) {
                homepage.style.top = '221px'
                clearInterval(homeInterval);
                trigger = 1;
            }
        }, 20)
    }
});

button.addEventListener('mouseenter', function () {
    var mode = 1;
    button.innerHTML = 'Let\'s go!';
    var buttonInterval = setInterval(function () {
        if (mode) {
            button.style.left = (parseInt(button.style.left) - 2) + 'px';
            mode = 0;
        } else {
            button.style.left = (parseInt(button.style.left) + 2) + 'px';
            mode = 1;
        }
    }, 5);
    button.addEventListener('mouseleave', function () {
        button.innerHTML = 'Hello World!';
        clearInterval(buttonInterval);
    });
})
