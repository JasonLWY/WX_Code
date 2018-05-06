//星星的数据拆分  40   4  循环5次  i<4  [1,1,1,1,0]
function convertToStarsArray(stars) {
    //num代表拆分的数字
    var num = stars.substring(0, 1);
    //声明一个数组
    var StartArr = [];
    for (var i = 0; i < 5; i++) {
        if (i < num) {
            StartArr.push(1);
        } else {
            StartArr.push(0);
        }
    }
    return StartArr;
}

//截取字符串长度替换
function cutTitleString(title, start, end) {
    if (title.length > end) {
        title = title.substring(start, end) + "...";
    }
    return title;
}

//公共的网络请求
function http(url, callback) {
    wx.request({
        url: url,
        method: "GET",
        header: {
            'content-type': 'application/xml'
        },
        success: function (res) {
            callback(res.data)
        }
    })
}

//演员名字使用“/”分隔开
function convertToCastString(casts) {
    var castsjoin = "";
    var castsfinal = "";
    for (var dic in casts) {
        castsjoin = castsjoin + casts[dic].name + " / ";
    }
    castsfinal = castsjoin.substring(0, castsjoin.length - 3);
    return castsfinal;
}

//处理演员信息：头像+名字

function convertToCastsString(casts) {
    //存储信息：头像+名字
    var castsArray = [];
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    cutTitleString: cutTitleString,
    http: http,
    convertToCastString: convertToCastString,
    convertToCastsString:convertToCastsString
}