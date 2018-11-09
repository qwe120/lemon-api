var sql = require('../../mysql/sql');

var query = require('../../mysql');

var uuid = require('node-uuid');

function addUser(req, res, next) {
    var params = req.body;

    var nickName = params.nickName;

    var uid = params.uid;

    if(!nickName){
        return res.json({code:2,msg:"用户名为空"});
    }else if(!uid){
        userIsHas();
    }

    //检查昵称是否存在
    function userIsHas(){
        query(sql.USER_ISHAS,[nickName], function(err, result) {
            if(err){
                console.log(err);
                res.json({code:0,msg:"服务器有误"});
            }else{
                if(result.length > 0){
                    res.json({code:3,msg:"昵称已经使用"});
                }else{
                    add();
                }
            }
        });
    }

    //添加用户名
    function add() {
        var uid = uuid.v1(); // 生成时间戳的代码
        query(sql.ADD_USER,[uid,nickName], function(err, result) {
            if(err){
                console.log(err);
                res.json({code:0,msg:"服务器有误"});
            }else{
                res.json({code:1,msg:"添加成功",uid:uid});
            }
        });
    }
   
}

module.exports = {
    addUser:addUser
}