//定义点击事件
var back = document.getElementById('back');
var next = document.getElementById('next');
//用户输入的玩家总数
var players = document.getElementById("number");
//滑动条value
var rangeNumber = document.getElementById("range-number");
//滑动条左右加减按钮
var btnSub = document.getElementsByClassName('button-sub');
var btnAdd = document.getElementsByClassName('button-add');
//点击设置
var set = document.getElementById("set");
//定义杀手变量和平民变量
var killer = document.getElementById("numberone");
var civilian = document.getElementById("numbertwo");

var fromWhere = '';
//定义点击跳转函数
back.onclick = function () {
    window.location.href="../html/home.html";
}


//关联输入框和滑动条
players.oninput = function () { 
    //正则检验输入为数字，否则为空
    var x = /\D/g; //定义正则，非数字规则
    this.value = this.value.replace(x,""); //为非数字时替换成空
    //players的值赋给rangenumber
    rangeNumber.value = players.value;
}
rangeNumber.onchange = function () {
    //rangenumber的值赋给players
    players.value = rangeNumber.value;
}
//关联加减按钮的input
function Sub() {
    rangeNumber.value--;
    players.value = rangeNumber.value;
}
function Add() {
    rangeNumber.value++;
    players.value = rangeNumber.value;
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
}


//点击设置后设置人数
set.onclick = function () {
    if(players.value >= 4 && players.value <= 18){
        assign();
    }else{
        confirm("请输入正确的玩家数量");
    }

}



    // 生成数组
function arrbegin(){
    arr = [];
    arr.length = 0;
    killers = [];
    killers.length = 0;
    civilians = [];
    civilians.length = 0;
    for (var i=0;i<killer.value;i++){
        killers.push("杀手");
    }
    for (var i=0;i<civilian.value;i++){
        civilians.push("平民");
    }
    arr = killers.concat(civilians);
}

function shuffle(){
    arrbegin();//创建数组
    // 数组乱序
    var len=arr.length;
    if(len<=1){return arr;}
    for(var i=len-1;i>0;i--){
        var ind=Math.round(Math.random()*i); //随即产生0到i之间的一个数并将其四舍五入成一个整数，作为随机选中的元素的下标
        var tmp=arr[i];
        arr[i]=arr[ind];
        arr[ind]=tmp; //随机数与最后一个元素进行交换
    }
    sessionStorage.setItem("arr", JSON.stringify(arr)); //前者存储定义的名字,后者是存储的数组
    console.log(arr);
}


//按钮判断效果
next.onclick = function () {
    if(players.value === "" || parseInt(players.value) <= 3  || parseInt(players.value) >= 19){
        confirm("请输入正确的玩家数量");
    }else if (killer.innerHTML === "?") {
        confirm("请点击设置");
    }else{
        sessionStorage.setItem("fromWhere", fromWhere);
        window.location.href="../html/identity.html";
        shuffle();
    }
}