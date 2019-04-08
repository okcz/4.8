var express = require('express');
var router = express.Router();
var mongod = require("mongodb-curd");

var db = "yuekao";
var col = "shang"

/* GET home page. */
router.post('/api/findd', function(req, res, next) {
    var page = req.body.page;
    var pageSize = req.body.pageSize;
    var tile = req.body.tile;
    console.log(tile)
    router.get('/api/find', function(req, res, next) {
        mongod.find(db, col, {}, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: "success",
                    data: result
                })
            }
        })
    });
});
router.get('/api/find', function(req, res, next) {
    mongod.find(db, col, {}, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
});
router.post('/api/add', function(req, res, next) {
    var parmas = req.body;
    var name = parmas.nam;
    var img = parmas.im;
    var tile = parmas.til;
    var content = parmas.con;
    if (name || age) {
        mongod.find(db, col, { name: name }, function(result) {
            if (result.length > 0) {
                res.send({
                    code: 0,
                    mes: "重复了"
                })
            } else {
                mongod.insert(db, col, { name: name }, function(result) {
                    if (!result) {
                        res.send({
                            code: 1,
                            mes: "success"
                        })
                    }
                })
            }
        })
    }
})



module.exports = router;