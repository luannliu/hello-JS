//通过“事件监听”的方式来绑定事件(获取DOM节点)
var startBtn = document.getElementById('startBtn'),
    endBtn = document.getElementById('endBtn');
    box = document.getElementsByClassName('box');
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
//随机抽取三个div
function begin() {
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
startBtn.onclick = function(){
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
    //启用开始按钮
    document.getElementsByTagName("button")[0].disabled=false;
}