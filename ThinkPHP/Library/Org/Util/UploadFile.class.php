<?php
namespace Org\Util;
use Think\Upload;

/**
 * Created by PhpStorm.
 * User: wangwenfan
 * Date: 2017/8/28 0028
 * Time: 15:17
 */
class UploadFile
{
    public $isUploadQiniu;
    public $domian;
    protected $UploadConfig;
    protected $maxSize;
    protected $savePath;
    protected $UploadApi;
    protected $exts;

    public function __construct($type='')
    {
        $this->UploadConfig =  $UploadFile =  C('UploadFile');
        $this->domian = 'http://'.$_SERVER['HTTP_HOST'];

        $this->UploadApi = new Upload();// 实例化上传类
        switch ($type){
            case 'image' :
                $this->exts = $this->UploadConfig['imageExts'];
                $this->maxSize = $this->UploadConfig['imageFileSize'];
                $this->savePath = $this->UploadConfig['imageSavePath'];
                break;
            case 'video' :
                $this->exts = $this->UploadConfig['vedioExts'];
                $this->maxSize = $this->UploadConfig['vedioFileSize'];
                $this->savePath = $this->UploadConfig['videoSavePath'];
                break;
            case 'audio' :
                $this->exts = $this->UploadConfig['audioExts'];
                $this->maxSize = $this->UploadConfig['audioFileSize'];
                $this->savePath = $this->UploadConfig['audioSavePath'];
                break;
        }
        $this->UploadApi->maxSize   =     $this->maxSize ;// 设置附件上传大小
        $this->UploadApi->exts      =     $this->exts;// 设置附件上传类型
        $this->UploadApi->rootPath  =     $this->UploadConfig['rootPath']; // 设置附件上传根目录
        $this->UploadApi->savePath  =     $this->savePath; // 设置附件上传（子）目录
        $this->isUploadQiniu = $this->UploadConfig['isUploadQiniu'];
    }

    //上传
    public function upload(){

        if($this->isUploadQiniu == true){
            $this->uploadQiuNiu();
        }
        // 上传文件
        $info   =   $this->UploadApi->upload();
        if(!$info) {
            // 上传错误提示错误信息
            return ['state'=>0,'data'=>$this->UploadApi->getError()];
        }else{
            // 上传成功
            return ['state'=>1,'data'=>$info];
        }
    }

    //加载七牛上传驱动
    private function uploadQiuNiu(){
        $this->UploadApi->driver = 'Qiniu';
        $this->UploadApi->driverConfig = $this->UploadConfig['QiNiu'];
    }

    /**
     * 删除七牛上的文件
     * @param $file 七牛上的文件名
     * @return bool
     */
    public function deleteQiuniuFile($file){
        $qiniu = new Upload\Driver\Qiniu($this->UploadConfig['QiNiu']);
        return $qiniu->delFile($file);
    }

}