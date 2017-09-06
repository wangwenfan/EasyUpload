//项目url地址
var app_path = 'http://10.10.12.232:99/';
//定义路由
var appConfigPath = {
   
    //历史图片
    imgList:app_path+"index.php/home/index/imageList",
    //上传地址
    uploadPath:app_path+"index.php/home/index/upload",
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
