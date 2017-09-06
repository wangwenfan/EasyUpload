/**
 * Created by Administrator on 2017/8/30 0030.
 */
//项目url地址
var app_path = 'http://10.10.12.232:99/';
//定义路由
var appConfigPath = {
    //上传地址
    uploadPath:app_path+"index.php/home/index/upload",
    //历史图片
    imgList:app_path+"index.php/home/index/imageList",
    //展示远程图片地址
    fetchImage:app_path+"index.php/home/index/fetch",
    //历史视频
    vedioList:app_path+"index.php/home/index/videoList",
    //历史音频
    audioList:app_path+"index.php/home/index/audioList",
    deleteFile:app_path+"index.php/home/index/deleteFile"
};
window.sysinfo = {
    'uid': '1',
    'isfounder': 1,
    'siteroot': app_path,
    'siteurl': app_path,
    'attachurl': app_path,
    'attachurl_local': app_path,
    'attachurl_remote': '',
    'module' : {'url' : '', 'name' : ''},
    'cookie' : {'pre': '57da_'},
    'account' : null
};
var opts = {
    'dest_dir': 'articles',
    'global': false,
    'class_extra': '',
    'direct': true,
    'multiple': false,
    'fileSizeLimit': 5120000
};

var ueditoroption = {
    'autoClearinitialContent': false,
    'toolbars': [['fullscreen', 'source', 'preview', '|', 'bold', 'italic', 'underline', 'strikethrough', 'forecolor', 'backcolor', '|',
        'justifyleft', 'justifycenter', 'justifyright', '|', 'insertorderedlist', 'insertunorderedlist', 'blockquote', 'emotion',
        'link', 'removeformat', '|', 'rowspacingtop', 'rowspacingbottom', 'lineheight', 'indent', 'paragraph', 'fontsize', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol',
        'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|', 'anchor', 'map', 'print', 'drafts']],
    'elementPathEnabled': false,
    'initialFrameHeight': 200,
    'focus': false,
    'maximumWords': 9999999999999
};
var ueopts = {
    type: 'image',
    direct: false,
    multiple: true,
    tabs: {
        'upload': 'active',
        'browser': '',
        'crawler': ''
    },
    path: '',
    dest_dir: '',
    global: false,
    thumb: false,
    width: 0,
    fileSizeLimit: 5120000
};
if(typeof UE !='undefined'){
    UE.registerUI('myinsertimage', function (editor, uiName) {
        editor.registerCommand(uiName, {
            execCommand: function () {
                require(['fileUploader'], function (uploader) {
                    uploader.show(function (imgs) {
                        if (imgs.length == 0) {
                            return;
                        } else if (imgs.length == 1) {
                            editor.execCommand('insertimage', {
                                'src': imgs[0]['url'],
                                '_src': imgs[0]['attachment'],
                                'width': '100%',
                                'alt': imgs[0].filename
                            });
                        } else {
                            var imglist = [];
                            for (i in imgs) {
                                imglist.push({
                                    'src': imgs[i]['url'],
                                    '_src': imgs[i]['attachment'],
                                    'width': '100%',
                                    'alt': imgs[i].filename
                                });
                            }
                            editor.execCommand('insertimage', imglist);
                        }
                    }, ueopts);
                });
            }
        });
        var btn = new UE.ui.Button({
            name: '插入图片',
            title: '插入图片',
            cssRules: 'background-position: -726px -77px',
            onclick: function () {
                editor.execCommand(uiName);
            }
        });
        editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName);
            if (state == -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
            } else {
                btn.setDisabled(false);
                btn.setChecked(state);
            }
        });
        return btn;
    }, 19);

    UE.registerUI('myinsertvideo', function (editor, uiName) {
        editor.registerCommand(uiName, {
            execCommand: function () {
                require(['fileUploader'], function (uploader) {
                    uploader.show(function (video) {
                        if (!video) {
                            return;
                        } else {
                            var videoType = video.isRemote ? 'iframe' : 'video';
                            editor.execCommand('insertvideo', {
                                'url': video.url,
                                'width': 300,
                                'height': 200
                            }, videoType);
                        }
                    }, {
                        fileSizeLimit: 5120000,
                        type: 'video',
                        allowUploadVideo: true
                    });
                });
            }
        });
        var btn = new UE.ui.Button({
            name: '插入视频',
            title: '插入视频',
            cssRules: 'background-position: -320px -20px',
            onclick: function () {
                editor.execCommand(uiName);
            }
        });
        editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName);
            if (state == -1) {
                btn.setDisabled(true);
                btn.setChecked(false);
            } else {
                btn.setDisabled(false);
                btn.setChecked(state);
            }
        });
        return btn;
    }, 20);

}


