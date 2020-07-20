function wheel(wins,opts){
    var  winds = document.querySelector(wins);
    if(winds.nodeType != 1){
        console.log("格式错误");
        return;
    }
   opts.imgs.push(opts.imgs[0]);
   opts.imgSize.push(opts.imgSize[0]);
   opts.links.push(opts.links[0]) ;
   opts.imgcolor.push(opts.imgcolor[0]); 
    var imgLength = opts.imgs.length;
    if(imgLength == 0){
        console.log("没有传入轮播内容");
        return;
    }
    var  imgSize = opts.imgSize;
    if(!(imgSize instanceof Array)){
        console.log("请传入合法的尺寸类型");
    }
    if(imgSize.length == 0){
        imgSize[0] = document.documentElement.clientWidth;
        imgSize[1] = 400;
    }
    if(imgSize.some(function(val){
        return val == 0 ;
    })){
        for(var i = 0;i<2;i++){
            if(imgSize[i] == 0){
                imgSize[i] = 500;
            }
        }
    }
    var imgcolor = opts.imgcolor
    var btncolor = opts.btncolor || "green";
    var btnactive = opts.btnactive || "red";
    var btnPos = opts.btnPos || ["center","20"]
    var time = opts.runOpts.time*1000 || 50
    var runstyle = null
    if (opts.runOpts.runstyle == "linner" || !(opts.runOpts.runstyle)){
        runstyle = Tween.Linner;
    } else if (opts.runOpts.runstyle == "in"){
        runstyle = Tween.Quad.easeIn;
    } else if (opts.runOpts.runstyle == "out"){
        runstyle = Tween.Quad.easeOut;
    }
    var eachtime = opts.runOpts.eachtime;
    if(eachtime){
        eachtime *= 1000;
    }else{
        eachtime=500;
    }
    console.log(runstyle);
    //初始化
    winds.style.cssText = "width:100%;height:" + imgSize[1] + "px;overflow : hidden;position:relative;";
    
    //创建容器
    var box = document.createElement("div");
    box.style.cssText = "width:" + imgLength * 100 + "%";
    winds.appendChild(box);
    //创建轮播图
    var c  = 100/imgLength;
    
    for(var i = 0;i < imgLength;i++){
        var col = opts.imgcolor[i];
        var divlist = document.createElement("div");
        box.appendChild(divlist)
        
        divlist.style.cssText = "float:left;width:"+c+"%;height:100%;background:"+col+"";
       
    var link = document.createElement("a");
    link.href = opts.links[i];
    divlist.appendChild(link)
        link.style.cssText = "width:" + imgSize[0] + "px;height:" + imgSize[1] + "px;display:block;margin:auto;background:url(" + opts.imgs[i] +") no-repeat 0 0;"
   
}
//创建按钮
var btnBox = document.createElement("div");
btnBox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+btnPos[1]+"px";
var bts = [];
for(var i = 0; i < imgLength-1;i++){
    if(i == 0){
        var bgcolor = btnactive;
    }else{
        var bgcolor = btncolor;
    }
    var btn = document.createElement("div");
    btn.style.cssText = "width:30px;height:30px;background:"+bgcolor+";border-radius:50%;margin:0 35px 0;cursor:pointer;float:left";
    btnBox.appendChild(btn);
    bts.push(btn);
}
winds.appendChild(btnBox);
    var winw = parseInt(getComputedStyle(winds, null).width);
    var num = 0;
    var move = function () {
        num++;
        if (num > bts.length-1) {

           
            animate(box, {
                "margin-left": -num * winw
            }, eachtime, runstyle, function () {
                box.style.marginLeft = 0;
            })
            
            num = 0;
        } else {
            animate(box, {
                "margin-left": -num * winw
            }, eachtime,runstyle)
        }
        for (var i = 0; i < bts.length; i++) {
            bts[i].style.background = btnactive;
        }
        bts[num].style.background = btncolor;
    }

    var t = setInterval(move, time)
    //按钮轮播
    for (let i = 0; i < bts.length; i++) {
        bts[i].onclick = function () {
            num = i;
            animate(box, {
                "margin-left": -num * winw
            }, eachtime,runstyle)
            for (var j = 0; j < bts.length; j++) {
                bts[j].style.background = btnactive;
            }
            bts[num].style.background = btncolor;
        }
    }
    //鼠标的移入移出  
    winds.onmouseover = function () {
        clearInterval(t);
    }
    winds.onmouseout = function () {
        t = setInterval(move, time)
    }


}
