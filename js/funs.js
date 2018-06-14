function equationtofunc(eqstr){
    var arreqleft = parse(eqLeft(str));
    var arreqright = parse(eqRight(str));



}






function deriv(fxstr, x){
    var arrfx = parse(fxstr);
    function iter(afx){
        if(isTree(afx)){
            if(afx[0] == "+" || afx[0] == "-"){
                return [afx[0], iter(Lt(afx)), iter(Rt(afx))];
            }
            else if(afx[0] == "*"){
                return ["+", ["*", iter(Lt(afx)), Rt(afx)], ["*", Lt(afx), iter(Rt(afx))]];
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

function solve(func,x,start){
    var fx = parse(func);
    var dfx = deriv(func, x);
    var arx = [];
    arx[0] = start;
    var delta = 9999;
    for(var i = 0;i<20000;i++){
        arx[i+1] = arx[i]-getValue(fx,x,arx[i])/getValue(dfx,x,arx[i]);
        delta = arx[i+1] - arx[i];
        if(Math.abs(delta) < 0.0000001){
            return arx[i+1];
        }
    }
    return null;
}

var str = "x*x*x-3*x+1";
console.log(solve(str,"x",10));