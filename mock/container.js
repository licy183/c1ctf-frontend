const containerData = {
    expire: Date.now() + 50000,
    is_created: false,
    is_allocated: false,
    host: '127.0.0.1',
    port: 123456,
}

module.exports = {
    'GET /api/container/list_container': function (req, res) {
        if (containerData.is_created){
            res.send({code: 200, message: "ok", payload: [1]});
        } else {
            res.send({code: 200, message: "ok", payload: []});
        }
    },
    'POST /api/container/get_container': function (req, res) {
        res.send({code: 200, message: "ok", payload: containerData});
    },
    'POST /api/container/renew_container': function (req, res) {
        containerData.expire = Date.now() + 10000;
        res.send({code: 200, message: "ok", payload: "ok"});
    },
    'POST /api/container/alloc_container': function (req, res) {
        containerData.is_allocated = true;
        containerData.expire = Date.now() + 50000;
        setTimeout(()=>{containerData.is_created = true}, 10000);
        res.send({code: 200, message: "ok", payload: "ok"});
    },
    'POST /api/container/free_container': function (req, res) {
        containerData.is_allocated = false;
        containerData.is_created = false;
        res.send({code: 200, message: "ok", payload: "ok"});
    },
}
