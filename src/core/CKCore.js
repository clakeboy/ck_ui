/**
 * 核心类库
 * Created by CLAKE on 2016/3/17.
 */
define(function(){
    //HOOK 为string 对像加入trim方法
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g,"");
        };
    }


    //HOOK 为Array加入indexOf方法
    if(!Array.prototype.indexOf){
        Array.prototype.indexOf = function(obj){
            for(var i=0; i<this.length; i++){
                if(this[i]==obj){
                    return i;
                }
            }
            return -1;
        };
    }
    //核心命名空间
    var CK = {
        window_cfgs:{},
        control_cfgs:{},
        component_cfgs:{}
    };

    /**
     * 循环数组，并执行回调
     * @param emls
     * @param func
     */
    CK.each = function(emls,func) {
        if (emls.constructor != Array && emls.constructor != NodeList) return;
        var i,flag;
        for (i=0;i<emls.length;i++) {
            flag = func.call(emls[i],i);
            if (flag === false) break;
        }
    };

    return CK;
});
