

$(function () {
    //判断身份显示头像
    var userImg = yyCache.get('userImg',"");
    var username = yyCache.get('username',"");
    var apikey = yyCache.get('apikey',"test");
    var version = yyCache.get('version',"1");
    var nimToken = yyCache.get("nimToken");
    var param = "{'apikey':'" + apikey + "'}"; //退出入参
    var cmd = "operations/loginout"; //退出接口
    var salf = "";
    var str = '';
    var str1 = '';
    var idcard = '';

    var userId = yyCache.get("userId"); 
    var userno = yyCache.get("userno");



    //判断是否登录
    if (isNull(userId) || isNull(userno)) {
        
        yyCommon.logout();
    };

    if (userImg == "" || userImg == null) {
        $("#user-pic").attr("src", "common/image/logo.png");
    } else {
        $("#user-pic").attr("src", userImg);
    }

    if (username == "") {
        $("#user-name").html(" ");
    } else {
        $("#user-name").html(username);
    };



    //退出登录清空id
    $("body").on('click', '#contorl-quit,#quit,#quitBtn', function () {
        var res = reqAjax(cmd, param);
        
        // 2018-01-17 mzc 无论接口是否成功, 都退出账号(清空缓存).
        yyCommon.logout();
        sessionStorage.clear();
    });




});