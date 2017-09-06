<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片上传</title>
    <link href="/resource/css/bootstrap.min.css" rel="stylesheet">
    <link href="/resource/css/common.css" rel="stylesheet">
    <script type="text/javascript" src="/resource/js/app/config.js"></script>
    <script type="text/javascript" src="/resource/js/lib/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="/resource/js/lib/bootstrap.min.js"></script>
    <script type="text/javascript" src="/resource/js/app/util.js"></script>
    <script type="text/javascript" src="/resource/js/require.js"></script>
</head>
<body>
<div class="main">
<div class="container">
<div class="panel panel-content main-panel-content panel-content-plugin">
<div class="panel-body clearfix main-panel-body menu-fixed">
    <div class="right-content">
        <div class="clearfix">
            <form action="home/index/isPost" method="post" class="we7-form" role="form" id="form1">

                <div class="form-group">
                    <label class="col-xs-13 col-sm-2 col-md-2 col-lg-1 control-label">缩略图</label>
                    <div class="col-sm-8">
                        <?php echo tpl_form_field_multi_image('thumb');?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-13 col-sm-2 col-md-2 col-lg-1 control-label">视频</label>
                    <div class="col-sm-8">
                        <?php echo tpl_form_field_video('video');?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-13 col-sm-2 col-md-2 col-lg-1 control-label">音频</label>
                    <div class="col-sm-8">
                        <?php echo tpl_form_field_audio('single-audio');?>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-13 col-sm-2 col-md-2 col-lg-1 control-label">内容</label>
                    <div class="col-sm-8">
                        <?php echo tpl_ueditor('content');?>
                    </div>
                </div>
                <div class="form-group">
                    <div class="">
                        <input type="submit" class="btn btn-primary" name="submit" value="提交"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
</div>
</div>
</body>
</html>