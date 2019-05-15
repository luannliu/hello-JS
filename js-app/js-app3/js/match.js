//定义点击事件
var back = document.getElementById('back');
var next = document.getElementById('next');
//声明滑动条左右加减按钮
var btnSub = document.getElementsByClassName('button-sub');
var btnAdd = document.getElementsByClassName('button-add');
//声明玩家总数
var players = document.getElementById("number");
//声明杀手变量和平民变量
var killer = document.getElementById("numberone");
var civilian = document.getElementById("numbertwo");
//获取用户输入玩家总数
var rangeNumber = document.getElementById("range-number");
var arr = [];

//定义点击跳转函数
back.onclick = function () {
    window.location.href="../html/home.html";
}


//关联输入框和滑动条
players.oninput = function () { 
    //players的值赋给rangenumber
    rangeNumber.value = players.value;
    //正则检验输入为数字，否则为空
    var x = /\D/g; //定义正则，非数字规则
    this.value = this.value.replace(x,""); //为非数字时替换成空
    // 分配人数
    assign();
}
rangeNumber.onchange = function () {
    //rangenumber的值赋给players
    players.value = rangeNumber.value;
    // 分配人数
    assign();
}
//关联加减按钮的input
function Sub() {
    rangeNumber.value--;
    players.value = rangeNumber.value;
    assign();
}
function Add() {
    rangeNumber.value++;
    players.value = rangeNumber.value;
    assign();
}

    // 生成数组
function arrbegin(){
    arr.length = 0;
    for (var i=0;i<killer.value;i++){
        arr.push("杀手");
    }
    for (var i=0;i<civilian.value;i++){
        arr.push("平民");
    }
}

function shuffle(){
    arrbegin();
    // 数组乱序
    var len=arr.length;
    if(len<=1){return arr;}
    for(var i=len-1;i>0;i--){
        var ind=Math.round(Math.random()*i); //随即产生0到i之间的一个数并将其四舍五入成一个整数，作为随机选中的元素的下标
        var tmp=arr[i];
        arr[i]=arr[ind];
        arr[ind]=tmp; //随机数与最后一个元素进行交换
    }
    console.log(arr);
}

//设置分配角色人数
function assign() {
    if (players.value==15||players.value==18) {
        killer.innerHTML=Math.floor(players.value/3-1);
        killer.value=killer.innerHTML;
        civilian.innerHTML=players.value- killer.innerHTML;
        civilian.value=civilian.innerHTML;
    }
    else {
        killer.innerHTML=Math.floor(players.value/3);
        killer.value=killer.innerHTML;
        civilian.innerHTML=players.value- killer.innerHTML;
        civilian.value=civilian.innerHTML;
    }
    console.log(killer.value,civilian.value);
    // 洗牌算法，使数组乱序
    shuffle();
}

//按钮判断效果
next.onclick = function () {
    if(players.value >= 4 && players.value <= 18){
        window.location.href="../html/identity.html";
    }else{
        confirm("请输入正确的数字");
    }
}