function splitToComment(str){
    var as = optSplit(str);
    var res = [];
    idx = 0;
    lastidx = -1;
    console.log(as.length);
    for(var i=0;i<as.length;i++){
        if(lastidx != idx){
            lastidx = idx;
            res[idx] = "";
        }
        if(isOp(as[i])){
            res[idx] += as[i];
        }
        else{
            res[idx] += as[i];
            idx++;
        }
    }
    return res;
}

function genInputbox(area, id){
    var element = document.createElement("input");
    element.id = id;
    element.style = "width:50px;height:20px;border:1;";
    element.style.borderWidth = "1px";
    element.style.borderStyle = "dotted";
    element.style.marginRight = "2px";
    element.style.fontFamily = "consolas";
    element.style.fontSize = "20px";
    element.style.textAlign = "center";
    element.style.alignSelf = "top"
    element.type = "text";
    area.appendChild(element); 
    return element;
}
function genCommentbox(area,str){
    var element = document.createElement("input");
    //element.id = id;
    element.style = "height:52px;border:1;";
    element.style.width = String(28*str.length) + "px";
    element.style.borderWidth = "0px";
    element.style.borderStyle = "dotted";
    element.style.marginRight = "2px";
    element.style.fontFamily = "consolas";
    element.style.fontSize = "50px";
    element.style.textAlign = "center";
    element.type = "text";
    element.value = str;
    area.appendChild(element); 
    return element;
}
function generate(){
    var obj = document.getElementById("formulainput");
    var str = obj.value;

    var area = document.getElementById("formarea");
    area.innerHTML = "";
    var inputboxes = [];
    var comments = splitToComment(str);
    for(var i in dic.keys()){
        genCommentbox(area,comments[i]);
        var input = genInputbox(area, "input_"+dic.keys()[i]);
        input.onblur=blur_event;
    } 
}
//getInput();
function getVar(inputid){
    return inputid.split("_")[1];
}

function getInput(varname){
    return document.getElementById("input_"+varname);
}

function blur_event(){
    if(this.readOnly != true){
        if(this.value == ""){
            //dic.get(getVar(this.id)).forget_value("usr");
        }
        else{
            var val = this.value;
            //dic.get(getVar(this.id)).forget_value("usr");
            //dic.get(getVar(this.id)).set_value(parseInt(val), "usr");
        }
    }
}

function focus_event(){
    console.log("focus");
}
function setrestrict(){
    for(var i=0;i<dic.keys().length;i++){
        var keyvalue = dic.keys()[i]; 
        var ct = dic.get(keyvalue);
        if(ct.get_setter() != "usr" && ct.get_setter() != false){
            getInput(keyvalue).style.backgroundColor = '#FF9966';
            getInput(keyvalue).style.color = '#FFFFFF';
            getInput(keyvalue).readOnly = 'readOnly';
        }
        else
        {
            getInput(keyvalue).style.backgroundColor = '#FFFFFF';
            getInput(keyvalue).style.color = '#669933';

            getInput(keyvalue).readOnly = null;
        }
    }
}
function test(){
    getInput("a").style.backgroundColor = "#FFFFFF"; 
    getInput("a").style.borderColor = "#FFFFFF"; 
    
}
