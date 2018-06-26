function opts(){
    return /\+|\-|\*|\/|\(|\)|\^|=|ln|log|sin|cos|tan|cot|asin|acos|atan|acot/g;
 
}
function optSplit(str){
    var regx = opts(); 
    var s1 = str.replace(regx,' $& ');
    var s2 = s1.replace(/\s+/g,' ');
    var s3 = s2.replace(/^\s+|\s+$/g,'');
    return s3.split(" ");

}
function isOp(str){
    var regx = opts(); 
    if(str.match(regx)!=null ){
        return true;
    }
    return false;
}

function isVar(str){
    var regx =/^[a-z]\w*$/i;
    o = str.match(regx);
    if(o!=null){
        return true;
    }
    return false;
}
Array.prototype.isInArray = function(v){
    if(this.indexOf(v) >=0 ){
        return true;
    }
    return false;
}
function aVariables(afx){
    this.count = 0;
    this.name = [];
    function iter(af){
        if(isTree(af)){
            var ilt = iter(Lt(af));
            var irt = iter(Rt(af));
            if(ilt != null && irt != null){
                return ilt.concat(irt);
            }
            else if(ilt == null && irt != null){
                return irt; 
            }
            else if(ilt != null && irt == null){
                return ilt;
            }
            else{
                return null;
            }
        }
        else{
            if(isVar(af)){
                return [af];
            }
            else{
                return null;
            }
        }
    }
    var names = iter(afx);
    for(var i=0; i< names.length; i++){
        if(!this.name.isInArray(names[i])){
            this.count ++;
            this.name.push(names[i]);
        }
    }
}
function Variables(str){
    as = optSplit(str);
    this.name = [];
    for(var i=0; i<as.length; i++){
        if(isVar(as[i])){
            if(! this.name.isInArray(as[i])){
                this.count++;
                this.name.push(as[i]) ;
            }
        }
    }
}

function indexOfOpt(as){
    var brackets = 0;
    var funs = 0;
    var prior = 100;
    var index = -1;
    for(var i=as.length-1;i>=0;i--){
        s = as[i];
        if(s==")" && !funs){
            brackets++;
        }
        else if(s=="(" && !funs){
            brackets--
        }
        else if((s=="+"||s=="-")&&(brackets==0)&&(funs==0)&&(prior>1)){
            index = i;
            prior = 1;
        }
        else if((s=="*"||s=="/")&&(brackets==0)&&(funs==0)&&(prior>2)){
            index = i;
            prior = 2;
        }
        else if((s=="sin"||s=="cos")&&(brackets==0)&&(prior>=3)){
            funs++;
            index = i;
            prior = 3;
        }
        else if(s==")"&&(funs>0)){
            funs--;
        }
    }
    return index;
}
function clearArrBracket(as){
    if(as[0]=="("&&as[as.length-1]==")"){
            return clearArrBracket(as.slice(1, as.length - 1));
    }
    else{
        return as;
    }
}
function parseToTree(as){
    as = clearArrBracket(as);
    idx = indexOfOpt(as);
    if(idx == -1){
        return as[0];
    }
    else
    {
        var leftTree = as.slice(0,idx);
        var rightTree = as.slice(idx+1,ar.length);
        return [as[idx],parseToTree(leftTree),parseToTree(rightTree)];
    }
}
function parse(str){
    ar = optSplit(str);
    return parseToTree(ar)
}

function leaftoArray(tree){
    var dic = [];
    function iter(tree){
        if(isTree(tree)){
            iter(Lt(tree))
            iter(Rt(tree));
        }
        else{
            dic.push(tree);
        }
    }

    iter(tree);
    return dic;
}

var astr = "a+1-(c+d)=m+f";
//astr = "a+(b-c)=0";
//var b = equationtofunc(astr);
//log(b);
//var av = new aVariables(b);
//log(av);