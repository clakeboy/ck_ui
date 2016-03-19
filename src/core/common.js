/**
 * 公共方法集合
 * Created by CLAKE on 2016/3/18.
 */


//******************************************
// Add trim function in string object
//******************************************
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
};

//******************************************
// Add indexOf function in Array object
//******************************************
if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    };
}
//CK命名空间
var CK = {
    window_cfgs:{},
    control_cfgs:{},
    component_cfgs:{}
};

var ua = window.navigator.userAgent.toLowerCase();

/**
 * 工具对像
 * @type {{getDocument: CK.util.getDocument, is_ie: boolean, is_ie6: boolean, is_ie7: boolean, is_ie8: boolean, is_ie9: boolean, is_ie10: boolean, is_ff: boolean, is_sa: boolean, is_ch: boolean, is_opa: boolean, is_ipad: boolean, is_iphone: boolean, is_android: boolean}}
 */
CK.util = {
    is_ie : ua.indexOf("msie") != -1 ? true : false,
    is_ie6 : ua.indexOf("msie 6") != -1 ? true : false,
    is_ie7 : ua.indexOf("msie 7") != -1 ? true : false,
    is_ie8 : ua.indexOf("msie 8") != -1 ? true : false,
    is_ie9 : ua.indexOf("msie 9") != -1 ? true : false,
    is_ie10 : ua.indexOf("msie 10") != -1 ? true : false,
    is_ff : ua.indexOf("firefox") != -1 ? true : false,
    is_sa : ua.indexOf("safari") != -1 && ua.indexOf("chrome") == -1 ? true : false,
    is_ch : ua.indexOf("chrome") != -1 ? true : false,
    is_opa : ua.indexOf("opera") != -1 ? true : false,
    is_ipad : ua.indexOf("ipad") != -1 ? true : false,
    is_iphone : ua.indexOf("iphone") != -1 ? true : false,
    is_android : ua.indexOf("android") != -1 ? true: false,
    /**
     * 得到文档对像
     * @returns {Element|HTMLElement}
     */
    getDocument:function () {
        return document.documentElement || document.body;
    }
};
ua = null;

/**
 * 查询得到DOM节点
 * @param query
 * @returns {CKDom}
 */
CK.$ = function(query) {
    var emls = null;
    if (typeof query == 'string') {
        var doc = arguments[1] || CK.util.getDocument();
        emls = doc.querySelectorAll(query);
    } else {
        emls = [query];
    }

    return new CKDom(emls);
};

/**
 * 循环一个数组，并执行回调
 * @param emls
 * @param func
 */
CK.$.each = function(emls,func) {
    if (emls.constructor != Array) return;
    var i;
    for (i=0;i++;i<emls.length) {
        func.call(emls[i],i);
    }
};