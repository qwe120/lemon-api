var sql = require('../../mysql/sql');

var query = require('../../mysql');

var uuid = require('node-uuid');

// 添加分类
function addBill(req, res, next) {
    var params = req.body;
    
    var uid = params.uid;
    var cid = params.cid;
    var create_time = params.create_time;
    var money = params.money;

    if(!uid || !cid || !create_time || !money){
        return res.json({code:4,msg:"丢失参数"});
    }else{
        add();
    }

    //添加账单
    function add() {
        var lid = uuid.v1(); // 生成时间戳的代码
        query(sql.ADD_BILL,[lid,uid,cid,create_time,money], function(err, result) {
            if(err){
                console.log(err,0);
                res.json({code:0,msg:"服务器有误"});
            }else{
                res.json({code:1,msg:"添加成功"});
            }
        });
    }
   
}

// 删除账单
function delBill(req, res, next) {
    var lid = req.query.lid;

    if(lid){
        query(sql.DEL_BILL,[lid], function(err, result) {
            if(err){
                console.log(err,0);
                res.json({code:0,msg:"服务器有误"});
            }else{
                res.json({code:1,msg:"删除成功"});
            }
        });
    }else{
        return res.json({code:4,msg:"丢失参数"});
    }
}

// 查询账单
function selectBill(req,res,next) {
    var uid = req.query.uid;

    var querySelect = req.query.querySelect;

    var sqlStr = sql.ALL_BILL; // 所有的账单

    var condition;

    if(querySelect == 1){
        sqlStr = sql.TYPE_BILL; // 收支账单
        condition = req.query.type;
    }else if(querySelect == 2){
        sqlStr = sql.CLASSIFY_BILL; // 具体分类账单
        condition = req.query.name;
    }

    if(uid){
        query(sqlStr,[uid,condition],function(err,result){
            if(err){
                console.log(err,0);
                res.json({code:0,msg:"服务器有误",err});
            }else{
                res.json({code:1,result});
            }
        })
    }else{
        res.json({code:2,msg:"用户不存在"});
    }
}
module.exports = {
    addBill:addBill,
    delBill:delBill,
    selectBill:selectBill
}