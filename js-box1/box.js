//通过“事件监听”的方式来绑定事件(获取DOM节点)
var startBtn = document.getElementById('startBtn'),
    endBtn = document.getElementById('endBtn');
    box = document.getElementsByClassName('box');
//定义全局变量
var time;
//随机选取三个颜色
function colors() {
    var rgb;
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    rgb = 'rgb('+r+','+g+','+b+')';
    return rgb;
}
//定义开始按钮点击后的函数
function begin() {
    //随机抽取三个div
    while(first == second || second == third || first == third){
        var first = Math.floor(Math.random()*box.length);
        var second = Math.floor(Math.random()*box.length);
        var third = Math.floor(Math.random()*box.length);
        //使生成的数字在console中直观的看到
        console.log(first,second,third);
    }
    //将随机色与三个随机数匹配
    while(firstColor == secondColor || secondColor == thirdColor || firstColor == thirdColor){
        var firstColor = box[first].style.background = colors();
        var secondColor = box[second].style.background = colors();
        var thirdColor = box[third].style.background = colors();      
        //使生成的数字在console中直观的看到
        console.log(firstColor,secondColor,thirdColor);
    }
}
//点击按钮开始
startBtn.onclick = function(){
    //定义间歇循环
    time = setInterval(function(){
        //每次获取随机颜色后恢复默认颜色
        for(var i = 0; i <  box.length; i++){
            box[i].style.backgroundColor = '';
        }
        //开始闪事件。
        begin();
    }
    ,1000);
    //禁用开始按钮
    document.getElementsByTagName("button")[0].disabled=true;
}
//结束闪任务按钮
endBtn.onclick = function(){
    //统一颜色。
    for(var i = 0; i <  box.length; i++){
        box[i].style.backgroundColor = '';
    }
    clearInterval(time);
    //启用开始按钮
    document.getElementsByTagName("button")[0].disabled=false;
}