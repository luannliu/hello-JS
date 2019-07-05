$("#btn").click (function () {
var userName=$("#username").val();
    passWord=$("#password").val();
    console.log(typeof userName,userName,"userName");
    console.log(typeof passWord,passWord,"passWord");
    if(userName===""||userName===null){
        $(".caution").text("请输入账户名");
    }else if(passWord===""||passWord===null){
        $(".caution").text("请输入密码");
    }else{
        $.ajax({     
            url:"/carrots-admin-ajax/a/login",
            type:"post",
            dataType: "text",
             //发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
            data:"name=" + userName.toString() + "&pwd=" + passWord.toString(),
            async: false,
            success:function (data) {//请求成功后的回调函数。参数data：由服务器返回，并根据 dataType 参数进行处理后的数据；
                var response=JSON.parse(data);
                console.log(data);
                //打印传输回来的数据（对象）内容。可以发现有（属性）code：-5003对应用户不存在；code：-5004对应密码错误
                console.log(response.code);
                console.log(response.message);
                if (response.code === -5003){//当code：-5003对应用户不存在
                    $('.caution').html(response.message)
                }else if (response.code === -5004){//当code：-5004对应密码错误
                    $('.caution').html(response.message)
                }else if (response.code === 0) {
                    window.location.href = "http://dev.admin.carrots.ptteng.com/#/dashboard";
                }
            }
        }
    )}
})
