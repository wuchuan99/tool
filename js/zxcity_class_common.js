$('#search').click(function(){
    let keyword=$(this).prev('input').val().trim(),
        flag=$(this).attr('flag'),
        cmd;
    if(keyword==''){
        layre.msg('请先输入搜索内容');
        renturn;
    }
    if(flag=='manage'){//搜索专栏
        cmd='masterCourse/getThemes';
    }else if(flag=='sign'){//搜索报名记录
        cmd='masterCourse/getAllEntryRecord';
    }else if(flag=='advice'){//搜索意见反馈
        cmd='master/getAdvices';
    }else if(flag=='lecturer'){//搜索讲师
        let newList=[],
            lecturerList=JSON.parse(sessionStorage.getItem('lecturerList'));
            for(let i=0;i<lecturerList.length;i++){
                if(lecturerList[i].name.indexOf(keyword)>-1){
                    newList.push(lecturerList[i]);
                }
            }
            initTable(newList);
            return;
    }
    reqAjaxAsync(cmd,JSON.stringify({keyword:keyword})).done(function(res){
        if(res.code==1){
            initTable(res.data);
        }else{
            layer.msg(res.msg);
            return;
        }
    })
})