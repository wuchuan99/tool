var _uploadLoading;

var uploadJson = {
  accessid: '',
  accesskey: '',
  host: '',
  policyBase64: '',
  signature: '',
  callbackbody: '',
  filename: '',
  key: '',
  expire: 0,
  g_object_name: '',
  g_object_name_type: '',
  now: timestamp = Date.parse(new Date()) / 1000
};


function send_request() {
  layer.load(0, {
    shade: [0.1, '#fff']
  });
  var xmlhttp = null;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (xmlhttp != null) {
    serverUrl = '/zxcity_restful/ws/oss/ossUpload';
    xmlhttp.onreadystatechange = callbacksuccess;
    xmlhttp.open("POST", serverUrl, false);
    layer.closeAll('loading');
    xmlhttp.send(null);

    function callbacksuccess() {
      layer.closeAll('loading');
      if (xmlhttp.status == 200) {
        layer.msg("上传中，请耐心等待!");
        _uploadLoading = parent.layer.load(1, {
          shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
      } else {
        layer.msg("系统繁忙，请稍后再试");
      }
    }

    return xmlhttp.responseText;
  } else {
    alert("Your browser does not support XMLHTTP.");
  }
};



//可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
function get_signature() {
  body = send_request()
  var obj = eval("(" + body + ")");
  uploadJson.host = obj['host']
  uploadJson.policyBase64 = obj['policy']
  uploadJson.accessid = obj['accessid']
  uploadJson.signature = obj['signature']
  uploadJson.expire = parseInt(obj['expire'])-30
  uploadJson.callbackbody = obj['callback']
  uploadJson.key = obj['dir']
  return true;

};

function random_string(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/*//得到文件名的后缀
 function get_suffix(filename) {
 pos = filename.lastIndexOf('.')
 suffix = ''
 if (pos != -1) {
 suffix = filename.substring(pos)
 }
 return suffix;
 }*/

//得到文件是本地名还是随机名
function calculate_object_name(filename) {
  g_object_name = g_object_name + '/' + randomString(file.name);
  // g_object_name = g_object_name + '/' + "${filename}"
  return '';
}

function get_uploaded_object_name(filename) {
  tmp_name = g_object_name
  tmp_name = tmp_name.replace("${filename}", filename);
  return tmp_name
}

//返回一个随机数字名称
function randomString(importUrl) {
  var importUrl = /\.[^\.]+$/.exec(importUrl);
  var d = new Date().getTime();
  var random = parseInt(Math.random() * 1000);
  return "zx" + random_string(24) + importUrl;
}

function set_upload_param(up, filename, ret) {
  if (ret == false) {
    ret = get_signature()
  }
  g_object_name = uploadJson.key; //目录
  if (filename != '') {
    // suffix = get_suffix(filename) //得到后缀
    // calculate_object_name(filename) //得到本地或者随机名
    g_object_name = g_object_name + '/' + randomString(filename);
  }
  new_multipart_params = {
    'key': g_object_name,
    'policy': uploadJson.policyBase64,
    'OSSAccessKeyId': uploadJson.accessid,
    'success_action_status': '200', //让服务端返回200,不然，默认会返回204
    'callback': uploadJson.callbackbody,
    'signature': uploadJson.signature,
  };
  up.setOption({
    'url': uploadJson.host,
    'multipart_params': new_multipart_params
  });
  up.start();
}

//上传文件类型配置
function filter(data) {
  var obj = "";
  if (data.flag == "video") {
    obj = [{
      title: "files",
      extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv"
    }]
  } else {
    obj = [{
      title: "Image files",
      extensions: "jpg,png"
    }]
  }
  return obj;
}

//上传OSS
function uploadOss(data) {
  var uploaderLabel = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',//上传的模式,依次退化
    browse_button: data.btn,                 //上传选择的点选按钮，**必需**
    flash_swf_url: '../../assets/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: '../../assets/plupload-2.1.2/js/Moxie.xap',
    url: 'http://oss.aliyuncs.com',
    filters: {
      mime_types: filter(data),
      max_file_size: data.size || "10mb", //最大只能上传10mb的文件
      prevent_duplicates: false //不允许选取重复文件
    },
    // chunk_size: "5mb",//分片上传文件时，每片文件被切割成的大小，为数字时单位为字节。也可以使用一个带单位的字符串，如"200kb"。当该值为0时表示不使用分片上传功能
    init: {
      //文件添加进队列后回调
      FilesAdded: function (up, files) {
        set_upload_param(uploaderLabel, '', false);
      },
      //文件上传前回调
      BeforeUpload: function (up, file) {
        /*check_object_radio();*/
        set_upload_param(up, file.name, true);
      },
      // 文件上传时回调(进度条)
      UploadProgress: function (up, file) {
      },
      // 上传成功后回调
      FileUploaded: function (up, file, info) {
        if (info.status == 200) {
          if (data.flag == "video") {
            document.getElementById(data.btn).disabled = false;
            return sendVideoCallback(file, data);
          } else if (data.flag == "cover") {
            return sendAddImageCallback(file, data);
          } else if (data.flag == 'img') {
            return sendImageCallback(file, data,data.btn);
          }
        }
      },
      Error: function (up, err) {
        console.log();
        if (err.code == -600) {
          layer.msg("选择的文件过大");
        } else if (err.code == -601) {
          layer.msg("选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型");
        } else if (err.code == -602) {
          layer.msg("这个文件已经上传过一遍了");
        } else {
          layer.msg("系统繁忙，请稍后再试!");
          console.log(err.response);

        }
        // setTimeout(function () {
        //     layer.closeAl
        // },3000)


      }
    }
  });

  uploaderLabel.init();
}


//上传视频
function sendVideoCallback(file, data) {
  layer.msg("上传成功");
  var videoUrls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
  var videoName = get_uploaded_object_name(file.name);
  $('#uploadVideo').attr('src', videoUrls);
  /* $('.videoName').html('文件名称：' + videoName);*/
  parent.layer.close(_uploadLoading);
}

//封面图片
function sendAddImageCallback(file, data) {
  layer.msg("上传成功");
  var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
  var imgName = get_uploaded_object_name(file.name);
  $('#uploadCover').attr('src', urls);
  /*$('.coverName').html('文件名称：' + imgName);*/
  parent.layer.close(_uploadLoading);
}

//图片
function sendImageCallback(file, data,e) {
  layer.msg("上传成功");
  var urls = uploadJson.host + "/" + get_uploaded_object_name(file.name);
  var imgName = get_uploaded_object_name(file.name);
  $('#'+e).attr('src', urls);
  parent.layer.close(_uploadLoading);
}
