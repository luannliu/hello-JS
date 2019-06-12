//获取上一个页面的参数数据
var arr = JSON.parse(sessionStorage.getItem('arr'));
// console.log(arr,"arr");

//定义参数
var parity = 1  // 判断奇偶性
var order = 0; //代表顺序号码传递
// 定义步骤及页面初始值
var fromWhere = '';
var step = 0;
var day = 1;
var deads=[];
dead = "";
var vote=[];
voted = "";
// 存储玩家数据
c = arr.length;
var all = []
for (i = 0; i < arr.length ; i++) {
        // 添加对象
        var obj = {};
        // 天数
        obj.day = 1;
        // 是否活着
        obj.death = false;
        // 玩家号数
        obj.num = i + 1;
        // 死因
        obj.cause = '';
        // 玩家身份
        obj.name = arr[i];
        // 对象放入数组
        all.push(obj);
    }
    
//返回按钮点击跳转
$("#back").click (function () {
    window.location.href="../html/match.html";
}) 
//关闭按钮点击跳转
$("#close").click (function () {
    window.location.href="../html/home.html";
}) 

//查看身份按钮点击跳转
$("button#next").click( function () {
    // console.log (parity ,"点击次数");
    if( parity < arr.length * 2){
        $("#identity").html(arr[order]); // 添加身份描述
        if( parity % 2 === 0 ){ //奇偶数判断法；为偶数时执行下面语句 
            $(".view").css("display","none");  //当奇数次点击时隐藏查看身份图片
            $("#check").css("display","block"); //当奇数次点击时显示翻牌图片
            $("span.number").html(order + 1);
            $("button#next").html("查看" + (order + 1) + "号身份");
        }else if( parity % 2 !== 0 ){ //奇偶数判断法；为偶数时执行下面语句 
            $("#check").css("display","none"); //当偶数次点击时隐藏翻牌图片
            $(".view").css("display","block");  //当偶数次点击时显示查看身份图片及身份文字
            if(parity == arr.length * 2 - 1 ){
                $("button#next").html("法官查看");
            } else {
                $("button#next").html("隐藏并传递给" + (order + 2) + "号");
            }
            order++ ;
            // console.log (order ,"查看玩家");
        }
    }else if( parity == arr.length * 2) {
            $(".box").hide();
            $(".main-content-box").show();
            $(function(){
                $("header span").html("法官日志");
                $("button#next").html("开始游戏");
                // 定义html内玩家信息盒子
                var repeat = $(".content-box").html();
                // 改变html内初始玩家信息盒子
                $(".identity").eq(0).html(arr[0]);
                $(".num").eq(0).text(1 + "号"); 
                // 利用循环更改html
                for (var i=1,len=arr.length; i < len ; i++){
                    $(".content-box").append(repeat); 
                    // 更改添加后的html玩家信息盒子
                    $(".identity").eq(i).html(arr[i]);
                    $(".num").eq(i).text(i + 1 + "号"); 
                }
            })
    }else{
        sessionStorage.setItem("arr", JSON.stringify(arr));
        sessionStorage.setItem("all", JSON.stringify(all));
        sessionStorage.setItem("vote", JSON.stringify(vote));
        sessionStorage.setItem("deads", JSON.stringify(deads));
        sessionStorage.setItem("voted", voted);       
        sessionStorage.setItem("dead", dead);       
        sessionStorage.setItem("fromWhere", fromWhere);
        sessionStorage.setItem("step", step);       
        sessionStorage.setItem("day", day);       
        window.location.href="../html/process.html";
    }
    parity++;
})
