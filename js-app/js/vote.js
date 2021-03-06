//获取上一个页面的参数数据
var arr = JSON.parse(sessionStorage.getItem('arr'));
var all = JSON.parse(sessionStorage.getItem('all'));
// console.log(arr,"arr");
// console.log(arr.length,"arr.length");
var fromWhere = sessionStorage.getItem('fromWhere'); //声明变量获取fromWhere的数据（向下一页面声明由哪个按钮而来 进而触发相应函数
// console.log(fromWhere,"fromWhere"); 
var day = sessionStorage.getItem("day");
// console.log(day,"day");
var deads = JSON.parse(sessionStorage.getItem('deads'));//被杀数组
var dead = sessionStorage.getItem('dead');//被杀
var vote = JSON.parse(sessionStorage.getItem('vote'));//被投数组
var voted = sessionStorage.getItem('voted');//被投

var live=[];
// 渲染九宫格样式
$(function(){
    // 定义html内玩家信息盒子
    var repeat = $(".main-content").html();
    // 渲染html内初始玩家信息盒子
    $(".identity").eq(0).html(arr[0]);
    $(".number").eq(0).text(1 + "号"); 
    // // 利用循环更改html
    for (i=1,len=arr.length; i < len ; i++){
        $(".main-content").append(repeat); 
        // 更改添加后的html玩家信息盒子
        $(".identity").eq(i).html(arr[i]);
        $(".number").eq(i).text(i + 1 + "号"); 
    }
    //如果已经死亡的人，则改变颜色
    for (let b = 0; b < all.length; b++) {
        if (all[b].death == true) {
            $('.identity').eq(b).css('background-color','#eb3855');
        }else{
            //为还存活的人创建数组
            live.push(all[b]);
        }
    }
})

// 定义音乐暂停及播放
var m = 0;
var audio = $("audio")[0];
$(".audio").click(function(){
    var s = m % 2;
    if(s!=0){
        //如果已停止则播放音频并更换图标
        $(".play").css("opacity","0");
        $(".pause").css("opacity","1");
        audio.play();
    }else if (s==0) {
        //如果已停止重新加载音频并关闭音频和更换d图标
        $(".pause").css("opacity","0");
        $(".play").css("opacity","1");
        audio.pause();
    }
    m++;
    // console.log(m);
})
$(document).ready(function(){
    //判断三个页面点击进入后改变文本的内容并绑定点击事件
    if (fromWhere === '点击杀人') { 
        //判断如果当前是否杀人页面并改变文字内容
        $('#header-title').html('杀手杀人');
        $('.main-title p').html('杀手请睁眼，选择要杀的身份');
        $('.main-tip').html('点击下方玩家头像，对被杀玩家进行标记');
        $('#start').html('确定');
        //给身份添加点击事件
        $('.main-content').on('click','.item', function(){
            // 重置颜色及生死状态 防止多次点击杀死多个玩家
            for(i=0;i<live.length;i++){
                live[i].death = false;
                live[i].cause = "";
                n = live[i].num;
                $('.identity').eq(n-1).css('background-color','#f5c97b');
            }
            s = $(this).index();
            //开始
            if(all[s].name == '平民' && all[s].death == true){ //判断是平民已经被杀
                alert('他已经死掉了啦');
            }else if(all[s].name == '杀手'){ //判断是否杀手被杀
                alert('不可以杀死自己人哦');
            }else{
                $('.identity').eq(s).css('background-color','#eb3855');
                all[s].death = true;
                all[s].cause = 'killed';
            }
            // 被杀玩家
            dead = all[s].num;
            sessionStorage.setItem("dead", dead);
            sessionStorage.setItem("fromWhere", fromWhere);
        })  
    } else if (fromWhere === "点击投票") { 
        //当前是投票页面改变文字内容
        $('#header-title').text('全民投票');
        $('.main-title p').text('请投票');
        $('.main-tip').html('点击下方玩家头像，投死谁');
        $('#start').html('确定');
        //给身份添加按钮事件
        $('.main-content').on('click','.item', function(){
            // 重置颜色及生死状态 防止多次点击杀死多个玩家
            for(i=0;i<live.length;i++){
                live[i].death = false;
                live[i].cause = "";
                n = live[i].num;
                $('.identity').eq(n-1).css('background-color','#f5c97b');
        }
            //获取点击的数组下标
            s = $(this).index();
            //开始
            if(all[s].death == true){ //判断玩家是否已经死亡
                alert('他已经死掉了啦');
            }else{
                $('.identity').eq(s).css('background-color','#eb3855');
                all[s].death = true;
                all[s].cause = 'voted';
            }
            // 被票玩家
            voted = all[s].num;
            sessionStorage.setItem("voted", voted);
            sessionStorage.setItem("fromWhere", fromWhere);
        })   
    } else if (fromWhere === "点击日志") { // 当前是法官日志页面，改变文字内容
        $('#header-title').html('游戏日志');
        $('.main-title p').html('查看日志');
        $('.main-tip').html('查看日志');
        $('#start').html('确定');
        $('.content-hover').css('display','none');
    }
})

