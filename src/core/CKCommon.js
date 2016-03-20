/**
 * 公共方法集合
 * Created by CLAKE on 2016/3/18.
 */

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
//CK命名空间
var CK = {
    window_cfgs:{},
    control_cfgs:{},
    component_cfgs:{}
};
//浏览器用户代理信息
var ua = window.navigator.userAgent.toLowerCase();

/**
 * 工具对像
 * @type {{getDocument: CK.util.getDocument, is_ie: boolean, is_ie6: boolean, is_ie7: boolean, is_ie8: boolean, is_ie9: boolean, is_ie10: boolean, is_ff: boolean, is_sa: boolean, is_ch: boolean, is_opa: boolean, is_ipad: boolean, is_iphone: boolean, is_android: boolean}}
 */
CK.util = {
    is_ie : (ua.indexOf("msie") != -1),
    is_ie6 : (ua.indexOf("msie 6") != -1),
    is_ie7 : (ua.indexOf("msie 7") != -1),
    is_ie8 : (ua.indexOf("msie 8") != -1),
    is_ie9 : (ua.indexOf("msie 9") != -1),
    is_ie10 : (ua.indexOf("msie 10") != -1),
    is_ff : (ua.indexOf("firefox") != -1),
    is_sa : (ua.indexOf("safari") != -1 && ua.indexOf("chrome") == -1),
    is_ch : (ua.indexOf("chrome") != -1),
    is_opa : (ua.indexOf("opera") != -1),
    is_ipad : (ua.indexOf("ipad") != -1),
    is_iphone : (ua.indexOf("iphone") != -1),
    is_android : (ua.indexOf("android") != -1),
    /**
     * 得到文档对像
     * @returns {Element|HTMLElement}
     */
    getDocument:function () {
        return document.documentElement || document.body;
    },
    /**
     * 创建自定义的EVENT事件方法
     * @param callback
     * @returns {Function}
     */
    createEvent:function(callback) {
        return function(evt) {
            /**
             * @param evt {Event}
             */
            if (window.event) {
                evt = window.event;
            }

            if (evt) {
                if ( evt.pageX == null && evt.clientX != null ) {
                    var doc = CK.util.getDocument();
                    evt.pageX = evt.clientX + doc.scrollLeft;
                    evt.pageY = evt.clientY + doc.scrollTop;
                    doc = null;
                }
                evt.stopEvent = function() {
                    if (CK.util.is_ie &&
                        (CK.util.is_ie6 ||
                        CK.util.is_ie7 ||
                        CK.util.is_ie8)) {
                        this.cancelBubble = true;
                    } else {
                        this.stopPropagation();
                    }
                };

                evt.endEvent = function() {
                    if (CK.util.is_ie &&
                        (CK.util.is_ie6 ||
                        CK.util.is_ie7 ||
                        CK.util.is_ie8)) {
                        this.returnValue = false;//end event
                    } else {
                        this.preventDefault();//end event
                    }
                };

                evt.getTarget = function() {
                    return this.srcElement || this.target;
                };
                this.call(callback,evt);
            } else {
                return null;
            }
        };
    },
    /**
     * 得到一个DOM对像在屏中的坐标
     * @returns {{}}
     */
    getElementXY:function() {
        var parent = arguments[1]||undefined;
        var t = {
            'top': e.offsetTop,
            'left': e.offsetLeft
        };
        var scrollTop = 0;
        var scrollLeft = 0;
        var topScroll = 0;
        var leftScroll = 0;
        while ((e = e.offsetParent) && e != parent) {
            t['top'] += e.offsetTop;
            t['left'] += e.offsetLeft;
            topScroll = e.scrollTop;
            scrollTop += topScroll;
            leftScroll = e.scrollLeft;
            scrollLeft += leftScroll;
        }
        t['top'] = t['top'] - (scrollTop - topScroll);
        t['left'] = t['left'] - (scrollLeft - leftScroll);

        scrollTop = topScroll = scrollLeft = leftScroll = parent = null;
        return t;
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
    var i,flag;
    for (i=0;i++;i<emls.length) {
        flag = func.call(emls[i],i);
        if (flag === false) break;
    }
};