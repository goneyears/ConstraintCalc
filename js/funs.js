function equationtofunc(eqstr){
    var arreqleft = parse(eqLeft(eqstr));
    var arreqright = parse(eqRight(eqstr));
    return ["-", arreqleft, arreqright];
}
function substitute(eqstr,varname,varvalue){
    return eqstr.replace(varname,varvalue);
}
function deriv(arrfx, x){
    function iter(afx){
        if(isTree(afx)){
            if(afx[0] == "+" || afx[0] == "-"){
                return [afx[0], iter(Lt(afx)), iter(Rt(afx))];
            }
            else if(afx[0] == "*"){
                return ["+", ["*", iter(Lt(afx)), Rt(afx)], ["*", Lt(afx), iter(Rt(afx))]];
            }
            else if(afx[0] == "sin"){
                return ["*", ["cos",undefined,Rt(afx)], iter(Rt(afx))];
            }
        }
        else{
            if(afx == x){
                return 1;
            }
            else{
                return 0;
            }
        }
        
    }
    return iter(arrfx);
}

function getValue(afx, x, val){
    function iter(afx){
        if(isTree(afx)){
            if(afx[0] == "+"){
                return (iter(Lt(afx)) + iter(Rt(afx)));
            }
            if(afx[0] == "-"){
                return (iter(Lt(afx)) - iter(Rt(afx)));
            }
            else if(afx[0] == "*"){
                return (iter(Lt(afx)) * iter(Rt(afx)));
            }    
            else if(afx[0] == "/"){
                return (iter(Lt(afx)) / iter(Rt(afx)));
            }    
            else if(afx[0] == "sin"){
                return Math.sin(iter(Rt(afx)));
            }
            else if(afx[0] == "cos"){
                return Math.cos(iter(Rt(afx)));
            }
            else{
                console.log("no operation setted");
            }
        }
        else{
            if(afx == x){
                return val;
            }
            else{
                return Number(afx);
            }
        }
    }
    return iter(afx)
}

function findzero(afx,x,start){
    var dfx = deriv(afx, x);
    var arx = [];
    arx[0] = start;
    var delta = 9999;
    for(var i = 0;i<2000;i++){
        arx[i+1] = arx[i]-getValue(afx,x,arx[i])/getValue(dfx,x,arx[i]);
        delta = arx[i+1] - arx[i];
        if(Math.abs(delta) < 0.0000001){
            return arx[i+1];
        }
    }
    return null;
}

function solve(eqstr, x, start){
    var afx = equationtofunc(eqstr);
    return findzero(afx,x,start);
}


function autosolve(fstr){
    var variables = new Variables(fstr);
    if(variables.count == 1){
        var x = variables.name;
        return {varname:x, solution:solve(fstr, x, 10)};
    }
    return null;
}
//var str = "x*x*x-3*x+1";
//str = "sin(x+5)";
//logger("parse",parse(str));
//var afx = parse(str);
//logger("getValue",getValue(afx,"x",5));
//console.log(solve(str,"x",10));
var maxguess = Number.MAX_VALUE;
maxguess = 1;
var eqa = "1+2+3=4+f*f";
log(solve(eqa, "f", maxguess));