<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <script type="text/javascript" src="/resource/js/app/config.js"></script>
    <link rel="stylesheet" href="/resource/components/wui/style/weui.css"/>
    <link rel="stylesheet" href="/resource/components/wui/style/weui2.css"/>
    <link rel="stylesheet" href="/resource/components/wui/style/weui3.css"/>
    <script src="/resource/components/wui/zepto.min.js">
    </script><script src="/resource/components/wui/lrz.min.js"></script>
</head>

<body ontouchstart style="background-color: #f8f8f8;">
<div class="page-hd">
    <h1 class="page-hd-title">
        图片压缩上传
    </h1>
    <p class="page-hd-desc">需要加载lrz.min.js,这个插件可以压缩大图片为设定宽度图片,上传速度极快,原理是先压缩图片,然后转换成base64上传,目前比较好用的;如果是微信内,对于少量图片,建议采用jssdk</p>
</div>

<div class="weui_cells weui_cells_form">

    <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
            <div class="weui_uploader">
                <div class="weui_uploader_hd weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">单图片压缩上传</div>
                    <div class="weui_cell_ft"></div>
                </div>
                <div class="weui_uploader_bd">
                    <ul class="weui_uploader_files" id='img'>

                    </ul>
                    <div class="weui_uploader_input_wrp">
                        <input class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" id="headimgurl" />
                        <input  type="hidden"  id="headimgurl1" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
            <div class="weui_uploader">
                <div class="weui_uploader_hd weui_cell">
                    <div class="weui_cell_bd weui_cell_primary">多图先压缩后上传</div>
                    <div class="weui_cell_ft"></div>
                </div>
                <div class="weui_uploader_bd">
                    <ul class="weui_uploader_files" id='img2'>


                    </ul>
                    <div class="weui_uploader_input_wrp" id="file2">
                        <input class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif"  id='headimgurl2' multiple />

                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<script>
    function fun1(self) {
        var delimg=$(self);
        $.confirm('您确定要删除吗?', '确认删除?',
            function() {
                delimg.remove();
            },
            function(){
                $.toast('取消操作', 'cancel');
            });
    }
    $(function(){
        var f = document.querySelector('#headimgurl');
        f.onchange = function () {
            // lrz(this.files[0],{width:640,fieldName:"file"}).then(function (rst) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', appConfigPath.uploadPath+'?type=image');

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var obj = eval('(' + xhr.responseText + ')');
                        if(obj.error == 1){
                            $.alert(obj.message);return;
                        }
                        $('#img').html('<li onclick="fun1(this)" class="weui_uploader_file weui_uploader_status" style="background-image:url('+obj.url+')"><div class="weui_uploader_status_content"><i class="weui_icon_cancel"></i></div></li>');
                        $("#headimgurl1").val(obj.url);
                    } else {
                        // 处理其他情况
                    }
                };

                xhr.onerror = function () {
                    // 处理错误
                };

                xhr.upload.onprogress = function (e) {
                    // 上传进度
                    var percentComplete = ((e.loaded / e.total) || 0) * 100;
                }

                // 添加参数
                // rst.formData.append('size', rst.fileLen);
                // rst.formData.append('base64', rst.base64);
                // 触发上传
                var formData = new FormData();

                formData.append("username", "Groucho");
                formData.append("accountnum", 123456); // 数字 123456 会被立即转换成字符串 "123456"
                // HTML 文件类型input，由用户选择
                formData.append("userfile", this.files[0]);
                xhr.send(formData);

                // return rst;
            // })

                // .catch(function (err) {
                //     alert(err);
                // })

                // .always(function () { // 不管是成功失败，这里都会执行
                // });
        }


//多图上传
        var f2 = document.querySelector('#headimgurl2');
        f2.onchange = function (e) {

            var files = e.target.files;
            var len = files.length;
            for (var i=0; i < len; i++) {
                lrz(files[i],{width:640,fieldName:"file"}).then(function (rst) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', appConfigPath.uploadPath+'?type=image');

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            var obj = eval('(' + xhr.responseText + ')');
                            if(obj.error == 1){
                                $.alert(obj.message);return;
                            }
                            $('#img2').append('<li onclick="fun1(this)" class="weui_uploader_file weui_uploader_status" style="background-image:url('+obj.url+')"><div class="weui_uploader_status_content"><i class="weui_icon_cancel"></i></div></li>');
                            $('#file2').append('<input value="'+obj.url+'"  type="hidden"  name="files" />');
                        } else {
                            // 处理其他情况
                        }
                    };

                    xhr.onerror = function () {
                        // 处理错误
                    };

                    xhr.upload.onprogress = function (e) {
                        // 上传进度
                        var percentComplete = ((e.loaded / e.total) || 0) * 100;
                    };

                    // 添加参数
                    rst.formData.append('size', rst.fileLen);
                    rst.formData.append('base64', rst.base64);
                    // 触发上传
                    xhr.send(rst.formData);

                    return rst;
                })

                    .catch(function (err) {
                        alert(err);
                    })

                    .always(function () { // 不管是成功失败，这里都会执行
                    });

            }//for end
        }
    })

</script>
</body>
</html>