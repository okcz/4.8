require.config({
    paths: {
        "mui": "mui.min"
    }

})

require(["mui"], function(mui) {
    var ul = document.querySelector(".box");

    mui.ajax('/api/find', {

        dataType: 'json', //服务器返回json格式数据
        type: 'get', //HTTP请求类型s
        timeout: 10000, //超时时间设置为10秒；
        success: function(data) {
            render(data.data)
        },
        error: function(xhr, type, errorThrown) {

        }
    });

    function render(data) {
        var html = "";
        data.forEach(function(item, index) {
            html += `
            <li class = "item">
            <p><img src="${item.img}"</p><br>
            ${item.tile}<br>
            ${item.name}<br>
            ${item.content}
            </li>
        `
            findone(data)
        })

        ul.innerHTML = html
    }

    function findone(data) {
        var input = document.querySelector("input")
        input.onkeydown = function(e) {
            var arr = [];
            if (e.keyCode == 13 || e.keyCode == 16) {
                var mdata = input.value;
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    if (data[i].name.indexOf(mdata) >= 0) {
                        arr.push(data[i])
                    }
                }

                var htm = "";
                arr.forEach(function(item, index) {
                    htm += `
                     <li class = "item">
            <p><img src="${item.img}"</p><br>
            ${item.tile}<br>
            ${item.name}<br>
            ${item.content}
            </li>`
                })
                ul.innerHTML = htm;

            }

        }
    }


    function getTab() {
        mui.ajax('/api/findd', {
            data: {
                page: page++,
                pageSize: pageSize
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(res) {
                if (res.data.length === 0) {
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);

                } else {
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                    var ht = "";
                    res.data.forEach(function(item, index) {
                        ht += `
                     <li class = "item">
            <p><img src="${item.img}"</p><br>
            ${item.tile}<br>
            ${item.name}<br>
            ${item.content}
            </li>`
                    })
                    ul.innerHTML += ht;
                }
            },
            error: function(xhr, type, errorThrown) {

            }
        });

        function pullInit() {
            mui.init({
                pullRefresh: {
                    container: '#refreshContainer',
                    up: {
                        contentrefresh: '正在加载...',
                        callback: getTab
                    },
                    down: {
                        contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                        contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                        callback: down
                    }
                }
            });
        }

        function down() {
            window.location.reload()
        }


    }
})