var BackStage = "http://bb.youzigame.com/web/";
var postApi = BackStage + "menu/showMenu.do";
var sessionID = sessionStorage.getItem("sessionID");
$(function(){
    // menuInit();
    var data = sessionStorage.getItem("data");
    data = JSON.parse(data);
    var user_name = data.body.user.name;
    $(".user").text("欢迎，"+user_name);
    //导航
    $(".first-nav").find("a").eq(0).click();
    // console.log($(".nav-group .first-nav").find("a").eq(0).html());
    $(".nav-group .first-nav a").click(function(){
        $(".nav-group .first-nav a").removeClass("on");
        $(this).addClass("on");
        var navNum = $(this).data("nav");
        $(".nav-group").find(".second-nav").each(function(){
            var secondNum = $(this).data("nav");
            if(navNum == secondNum){
                $(".nav-group .second-nav").addClass("none");
                $(this).removeClass("none");
                $(this).find("a").eq(0).click()
            }
        })
    })
    $(".second-nav a").click(function(){
        $(this).parent().children().removeClass("on");
        $(this).addClass("on");
    })
})

function menuInit(){
    $.ajax({
        url:postApi,
        type: 'post',
        dataType: 'json',
        data:{"sessionID":sessionID},
        success:function(res){
            if(res.res_msg.res_code == "0000"){
                console.log(res);
            }else{
                layer_false(res);
            }
        },
        error:function(res){
            layer_false(res)
        }
    })
}

function logOut(){
    location.href = "login.html";
}
