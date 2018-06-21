function splitToComment(str){
    var as = optSplit(str);
    var res = [];
    idx = 0;
    lastidx = -1;
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
var vars = [];
var varInPair = new Dictionary();
var formula;
function genInputbox(area, id){
    var element = document.createElement("input");
    element.id = id;
    element.style = "width:55px;height:20px;border:1;";
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
    element.readOnly = "readOnly";
    element.value = str;
    area.appendChild(element); 
    return element;
}
function eqLeft(str){
    return str.split("=")[0];
}

function eqRight(str){
    return str.split("=")[1];
}
function generate(){
    varInPair.clear();

    var obj = document.getElementById("formulainput");
    var str = obj.value;
    formula = str;//add string operate to str,trim or replace spaces;
    var dicleft = leaftoArray(parse(eqLeft(str)));
    var dicright = leaftoArray(parse(eqRight(str)));
    vars = dicleft.concat(dicright); 
    log(vars);
    var area = document.getElementById("formarea");
    area.innerHTML = "";
    var comments = splitToComment(str);
    var inputs = [];
    for(var i=0; i<vars.length; i++){
        genCommentbox(area,comments[i]);
        var input = genInputbox(area, "input_"+i.toString()+"_"+vars[i]);
        if(varInPair.has(vars[i])){
            varInPair.set(vars[i], (varInPair.get(vars[i])).concat([input]));
        }
        else{
            varInPair.set(vars[i], [input]);

        }
        input.onblur=blur_event;
    } 
    log(varInPair.getItems());
}

function getVar(inputid){
    return inputid.split("_")[2];
}

function getInput(varname){
    return varInPair.get(varname);
}

function displayVarValue(varname, value){
    var inputboxs = getInput(varname);
    for(var i=0; i<inputboxs.length; i++){
        inputboxs[i].value = value;
    }
}

function getVarValue(varname){
    return getInput(varname).value;
}

function blur_event(){
    var varname = getVar(this.id);
    var varvalue = this.value;
    
    if(this.readOnly != true){
        if(this.value == ""){
            formula = substitute(formula,varvalue,varname);
        }
        else{
            varname = getVar(this.id);
            varvalue = this.value;
            formula = substitute(formula,varname,varvalue);
            var res = autosolve(formula);
            if(res!=null){
                log(formula);
                log(res.varname);
                log(res.solution);
                displayVarValue(res.varname, res.solution);
            }
        }
    }
}

function focus_event(){
    console.log("focus");
}
function setrestrict(){
    for(var i=0;i<vars.keys().length;i++){
        var keyvalue = vars.keys()[i]; 
        var ct = vars.get(keyvalue);
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