//定义点击跳转函数
$("#back").click(function () {
    window.location.href="../html/match.html";
})
$("#close").click(function () {
    window.location.href="../html/home.html";
})

$("#start").click(function(){
    var f=0
    for (i=0;i<arr.length;i++){
        if(all[i].death == false){
            f++;
        }
    }
    if(f == live.length){
        alert('一定要杀死一个人哦');
        window.location.href="../html/vote.html";
    }else{
        // 将选中的人添加进数组
        if(fromWhere === "点击杀人"){
            deads.push(all[dead-1]);
            // console.log(deads,"deads");
        }else if(fromWhere === "点击投票") {
            vote.push(all[voted-1]);
            // console.log(vote,"vote");
        }
        // 定义剩余玩家数组
        var alive=[];
        for (b = 0; b < live.length; b++) {
            if (live[b].death == false) {
                alive.push(live[b]);
            }
        }
        // console.log(alive,"alive");
        // 剩余杀手人数
        var k=0
        // 剩余平民人数
        var c=0
        for(i=0;i<alive.length;i++){
            if(alive[i].name == "杀手"){
                k++;
            }else{
                c++;
            }
        }    
        // console.log(k,"k",c,"c");
        // 根据玩家人数判断游戏是否结束
        if((fromWhere === "点击投票" && k == c - 1)||k == c){
            result="kv";
            sessionStorage.setItem("k", k);
            sessionStorage.setItem("c", c);
            sessionStorage.setItem("vote", JSON.stringify(vote));
            sessionStorage.setItem("deads", JSON.stringify(deads));
            sessionStorage.setItem("result", result);
            sessionStorage.setItem("all", JSON.stringify(all));
            window.location.href="../html/result.html";
        }else if(k==0) {
            result="cv";
            sessionStorage.setItem("k", k);
            sessionStorage.setItem("c", c);
            sessionStorage.setItem("vote", JSON.stringify(vote));
            sessionStorage.setItem("deads", JSON.stringify(deads));
            sessionStorage.setItem("result", result);
            sessionStorage.setItem("all", JSON.stringify(all));
            window.location.href="../html/result.html";
        }else if(fromWhere === "点击杀人"){
            sessionStorage.setItem("all", JSON.stringify(all));
            sessionStorage.setItem("live", JSON.stringify(live));
            sessionStorage.setItem("arr", JSON.stringify(arr)); 
            sessionStorage.setItem("deads", JSON.stringify(deads));
            window.location.href = "../html/process.html";
        }else if(fromWhere === "点击投票") {
            sessionStorage.setItem("all", JSON.stringify(all));
            sessionStorage.setItem("live", JSON.stringify(live));
            sessionStorage.setItem("arr", JSON.stringify(arr)); 
            sessionStorage.setItem("vote", JSON.stringify(vote));
            window.location.href = "../html/process.html";
        }
    }
})

    



