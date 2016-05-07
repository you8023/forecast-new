function getTag(tagN) {
    return document.getElementsByTagName(tagN);
}
function getId (idN) {
	return document.getElementById(idN);
}
var aFore = getId('forecast'),
    aUl = getTag('ul'),
	aA = aUl[0].getElementsByTagName('li'),
	aNum = aUl[1].getElementsByTagName('li'),
	aDay = getTag('h1'),
	aH2 = getTag('h2'),
	aIcon = getTag('i'),
	aP = getTag('p'),
	aTemp = aP[0],
	aDescription = aP[1],
    aSpeed = aH2[0],
	aClouds = aH2[1],
	aDeg = aH2[2],
	timer = play = null;
    i = index = 0;
//切换按钮
for (i = 0; i < 7; i++) {
	aNum[i].index = i;
	aNum[i].onmouseover = function () {
		show(this.index)
	}
}
//鼠标划过关闭定时器
aFore.onmouseover = function () {
	clearInterval(play)
};
//鼠标离开启动自动播放
aFore.onmouseout = function () {
	autoPlay()
};
//自动播放函数autoPlay
function autoPlay () {
	play = setInterval(function() {
		index++;
		index >= 7 && (index = 0);
		show(index);
	},4500);
}
autoPlay();//应用
var req = new XMLHttpRequest();
if (req != null) {
		req.open("GET", "http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a", true);
    req.send(null);
    req.onreadystatechange = function() {

        if ((req.status >= 200 && req.status < 300) || req.status == 304) {
            console.log("success");
        }
        else {
		alert("Request was unsuccessful : " + req.status);
        }
    };
}
//数据切换
function show (a) {
	
	index = a;
	var alpha = 0;
	var data = JSON.parse(req.responseText);
	for (var i = 0; i < 7; i++) {
		aNum[i].className = "";
	}
	aNum[index].className = "liCurrent";

	var day = new Date(data.list[index].dt * 1000),
	    speed = data.list[index].speed,
        clouds = data.list[index].clouds,
	    degree = data.list[index].deg;
	aDay[0].innerHTML = day.getFullYear() + "年" + (day.getMonth() + 1) + "月" + day.getDate() + "日";
	aSpeed.innerHTML = speed;
	aClouds.innerHTML = clouds;
	aDeg.innerHTML = degree;
	aTemp.innerHTML = data.list[index].temp.day + " °" + "C";
	aDescription.innerHTML = data.list[index].weather[0].description;
	switch (data.list[index].weather[0].main) {
		case "Rain"                     : aIcon[0].innerHTML = "&#xe630;";
		break;
		case "Clouds"                   : aIcon[0].innerHTML = "&#xe61c;";
		break;
		case "Clear"                    : aIcon[0].innerHTML = "&#xe651;";
		break;
	}
	clearInterval(timer);
}

