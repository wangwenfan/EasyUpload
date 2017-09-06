<?php
namespace Home\Controller;
use Org\Util\UploadFile;
use Think\Controller;
class IndexController extends Controller {
    protected $pageSize = 15;//分页每页数量
    protected $fileType = [
        'image'=>1,
        'video'=>3,
        'audio' =>2
    ];
    //上传页面
    public function index(){
         $this->display();
    }

    //上传图片
    public function upload(){
        $type = $_GET['type'];
        $Data = [];
        $UploadApi = new UploadFile($type);
        $info = $UploadApi->upload();
        if($info['state'] == 1){
            $info = $info['data'];
            $Data['ext'] = $info['file']['ext'];
            if($UploadApi->isUploadQiniu){
                $Data['name'] = $info['file']['savename'];
                $Data['url'] = $Data['filename'] = $Data['attachment']= $info['file']['url'];
            }else{
                $Data['name'] = $info['file']['name'];
                $Data['filename'] = $Data['attachment']= '/Uploads/'.$info['file']['savepath'].$info['file']['savename'];
                $Data['url'] = $UploadApi->domian.$Data['filename'];
            }
            $Data['is_image'] = 1;
            $Data['filesize'] = $info['file']['size'];
            $Data['widch'] = $Data['height'] = 80;
            //记录附件
            $this->addAttachment($type,$UploadApi->isUploadQiniu,$Data);
            echo json_encode($Data);
        }else{
            $error = ['error'=>1,'message'=>'上传失败:'.$info['data']];
            echo json_encode($error);
        }
    }

    /**
     * 记录附件信息
     * @param $type 附件类型
     * @param $is_cdn 是否是cdn
     * @param $data 附件信息
     */
    protected function addAttachment($type,$is_cdn,$d){
        $data['file_type'] = $this->fileType[$type] ? $this->fileType[$type]  : 4;
        $data['is_cdn'] = $is_cdn ? 1 : 0;
        $data['file_name'] = $d['name'];
        $data['file_url'] = $d['attachment'];
        $data['file_size'] = $d['filesize'];
        $data['year'] = date('Y');
        $data['month'] = date('m');
        M('attachment')->add($data);
    }

    //添加远程图片
    public function fetch(){
        $url = $_GET['url'];
        $image = get_headers($url,true);
        if(!$image){
            $error = ['error'=>1,'message'=>'获取失败:未找到这个资源!'];
            exit(json_encode($error));
        }
        $Data['filesize'] = $image['Content-Length'];
        $Data['url'] = $Data['filename'] = $Data['attachment']= $url;
        $Data['ext'] = substr(strrchr($url, '.'), 1);
        $Data['name'] = getExt($url);
        $Data['is_image'] = 1;
        $Data['widch'] = $Data['height'] = 80;
        echo json_encode($Data);
    }

    //获取历史图片
    public function imageList($ft='image'){
        $page = $_GET['page'] ? $_GET['page'] : 1;
        $year = $_GET['year'];
        $month = $_GET['month'];
        $where = [];
        $where['file_type'] = $this->fileType[$ft];
        if(!empty($year)) $where['year'] = $year;
        if(!empty($month)) $where['month'] = $month;
        $n = $this->getAttachmentList($page,$where,$ft);
        if($n){
            $d['items'] = $n;
            $counts = M('attachment')->where($where)->count();
            $page = pagination($counts,$page,$this->pageSize, '', array(
                'before' => '2',
                'after' => '2',
                'ajaxcallback' => 'null'
            ));
            $d['page'] = $page;
        }else{
            $d['items'] = '';
            $d['page'] = '';
        }


        $message['message'] = $d;
        $message['error'] = 0;
        $re['message'] = $message;
        $re['redirect'] = '';
        $re['type'] = 'ajax';
        echo json_encode($re);
    }

    //获取历史视频
    public function videoList(){
        $this->imageList('video');
    }

    //获取历史音频
    public function audioList(){
        $this->imageList('audio');
    }
    //获取历史文件列表
    protected function getAttachmentList($page=1,$where=[]){

        $re = M('attachment')->where($where)->order("create_time desc")->limit($page-1,$this->pageSize)->select();
        if($re){
            $dataInfo = [];
            foreach ($re as $val){
                $n['id'] = $val['id'];
                $n['filename'] = $val['file_name'];
                $n['url'] = $n['attachment'] = $val['file_url'];
                $n['type'] = $val['file_type'];
                $n['createtime'] = substr($val['create_time'],0,10);
                $dataInfo[$n['id']] = $n;
            }
            return $dataInfo;
        }else{
            return false;
        }
    }

    /**
     *删除文件
     */
    public function deleteFile(){
        $id = $_POST['id'];
        $re = M('attachment')->where(['id'=>$id])->find();
        if(!$re) exit('删除失败');
        M('attachment')->where(['id'=>$id])->delete();
        if($re['is_cdn'] == 0){
            $filePath =  THINK_PATH.'../'.$re['file_url'];
            if(is_file($filePath) && unlink($filePath)) exit('success');
        }else{
            $upload = new UploadFile();
            $upload->deleteQiuniuFile($re['file_name']);//参数为七牛上的完整文件名
            exit('success');
        }
        exit('删除失败');
    }

    public function mobileIndex(){

        $this->display();
    }



    //demo表单接收数据
    public function isPost(){
        var_dump($_POST);
    }



}