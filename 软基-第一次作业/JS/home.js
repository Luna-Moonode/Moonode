var div = document.getElementsByTagName('div')[0];
div.style.opacity = '0';
var num = 0.1;
var emerge = setInterval(function () {
    if (div.style.opacity >= 1) {
        div.style.opacity = '1';
        clearInterval(emerge);
    }
    div.style.opacity = num;
    num += 0.1;
}, 100);


var h1 = document.getElementsByTagName('h1');
for (let i = 0; i < h1.length; i++) {
    h1[i].addEventListener('mouseenter', function () {
        this.style.color = "gold";
    });
    h1[i].addEventListener('mouseleave', function () {
        this.style.color = "cornsilk"
    })
};

var buttons = document.getElementsByTagName('button');
var p1 = document.getElementsByTagName('p1')[0];
var stopButton = document.getElementById("stopButton");

buttons[0].style.left = "330px"
buttons[1].style.left = "532px"
var lock = 0;
for (let i = 0; i < (buttons.length - 1); i++) {
    buttons[i].addEventListener('mouseenter', function () {//<button震动>
        if (!lock) {
            var mode = 1;
            var trigger = 1;
            this.innerHTML = 'Ready?';
            this.style.color = "darkred";
            this.style.fontSize = "33px";
            var buttonInterval = setInterval(function () {
                if (mode) {
                    buttons[i].style.left = (parseInt(buttons[i].style.left) - 2) + 'px';
                    mode = 0;
                } else {
                    buttons[i].style.left = (parseInt(buttons[i].style.left) + 2) + 'px';
                    mode = 1;
                }//</button震动>
                buttons[i].addEventListener('mouseleave', function () {//<button离开解除震动>
                    if (!lock) {
                        if (i) {
                            this.innerHTML = 'Resume';
                            this.style.left = "532px";
                        } else {
                            this.innerHTML = "Schedule"
                            this.style.left = "330px";
                        }
                        clearInterval(buttonInterval);//解除震动计时
                        if (!trigger) {
                            this.innerHTML = 'GO!';
                            this.style.fontSize = "40px";
                            this.style.color = "red";
                        } else {
                            this.style.color = "grey";
                            this.style.fontSize = "30px";
                        }
                    }
                });
            }, 5);

            buttons[i].addEventListener('click', function () {//<点击button>
                clearInterval(buttonInterval);//<停止震动>
                if (!lock) {

                    //显示stop
                    lock = 1;
                    stopButton.style.display = "block";
                    stopButton.style.opacity = '1.2';
                    stopButton.style.background = "";
                    stopButton.style.color = "";
                    stopButton.addEventListener('click', function () {//点击stopButton
                        clearInterval(count);
                        buttons[0].innerHTML = "Schedule";
                        buttons[1].innerHTML = 'Resume'
                        for (let j = 0; j < (buttons.length - 1); j++) {
                            buttons[j].style.color = "grey";
                            buttons[j].style.fontSize = "30px";
                        }
                        lock = 0;
                        p1.style.display = "none";
                        stopButton.style.color = "grey";
                        stopButton.style.display = "none";
                    });
                    //改变内容
                    this.innerHTML = 'GO!';
                    this.style.fontSize = "40px";
                    this.style.color = "red";
                    p1.style.display = "block";
                    p1.innerHTML = "3";
                    var num = parseInt(p1.innerHTML);
                    var count = setInterval(function () {//计数器
                        num -= 1;
                        stopButton.style.opacity = num * 0.3;
                        p1.innerHTML = num.toString();
                        if (!num) {
                            if (i) {
                                window.location.href = "resume.html";
                            } else {
                                window.location.href = "schedule.html"
                            }
                        }
                    }, 1000);
                }
            });
        }
    });
}

