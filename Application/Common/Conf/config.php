<?php
return [
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  '127.0.0.1', // 服务器地址
    'DB_NAME'               =>  'test',          // 数据库名
    'DB_USER'               =>  'root',      // 用户名
    'DB_PWD'                =>  'root',          // 密码
    //文件上传配置
    'UploadFile' => [
        //文件上传根目录
        'rootPath'        => 'Uploads/',
        //图片上传目录
        'imageSavePath'   => 'image/',
        //视频上传目录
        'vedioSavePath'   => 'video/',
        //音频上传目录
        'audioSavePath'   => 'audio/',
        //编辑器上传目录
        'ueditorSavePath' => 'ueditor/',
        //图片上传大小
        'imageFileSize'   => 1024 * 1024 * 3,
        //视频上传大小
        'videoFileSize'   => 1024 * 1024 * 5,
        //音频上传大小限制
        'audioFileSize'   => 1024 * 1024 * 3,
        //图片格式
        'imageExts'       => ['jpg', 'png', 'gif', 'jpeg','webp'],
        //视频格式
        'vedioExts'       => ['mp4', 'wmw', 'mpg'],
        //音频格式
        'audioExts'       => ['mp3', 'wma'],
        //是否上传七牛
        'isUploadQiniu'   => false,
        //七牛配置
        'QiNiu'           => [
            'secretKey' => 'xxxx',
            'accessKey' => 'xxx',
            'domain'    => 'xx.wangwenfan.top',//七牛域名
            'bucket'    => 'xxx'//七牛空间
        ]
    ]
];