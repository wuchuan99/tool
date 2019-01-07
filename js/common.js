// $(function(){
//     var username = yyCache.get("username") || "";
//     var userId = yyCache.get("userId");
//     var userImg = localStorage.getItem("阿里云资源URL") || "";
//     var apikey = yyCache.get("apikey") || "test";
//     var str = '';
    
//     $('#contorl-left').click(function(){
//         if($('#accordion').hasClass('goleft')){
//             $(this).find("a span").attr("class","icon-zc");
//             $('.left-nav').removeClass('goleft');
//              $('.right-box').removeClass('calc')

//         }else{
//            $(this).find("a span").attr("class","icon-yc");
//            $('.left-nav').addClass('goleft')
          
//            $('.right-box').addClass('calc')
//         }
//     })

//     $('#user-pic').attr('src',userImg);
//     $('#user-name').html(username);
    
    
    
    
    
//     //bootstrap modal可拖动
//     $(document).on("show.bs.modal", ".modal", function(){
// 		    $('.modal-content').draggable({ containment: ".modal.fade.in", scroll: false ,cursor:"move"});
// 	});
	
// 	//zebra_tooltips提示
// 	/*$(document).ready(function() {
//         		new $.Zebra_Tooltips($('.show-notice'), {
// 	            position:   'center',
// 	            max_width:  300,
// 	            default_position:'inside',
// 	            background_color:'#5FB878',
// 	            color:'#fbfbfb'
//     		});
    		
//     			new $.Zebra_Tooltips($('.td2'), {
// 	            position:   'center',
// 	            max_width:  300,
// 	            default_position:'inside',
// 	            background_color:'#5FB878',
// 	            color:'#fbfbfb'
//     		});
    		
// 			new $.Zebra_Tooltips($('input,textarea'), {
//             position:   'center',
//             max_width:  300,
//             default_position:'inside',
//             background_color:'#5FB878',
//             color:'#fbfbfb'
// 		});
//     });*/
//     //
//    /* $('input').attr('maxlength',8)*/
// //  $('textarea').attr('maxlength',8)
    
//     var showFlag;
//     if($('.group').eq(1)){
//     	$('.group').eq(1).hide()
//     	showFlag = false;
//     }
//     $('#showMore').on('click',function(){
//     	if(!showFlag){
//     		$('.group').eq(1).show(300)
//     		showFlag = true;
//     	}else{
//     		$('.group').eq(1).hide(300)
//     		showFlag = false;    	}

//     })




// })

var YYCommon = function() {

    /**
     * 保存网址根路径
     */
    this.saveRoot = function() {
        var root = "";
        var address = top.location;

        // 获取当前域名根路径
        var slashPos = address.pathname.lastIndexOf("/");
        var dotPos = address.pathname.lastIndexOf(".html");

        // lastIndex表示要截取到最后一个字符的位置
        var lastIndex = slashPos;
        if (slashPos < 0) { // 如果没有斜杠
            lastIndex = address.pathname.length;
        }
        else if (slashPos > dotPos) { // 如果斜杠在.html之后出现, 重新截取到.html位置, 取.html之前的斜杠
            slashPos = address.pathname.substr(0, dotPos).lastIndexOf("/"); 
            lastIndex = slashPos;
        }
        
        root = address.origin + address.pathname.substr(0, lastIndex);

        // 保存, 在跳回登录页面时用到
        sessionStorage.setItem("rootPath", root);
    }


    /**
     * 注销登录
     */
    this.logout = function() {
        var loginPath = "login.html";

        // 获取根路径
        var root = sessionStorage.getItem("rootPath");
        if (root != null) {
            loginPath = root + "/login.html";
        }
        // 跳转到登录页面
        window.top.location.href = loginPath;

        // 清除缓存
        sessionStorage.clear();
        if (yyCache) {
            yyCache.flush();
        }
    }
};

var yyCommon = yyCommon || new YYCommon();




