var postApi = BackStage + "config/loadWebConfig.do";  //获取获取网站配置
var modifyApi = BackStage + "config/modifyWebConfig.do";  //修改网站配置
var uploadFile = BackStage + "config/uploadImage.do"; //图片上传

$(function(){
    getData();
    $("#sessionID").val(sessionID)
})
var sid="";
//获取数据
function getData(){
    $.ajax({
        url:postApi,
        type: 'post',
        dataType: 'json',
        data:{"sessionID":sessionID},
        success:function(res){
            if(res.res_msg.res_code == "0000"){
                var dataBody = res.body;
                console.log(dataBody);
                sid = dataBody.sid;
                for (i in dataBody){
                    var getId = i;
                    var dom = $("body").find($("#" +getId));
                    var _len=dom.children().length;
                    dom.find("img").attr("src",dataBody[i])
                }
            }else{
                layer_false(res);
            }
        },
        error:function(res){
            layer_false(res)
        }
    })
}

$(".btn-info").on("click",function(){
    $(this).parent().find("input[type=file]").click()
})

//发送数据
function postData(){
    var postData="";
    BasePost(postData,uploadFile)
}
