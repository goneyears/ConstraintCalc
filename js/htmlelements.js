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

function varobj(varname,input, value){
    this.name = varname;
    this.input = input;
    this.value = value;
}
var vars = [];
var varInPair = new Dictionary();
var aformula = [];
var oformula = [];
var oldvaluesave;
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

function VarTrToObjTr(vartree){
    if(isTree(vartree)){
        return [vartree[0],VarTrToObjTr(Lt(vartree)),VarTrToObjTr(Rt(vartree))];
    }
    else{
        var varname = vartree;
        return new varobj(varname,getInputObjs(varname), null);
    }
}

function ObjTrToVarTr(objtree){
    if(isTree(objtree)){
        return [objtree[0],ObjTrToVarTr(Lt(objtree)),ObjTrToVarTr(Rt(objtree))];
    }
    else{
        var obj = objtree;
        if(obj.value == null){
            return obj.name;
        }
        else{
            return obj.value;
        }
    }
}
function changeObjTree(objtree, varname, value){
    if(isTree(objtree)){
        return [objtree[0], changeObjTree(Lt(objtree), varname, value), changeObjTree(Rt(objtree), varname, value)];
    }
    else{
        var obj = objtree;
        if(obj.name == varname){
            return new varobj(varname,getInputObjs(varname), value);
        }
        else{
            return obj;
        }
    }
}
function generate(){
    varInPair.clear();

    var obj = document.getElementById("formulainput");
    var str = obj.value;
    //formula = str;//add string operate to str,trim or replace spaces;
    aformula = equationtofunc(str);
    //var dicleft = leaftoArray(parse(eqLeft(str)));
    //var dicright = leaftoArray(parse(eqRight(str)));
    //vars = dicleft.concat(dicright); 
    vars = leaftoArray(aformula);
    var area = document.getElementById("formarea");
    area.innerHTML = "";
    var comments = splitToComment(str);
    var inputs = [];
    for(var i=0; i<vars.length; i++){
        genCommentbox(area,comments[i]);
        var input = genInputbox(area, "input_"+i.toString()+"_"+vars[i]);
        if(varInPair.has(vars[i])){
            //varInPair.set(vars[i], (varInPair.get(vars[i])).concat([input]));
            varInPair.set(vars[i], (varInPair.get(vars[i])).concat([new varobj(vars[i],input,null)]));
        }
        else{
            varInPair.set(vars[i], [new varobj(vars[i],input,null)]);

        }
        input.onblur=blur_event;
        input.onfocus=focus_event;
    } 
    oformula = VarTrToObjTr(aformula);
}

function getVar(inputid){
    return inputid.split("_")[2];
}

function getInputObjs(varname){
    return varInPair.get(varname);
}

function displayVarValue(varname, value){
    var inputobjs = getInputObjs(varname);
    for(var i=0; i<inputobjs.length; i++){
        inputobjs[i].input.value = value;
    }
}
function restrictVarInput(varname){
    var inputobjs = getInputObjs(varname);
    for(var i=0; i<inputobjs.length; i++){
        inputobjs[i].input.style.backgroundColor = '#FF9966';
        inputobjs[i].input.style.color = '#FFFFFF';
        inputobjs[i].input.readOnly = 'readOnly';
    }
}
function freeVarInput(varname){
    var inputobjs = getInputObjs(varname);
    log(varname);
    log(inputobjs);
    for(var i=0; i<inputobjs.length; i++){
        inputobjs[i].input.value="";
        inputobjs[i].input.style.backgroundColor = '#FFFFFF';
        inputobjs[i].input.style.color = '#669933';
        inputobjs[i].input.readOnly = null;
    }
}

function getVarValue(varname){
    return getInputObjs(varname).input.value;
}
var lastvar = "";
function blur_event(){
    var varname = getVar(this.id);
    var varvalue= this.value;
    
    if(this.readOnly != true){
        if(this.value == ""){
            //aformula = treesubstitute(aformula,varvalue,varname);
            oformula = changeObjTree(oformula,varname,null);
            aformula = ObjTrToVarTr(oformula);
            freeVarInput(varname)
            if(lastvar != ""){
                freeVarInput(lastvar);
            }
        }
        else{
            displayVarValue(varname, varvalue);//display other inputbox with the same variable
            //aformula = treesubstitute(aformula,varname,varvalue);
            oformula = changeObjTree(oformula, varname, varvalue);
            log(oformula);
            aformula = ObjTrToVarTr(oformula);
            logger("aformual", aformula);
            var res = atsolve(aformula);
            if(res!=null){
                displayVarValue(res.varname, res.solution);
                restrictVarInput(res.varname);
                lastvar = res.varname;
            }
        }
    }
}
function test(a){
    var b = ["ddd"];
    a = b;

}
var aa = [2];
test(aa);
log(aa);

function focus_event(){
    oldvaluesave = this.value;
    console.log("focus");
}
function setrestrict(){
    for(var i=0;i<vars.keys().length;i++){
        var keyvalue = vars.keys()[i]; 
        var ct = vars.get(keyvalue);
        if(ct.get_setter() != "usr" && ct.get_setter() != false){
            getInputObjs(keyvalue).input.style.backgroundColor = '#FF9966';
            getInputObjs(keyvalue).input.style.color = '#FFFFFF';
            getInputObjs(keyvalue).input.readOnly = 'readOnly';
        }
        else
        {
            getInputObjs(keyvalue).input.style.backgroundColor = '#FFFFFF';
            getInputObjs(keyvalue).input.style.color = '#669933';
            getInputObjs(keyvalue).input.readOnly = null;
        }
    }
}

