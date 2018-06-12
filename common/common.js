const BackStage = "http://bb.youzigame.com/web/";
const sessionID = sessionStorage.getItem("sessionID");

function layer_success(res){
    layer.alert(res.res_msg.res_desc, {
        icon: 6
    }, function () {
        layer.closeAll();
    })
}

function layer_false(res){
    layer.alert(res.res_msg.res_desc, {
        icon: 5
    }, function () {
        layer.closeAll();
    })
}
//通用form提交
function BasePost(postData,postApi){
    $('.post-form').ajaxForm({
      url:postApi,
      type:'post',
      success:function(res){
          console.log(res);
        layer_success(res);
        getData()
      },
      error:function(res){
        layer_false(res)
      }
    });
    return false;
}



//时间
$(function () {
	$(".datepicker-start").datetimepicker({
			needDay: false,
			timeFormat: 'hh:mm:ss',
			stepHour: 1,
			stepMinute: 1,
	})
	$(".datepicker-end").datetimepicker({
			timeFormat: 'hh:mm:ss',
			stepHour: 1,
			stepMinute: 1,
	})
})
//表单验证
var form = $('.updateform');
$(document).ready(function () {
     form.bootstrapValidator({
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields: {
             loginname: {
                 validators: {
                     notEmpty: {
                         message: '账号不能为空'
                     },
                 }
             },loginpsw: {
                 validators: {
                     notEmpty: {
                         message: '密码不能为空'
                     },
                 }
             }, email: {
                 validators: {
                     notEmpty: {
                         message: 'email不能为空'
                     },
                     emailAddress: {
                         message: '请输入正确的邮件地址'
                     }
                 }
             }, phone: {
                 validators: {
                     notEmpty: {
                         message: '手机号不能为空'
                     },
                     regexp: {
                         regexp: "^([0-9]{11})?$",
                         message: '手机号码格式错误'
                     }
                 }
             }
         }
     });
 });