var EasyUpload =
    {
        /**
         * 加载单图上传表单
         * @param domName 节点名
         * @param defaultValue 默认值
         * @param options 配置
         */
        loadFiledImage: function (domName , defaultValue, options) {
            var options = JSON.stringify($.extend(opts, options));
            defaultValue = defaultValue ? defaultValue : '';
            var inputName = $(domName).attr("name");
            var inputValue = $(domName).val();
            var filedImage = '';
            filedImage += ' <div class="input-group ">\
          <input type="text" name="' + inputName + '" value="' + (inputValue ? inputValue : defaultValue) + '" class="form-control" autocomplete="off">\
            <span class="input-group-btn">\
            <button class="btn btn-default" type="button" onclick=\'showImageDialog(this,'+options+');\'>选择图片</button>\
            </span>\
            </div>\
            <div class="input-group " style="margin-top:.5em;">\
            <img src="assets/images/nopic.jpg" onerror="this.src=\'assets/images/nopic.jpg\'; this.title=\'图片未找到\'" class="img-responsive img-thumbnail" width="150"/>\
            <em class="close" style="position:absolute; top: 0px; right: -14px;" title="删除这张图片" onclick="deleteImage(this)">×</em>\
        </div>';
            $(domName).parent().html(filedImage);
        },
        /**
         * 加载ueditor编辑器
         * @param domName
         * @param ueditoropts
         */
        loadUeditor : function (domName,ueditoropts) {
            var opts = ueditoropts ? ueditoropts : ueditoroption;
            var ue = UE.getEditor('content', opts);
            $(domName).data('editor', ue);
            $(domName).parents('form').submit(function () {
                if (ue.queryCommandState('source')) {
                    ue.execCommand('source');
                }
            });
        },
        /**
         * 加载音频上传
         * @param options
         */
        loadAudio : function (domName,defaultValue,options) {
             var op = $.extend(opts, options);
                 op.type = 'audio';
             options = JSON.stringify(op);
            defaultValue = defaultValue ? defaultValue : '';
            var inputName = $(domName).attr("name");
            var inputValue = $(domName).val();

            var audio = '';
            audio+='<div class="input-group">\
                <input type="text" value="' + (inputValue ? inputValue : defaultValue) + '" name="'+domName+'" class="form-control audio-player-media" autocomplete="off">\
                <span class="input-group-btn">\
                <button class="btn btn-default audio-player-play" type="button" style="display:none;">\
                <i class="fa fa-play"></i>\
                </button>\
                <button class="btn btn-default" type="button" onclick=\'showAudioDialog(this,'+options+');\'>选择媒体文件</button>\
                </span>\
                </div>';
            $(domName).parent().html(audio);
            setAudioPlayer();
        },
        loadVideo : function (domName,defaultValue,options) {
            var op = $.extend(opts, options);
            op.type = 'video';
            options = JSON.stringify(op);
            defaultValue = defaultValue ? defaultValue : '';
            var inputName = $(domName).attr("name");
            var inputValue = $(domName).val();

            var video = '';
            video += ' <div class="input-group">\
                <input type="text" value="' + (inputValue ? inputValue : defaultValue) + '" name="'+domName+'" class="form-control" autocomplete="off">\
                <span class="input-group-btn">\
                <button class="btn btn-default" type="button" onclick=\'showVideoDialog(this,'+options+');\'>选择媒体文件</button>\
                </span>\
                </div>';
            $(domName).parent().html(video);
        }
    };

/**
 * 视频上传
 * @param elm
 * @param options
 */
function showVideoDialog(elm, options) {
    require(["util"], function (util) {
        var btn = $(elm);
        var ipt = btn.parent().prev();
        var val = ipt.val();
        util.audio(val, function (url) {
            if (url && url.attachment && url.url) {
                btn.prev().show();
                ipt.val(url.attachment);
                ipt.attr("filename", url.filename);
                ipt.attr("url", url.url);
            }
            if (url && url.media_id) {
                ipt.val(url.media_id);
            }
        }, options);
    });
}

/**
 * 音频上传
 * @param elm
 * @param base64options
 * @param options
 */
function showAudioDialog(elm, options) {
    require(["util"], function (util) {
        var btn = $(elm);
        var ipt = btn.parent().prev();
        var val = ipt.val();
        util.audio(val, function (url) {
            if (url && url.attachment && url.url) {
                btn.prev().show();
                ipt.val(url.attachment);
                ipt.attr("filename", url.filename);
                ipt.attr("url", url.url);
                setAudioPlayer();
            }
            if (url && url.media_id) {
                ipt.val(url.media_id);
            }
        }, "",options);
    });
}

/**
 * 音频播放
 */
function setAudioPlayer() {
    require(["jquery", "util", "jquery.jplayer"], function ($, u) {
        $(function () {
            $(".audio-player").each(function () {
                $(this).prev().find("button").eq(0).click(function () {
                    var src = $(this).parent().prev().val();
                    if ($(this).find("i").hasClass("fa-stop")) {
                        $(this).parent().parent().next().jPlayer("stop");
                    } else {
                        if (src) {
                            $(this).parent().parent().next().jPlayer("setMedia", {mp3: u.tomedia(src)}).jPlayer("play");
                        }
                    }
                });
            });

            $(".audio-player").jPlayer({
                playing: function () {
                    $(this).prev().find("i").removeClass("fa-play").addClass("fa-stop");
                },
                pause: function (event) {
                    $(this).prev().find("i").removeClass("fa-stop").addClass("fa-play");
                },
                swfPath: "resource/components/jplayer",
                supplied: "mp3"
            });
            $(".audio-player-media").each(function () {
                $(this).next().find(".audio-player-play").css("display", $(this).val() == "" ? "none" : "");
            });
        });
    });
}


/**
 * 单图上传
 * @param elm
 */
function showImageDialog(elm,options) {
    require(["util"], function (util) {
        var btn = $(elm);
        var ipt = btn.parent().prev();
        var val = ipt.val();
        var img = ipt.parent().next().children();
        util.image(val, function (url) {
            if (url.url) {
                if (img.length > 0) {
                    img.get(0).src = url.url;
                }
                ipt.val(url.attachment);
                ipt.attr("filename", url.filename);
                ipt.attr("url", url.url);
            }
            if (url.media_id) {
                if (img.length > 0) {
                    img.get(0).src = "";
                }
                ipt.val(url.media_id);
            }
        }, options);
    });
}

/**
 * 删除图片
 * @param elm
 */
function deleteImage(elm) {
    require(["jquery"], function ($) {
        $(elm).prev().attr("src", "assets/images/nopic.jpg");
        $(elm).parent().prev().find("input").val("");
    });
}


