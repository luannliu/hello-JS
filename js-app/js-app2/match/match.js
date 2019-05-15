//通过“事件监听”的方式来绑定事件(获取DOM节点)
var back = document.getElementById('back');
var num = document.getElementById("number");
var num1 = document.getElementById("numberone");
var num2 = document.getElementById("numbertwo");

//定义点击事件
//定义点击跳转函数
back.onclick = function () {
    window.location.href="home";
}