var postApi = BackStage + "config/loadTurnImgList.do";  //获取网站轮播图列表
var modifyTApi = BackStage + "config/modifyTurnImg.do"; //修改网站轮播图
$(function(){
    $("#sessionID").val(sessionID);
    var postData = {"sessionID":sessionID}
    AjaxPost(postApi,postData)
})

function setDom(res){
    var dataBody = res.body;
    var a;
    var strHtml = "";
    for (i in dataBody){
        var state= dataBody[i].imgStatus;
        if(state === "0"){
            a="隐藏"
        }else{
            a="显示"
        }
        strHtml +=
        '<tr data-sort="'+dataBody[i].imgSort+'" data-sid="'+dataBody[i].sid+'">'+
            '<td class="sort">'+
                '<button type="button" class="btn btn-sm btn-default" onclick="sort(this)">上</button>'+
                '<button type="button" class="btn btn-sm btn-default" onclick="sort(this)">下</button>'+
                '<button type="button" class="btn btn-sm btn-default" onclick="sort(this)">顶</button>'+
                '<button type="button" class="btn btn-sm btn-default" onclick="sort(this)">底</button>'+
            '</td>'+
            '<td>'+a+'</td>'+
            '<td>'+dataBody[i].imgTitle+'</td>'+
            '<td><img src="'+dataBody[i].imgUrl+'" height="30"></td>'+
            '<td>'+dataBody[i].turnUrl+'</td>'+
            '<td>'+dataBody[i].modifyDt+'</td>'+
            '<td>'+dataBody[i].optName+'</td>'+
            '<td>'+
                '<button type="button" class="btn btn-sm btn-info" data-toggle="modal" data-target="#modal-edit">修改</button>'+
                '<button type="button" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modal-del">删除</button>'+
            '</td>'+
        '</tr>';
    };
    $("#tb").html(strHtml);
}

function sort(obj){
    var sortNum = $("#tb tr").length;
    var sort = $(obj).parents("tr").data("sort");
    var chkSort = sort;
    var sid = $(obj).parents("tr").data("sid");
    var sortType = $(obj).text();
    if(sortType === "上"){
        chkSort = chkSort -1
    }else if(sortType === "下"){
        chkSort = chkSort +1
    }else if(sortType === "顶"){
        chkSort = 1
    }else if(sortType === "底"){
        chkSort = sortNum
    }
    if(chkSort != 0 && chkSort!=sort){
        var postData = {"imgSort":chkSort,"sid":sid,"sessionID":sessionID}
        $.ajax({
            url:modifyTApi,
            type:'post',
            dataType: 'json',
            data:postData,
            success:function(res){
                if(res.res_msg.res_code == "0000"){
                    layer_success(res);
                    var postData = {"sessionID":sessionID}
                    AjaxPost(postApi,postData)
                }else{
                    layer_false(res);
                }
            },
            error:function(res){
                layer_false(res)
            }
        })
    }
}
