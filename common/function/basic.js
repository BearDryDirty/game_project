var postApi = BackStage + "config/loadWebConfig.do";  //获取获取网站配置
var modifyApi = BackStage + "config/modifyWebConfig.do";  //修改网站配置

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
                sid = dataBody.sid;
                for (i in dataBody){
                    var getId = i;
                    var dom = $("body").find($("#" +getId));
                    var _len=dom.children().length;
                    if(_len>0){
                        var radioVal = dataBody[i];
                        if(radioVal === "1"){
                            dom.find("input[type=radio]").eq(0).prop("checked",true)
                        }else{
                            dom.find("input[type=radio]").eq(1).prop("checked",true)
                        }
                    }else{
                        dom.val(dataBody[i])
                    }
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

//发送数据
function postData(){
    var postData="";
    // $("td").each(function(){
    //     var id = $(this).attr("id");
    //     if(typeof(id) != "undefined"){
    //         var type = $("#" + id).find("input[type=radio]:checked").data("type");
    //         postData += '"'+id+'":'+type+',';
    //     }
    // })
    // $("input[type=text]").each(function(){
    //     var id = $(this).attr("id");
    //     if(typeof(id) != "undefined"){
    //         var val = $("#" + id).val();
    //         postData += '"'+id+'":'+val+',';
    //     }
    // })
    // postData+= '"sid":'+sid+',"sessionID":'+sessionID;
    // postData="{"+postData+"}"
    BasePost(postData,modifyApi)
}
