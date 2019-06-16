// //获取身份页面的参数数据
var arr = JSON.parse(sessionStorage.getItem('arr'));
// console.log(arr,"arr");
var all = JSON.parse(sessionStorage.getItem('all'));
// console.log(all,"all");
var live = JSON.parse(sessionStorage.getItem('live'));
// console.log(live,"live");
var step = sessionStorage.getItem("step");
// console.log(step,"step");
var day = sessionStorage.getItem("day");
// console.log(day,"day");
var deads = JSON.parse(sessionStorage.getItem('deads'));//被杀
var vote = JSON.parse(sessionStorage.getItem('vote'));//被投
// 获取上一个投票页面的参数数据

// 为存活玩家定义数组
var live=[];
// 死亡信息展示
var fromWhere = sessionStorage.getItem('fromWhere');
// console.log(fromWhere,"fromWhere"); 

// // 剩余杀手人数
// var k=0
// // 剩余平民人数
// var c=0
// // 根据玩家人数判断游戏是否结束
// for (b = 0; b < all.length; b++) {
//     if (all[b].death == false) {
//         live.push(all[b]);
//     }
// }
// // console.log(live,"live");
// for(i=0;i<live.length;i++){
//     if(live[i].name == "杀手"){
//         k++;
//     }else{
//         c++;
//     }
// }
// // console.log(k,"k",c,"c");

// if((fromWhere === "点击投票" && k == c - 1)||k == c){
//     result="kv";
//     sessionStorage.setItem("k", k);
//     sessionStorage.setItem("c", c);
//     sessionStorage.setItem("vote", JSON.stringify(vote));
//     sessionStorage.setItem("deads", JSON.stringify(deads));
//     sessionStorage.setItem("result", result);
//     sessionStorage.setItem("all", JSON.stringify(all));
//     window.location.href="../html/result.html";
// }else if(k==0) {
//     result="cv";
//     sessionStorage.setItem("k", k);
//     sessionStorage.setItem("c", c);
//     sessionStorage.setItem("vote", JSON.stringify(vote));
//     sessionStorage.setItem("deads", JSON.stringify(deads));
//     sessionStorage.setItem("result", result);
//     sessionStorage.setItem("all", JSON.stringify(all));
//     window.location.href="../html/result.html";
// }
// else{
    if(fromWhere === "点击杀人"){
        var dead = sessionStorage.getItem('dead');//被杀
        // console.log(dead,"dead");
        $("#death-tips").css("display","block");
        $('#death-tips').html(dead +'号被杀手杀死,真实身份是平民');
        $('#killer').addClass("bubble-green");
    }else if(fromWhere === "点击投票"){
        var live = JSON.parse(sessionStorage.getItem('live'));//存活玩家数组
        var voted = sessionStorage.getItem('voted');//被投
        $("#death-tips").css("display","block");
        $('#death-tips').html(voted +'号被投死,真实身份是' + arr[voted - 1]);
        $('.bubble').addClass("bubble-blue"); 
        var a = $(".title").html();
        // 获取游戏进展到第几天
        day++
        // console.log(day,'day') 
        // 为玩家设置天数属性
        for(d = 0; d < all.length; d++){
            if(all[d].death == false){
                all[d].day = day;
            }
        }  
        sessionStorage.setItem("day", day);       
        // 修改页面天数
        for(n=1 ;n<day;n++){
            chinese = convertCurrency(n+1);
            $(".title").append(a);
            $("span.day:last").text("第" + (chinese) + "天")
        }
    }
    
    for(j=0;j<arr.length;j++){
        if(j<step){
            // 置灰
            $('.bubble').eq(j).addClass("bubble-green"); 
        }
    }
// }


$("#killer").one('click',function(obj){
    if(step==0){
        var obj = $(this);
        // 气泡框变色
        obj.addClass("bubble-green");
        $('#death-tips').css('display','block');
        setTimeout(
            alert('天黑请闭眼，杀手请睁眼')
        , 1);
        var fromWhere = '点击杀人'
        // 存储玩家数据
        sessionStorage.setItem("fromWhere", fromWhere);
        step = "1";
        sessionStorage.setItem("step", step);
        sessionStorage.setItem("all", JSON.stringify(all));
        window.location.href="../html/vote.html";
    }else{
        confirm("请按顺序操作");
        for(i=0; i<step - 1;i++){
            var obj = $(this);
            // 气泡框变色
            obj.addClass("bubble-green");
        }
        sessionStorage.setItem("step", step);
        window.location.href="../html/process.html";
    }
});
$("#dead").one('click',function(obj){
    if(step==1){
        var obj = $(this);
        // 气泡框变色
        obj.addClass("bubble-green");
        setTimeout(function(){
           alert('请死者发表遗言');
        }, 1);
        step = "2";
        sessionStorage.setItem("step", step);
    }else{
        confirm("请按顺序操作");
        sessionStorage.setItem("step", step);
        window.location.href="../html/process.html";
    }
}); 
$("#speech").one('click',function(obj){
    if(step==2){
        var obj = $(this);
        // 气泡框变色
        obj.addClass("bubble-green");
        setTimeout(function(){
            alert('请玩家依次发言');
        }, 1);
        step = "3";
        sessionStorage.setItem("step", step);
    }else{
        confirm("请按顺序操作");
        window.location.href="../html/process.html";
    }
});
$("#vote").one('click',function(obj){
    if(step==3){
        var obj = $(this);
        // 气泡框变色
        obj.addClass("bubble-green");
        $('#death-tips').css('display','block');
        setTimeout(function(){
            alert('请投票');
        }, 1);
        var fromWhere = '点击投票'
        // 存储玩家数据
        sessionStorage.setItem("fromWhere", fromWhere);
        step = "0";
        sessionStorage.setItem("step", step);
        sessionStorage.setItem("all", JSON.stringify(all));
        window.location.href="../html/vote.html";
    }else{
        confirm("请按顺序操作");
        window.location.href="../html/process.html";
    }
});


// 定义点击跳转函数
$("#back").click(function () {
    window.location.href="../html/match.html";
})
$("#close").click(function () {
    window.location.href="../html/home.html";
})

$(".over").click(function () {
    window.location.href="../html/home.html";
})

$(".diary").click(function () {
    var fromWhere = '点击日志'
    // 存储玩家数据
    sessionStorage.setItem("fromWhere", fromWhere);
    window.location.href="../html/identity.html";
})
