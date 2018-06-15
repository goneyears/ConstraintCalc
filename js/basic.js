function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}
function Dictionary() {  
    var items = {};  

    this.has = function (key) {  
        return key in items;  
    };  

    this.set = function (key, value) {  
        items[key] = value;  
    };  

    this.remove = function (key) {  
        if (this.has(key)) {  
            delete items[key];  
            return true;  
        }  
        return false;  
    };  

    this.get = function (key) {  
        return this.has(key) ? items[key] : undefined;  
    };  

    this.values = function () {  
        var values = [];  
        for (var k in items) {  
            if (this.has(k)) {  
                values.push(items[k]);  
            }  
        }  
        return values;  
    };  

    this.keys = function(){
        var keys = [];
        for(var k in items){
            keys.push(k);
        }
        return keys;
    }

    this.clear = function () {  
        items = {};  
    };  

    this.size = function () {  
        var count = 0;  
        for (var prop in items) {  
            if (items.hasOwnProperty(prop)) {  
                ++count;  
            }  
        }  
        return count;  
    };  

    this.getItems = function () {  
        return items;  
    };  
}  


function for_each_except(exception, procedure, list){
    function loop(items){
        if(items == null){
            console.log("done");
        }
        else if(items[0] == exception){
            loop(rest(items));
        }
        else{
            procedure(first(items));
            loop(rest(items));
        }
    }
    loop(list);
}

function first(arr){
    return arr[0];
}

function rest(arr){
    if(arr[1] != null){
        return arr.slice(1,arr.length);
    }
    return null;
}

function memq(element, arr){
    var i = arr.length;
    while(i--){
        if(arr[i] == element){
            return true;
        }
    }
    return false;

}

function Lt(tree){
    return tree[1];
}

function Rt(tree){
    return tree[2];
}

function isTree(tree){
    return isArray(tree);
}

function eqLeft(str){
    return str.split("=")[0];
}

function eqRight(str){
    return str.split("=")[1];
}

function log(v){
    console.log(v);
}

function logger(str,v){
    log(str+"------start------");
    log(v);
    log(str+"------end--------");
}
function lgg(v){
    console.log(v);
    return lgg;
}
//lgg("dsdfsf")("sdfsdf")("sdfadfsf");