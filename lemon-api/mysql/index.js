/*
 * @Author: zhangzirui
 * @Date: 2018-11-07 18:29:27
 * @Last Modified by: zhangzirui
 * @Last Modified time: 2018-11-09 14:04:52
 */

var mysql = require('mysql');

var config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: '1608A-lemon',
    connectionLimit: 100
}

var pool = mysql.createPool(config);

/**
 * @param {string} sql sql语句
 * @param {array} query sql参数
 * @param {function} fn 回调函数
 */
module.exports = function (sql,query,fn) {

    fn = fn ? fn : query;

    query = query || [];

    function connectionCallback(error, con) {
        if (error) {
            fn(error);
        }else {
            con.query(sql,query,function(err, results){
                con.release();
                queryCallback(err,results);
            })
        }
    }

    function queryCallback(err, results) {
        if(err) {
            fn(err);
        }else {
            fn(null, results);
        }
    }

    pool.getConnection(connectionCallback);
}