### 用WebUpload实现简单文件上传功能

> 这个图片上传工具可以配置成全局使用，包括单图上传、多图上传、视频上传、音频上传、编辑器图片视频上传、音频上传带播放功能(支持上传到七牛)。带附件历史记录功能。编辑器使用百度Ueditor开发。移动端上传为Weui改造。![示例图片](https://ws1.sinaimg.cn/large/98e19e2dgy1fj9xjkj8sjg20sy0hn7wh.gif))

### 使用方法
> 一种为Thinkphp3.2集成，直接可以使用（需配置在项目一级目录，二级目录会报错）。另一种为纯前端使用的jsdk。
#### 1.PHP使用方法
- pc端访问 `yourpath/home/index/index`
- 移动端访问 `yourpath/home/index/mobileindex`
##### 项目配置文件
- 修改 `/resource/js/app/config.js`
- 修改 `/Application/Common/config.php`
##### 核心文件
- 新增了 `/ThinkPHP/Library/Org/Util/UploadFile.class.php`
- 修改了 `/ThinkPHP/Think/Upload/Driver/Qiniu.class.php`

##### 数据库
- 附件表，可按需修改
```
CREATE TABLE `attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `file_type` enum('1','2','3','4') NOT NULL COMMENT '附件类型1图片2音频3视频4其他',
  `file_name` varchar(100) NOT NULL COMMENT '附件名',
  `file_url` varchar(200) NOT NULL COMMENT '附件地址',
  `is_cdn` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否在cdn，1是0否',
  `file_size` int(11) NOT NULL DEFAULT '0' COMMENT '附件大小',
  `year` smallint(6) NOT NULL COMMENT '上传年份',
  `month` tinyint(2) NOT NULL COMMENT '上传月份',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上传时间',
  PRIMARY KEY (`id`),
  KEY `year` (`year`) USING BTREE,
  KEY `month` (`month`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

##### 图片上传函数参数
- $name 表单字段的名称，同一页面不能为空
- $value 表单input值
- $default 默认显示的缩略图
- $options 图片上传配置信息

- 单图上传
```
tpl_form_field_image($name, $value = ‘’, $default = ‘’, $options = array())
```
- 多图上传
```
 tpl_form_field_multi_audio($name, $value = array(), $options = array())
```
音频上传、视频上传类似，具体参考`/Application/Common/Common/function.php`

#### 2. JSDK使用方法
- jsdk访问地址 `yourpath/webTest/index.html` 
- 只需要把里面的webTest目录文件取出来就行。
- 修改配置`webTest/assets/js/EasyUpload.js`,如下所示：
```
//项目url地址
var app_path = 'http://xxx';
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
```
- 调用方式，参照`webTest/index.html`引入css和js文件，再调用需要上传的方法，方法里的参数有 domName 节点名、defaultValue 默认值、options 配置 。具体参数使用方式查看`webTest/assets/js/EasyUpload.js` 如下所示：
```
<script>
   $(function () {
       //图片上传
       EasyUpload.loadFiledImage("#filedImage");
       //编辑器
       EasyUpload.loadUeditor("#content");
       //音频上传
       EasyUpload.loadAudio('#audios');
       //视频上传
       EasyUpload.loadVideo('#movies');
   });
</script>
```


- 文件上传返回格式：
```
{
"ext": "gif",
"name": "jdfw.gif",
"attachment": "/Uploads/image/2017-09-06/59afb44c54ef4.gif",
"filename": "/Uploads/image/2017-09-06/59afb44c54ef4.gif",
"url": "http://10.10.12.232:99/Uploads/image/2017-09-06/59afb44c54ef4.gif",
"is_image": 1,
"filesize": 1280038,
"height": 80,
"widch": 80
}
```
- 历史记录返回格式(items的key为id的值)
```
{
"message": {
"message": {
"items": {
"1": {
"id": "1",
"filename": "cms结构_v1.png",
"attachment": "/Uploads/image/2017-09-06/59afb1fbeeaf1.png",
"url": "/Uploads/image/2017-09-06/59afb1fbeeaf1.png",
"type": "1",
"createtime": "2017-09-06"
}
},
"page": ""
},
"error": 0
},
"redirect": "",
"type": "ajax"
}
```

#### 下载地址
[https://github.com/wangwenfan/EasyUpload](https://github.com/wangwenfan/EasyUpload)
