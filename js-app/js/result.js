var k = sessionStorage.getItem("k");
var c = sessionStorage.getItem("c");
// console.log(k,"k",c,"c");/
var result = sessionStorage.getItem("result");
// console.log(result,"result");
var deads = JSON.parse(sessionStorage.getItem('deads'));//被杀数组
var vote = JSON.parse(sessionStorage.getItem('vote'));//被投数组
// console.log(vote,"vote");
// console.log(deads,"deads");
var all = JSON.parse(sessionStorage.getItem('all'));
// console.log(all,"all");

// 根据结果替换奖杯图片
if(result="kv"){
    $(".victory").src="../img/result/kv.png";
}else if(result="cv"){
    $(".victory").src="../img/result/cv.png";
}
// 替换剩余玩家人数
$("#killer").text(k);
$("#civilian").text(c);

// 获取游戏总天数
var live=[];
for (b = 0; b < all.length; b++) {
    if (all[b].death == false) {
        live.push(all[b]);
    }
}
day = live[0].day;
// console.log(day,"day");

// 获取游戏日志模板
var a = $(".detail-box").html();
// 根据循环获取每天
for(i=0;i<day;i++){
    $(".day").eq(i).text(i+1);
    $(".killed").eq(i).text(vote[i].num);
    $(".voted").eq(i).text(deads[i].num);
    $(".identity1").eq(i).text(vote[i].name);
    $(".identity2").eq(i).text(deads[i].name);
    if(i<day-1){
        $(".detail-box").append(a);
    }
    console.log(i);
}


$(".left").click(function(){
    window.location.href="../html/match.html"
})