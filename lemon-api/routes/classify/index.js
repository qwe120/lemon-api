var sql = require('../../mysql/sql');

var query = require('../../mysql');

var uuid = require('node-uuid');

// 添加分类
function addClassify(req, res, next) {
    var params = req.body;
    
    var cName = params.cName;
    var cIcon = params.cIcon;
    var cType = params.cType;
    var uid = params.uid;

    if(!cName || !cIcon || !cType || !uid){
        return res.json({code:4,msg:"丢失参数"});
    }else{
        classifyIsHas();
    }

    //检查分类是否存在
    function classifyIsHas(){
        query(sql.CLASSIFY_ISHAS,[uid,cName], function(err, result) {
            if(err){
                console.log(err,1);
                res.json({code:0,msg:"服务器有误"});
            }else{
                if(result.length > 0){
                    res.json({code:3,msg:"分类已存在"});
                }else{
                    add();
                }
            }
        });
    }

    //添加分类
    function add() {
        var cid = uuid.v1(); // 生成时间戳的代码
        query(sql.ADD_CLASSIFY,[cid,cName,cIcon,cType,uid], function(err, result) {
            if(err){
                console.log(err,0);
                res.json({code:0,msg:"服务器有误"});
            }else{
                res.json({code:1,msg:"添加成功",uid:uid});
            }
        });
    }
   
}

module.exports = {
    addClassify:addClassify
}