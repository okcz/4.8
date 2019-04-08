require.config({
    paths: {
        "mui": "mui.min"
    }

})

require(["mui"], function(mui) {
    var back = document.querySelector(".back");
    var add = document.querySelector(".add");
    var img = document.querySelector(".img");
    var tile = document.querySelector(".tile");
    var name = document.querySelector(".name");
    var cont = document.querySelector(".cont");
    add.onclick = function() {
        var im = img.value;
        var til = tile.value;
        var nam = name.value;
        var con = cont.value;
        mui.ajax('/api/add', {
            data: {
                im: im,
                til: til,
                nam: nam,
                con: con
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(data) {
                alert("成功");
                window.location.href = "index.html"
            },
            error: function(xhr, type, errorThrown) {

            }
        });



    };
    back.onclick = function() {
        window.location.href = "index.html"
    };
})