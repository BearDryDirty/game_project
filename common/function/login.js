var postApi = BackStage + "user/login.do";

$(".login_btn").click(function(){
    var bv = form.data('bootstrapValidator');
    bv.validate();
    if(bv.isValid()){
        var name = $("#id_username").val();
        var psw = $("#id_password").val();
        psw = $.md5(psw)
        var postData = {"username":name,"password":psw};
        post(postApi,postData);
    }
})

//登录
function post(postApi,postData){
    $.ajax({
        url:postApi,
        type: 'post',
        dataType: 'json',
        data:postData,
        success:function(res){
            if(res.res_msg.res_code == "0000"){
                console.log(res);
                var data = JSON.stringify(res)
                sessionStorage.setItem("data",data);
                sessionStorage.setItem("sessionID",res.sessionID);
                layer_success(res);
                location.href = 'index.html';
            }else{
                layer_false(res);
            }
        },
        error:function(res){
            layer_false(res)
        }
    })
    return false
}
