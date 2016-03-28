/**
 * 公共方法集合
 * Created by CLAKE on 2016/3/18.
 */
define(['core/CKCore'],function(CK){
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
        GetDocument:function () {
            return document.documentElement || document.body;
        },
        /**
         * 创建自定义的EVENT事件方法
         * @param callback
         * @returns {Function}
         */
        CreateEvent:function(callback) {
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
        GetElementXY:function() {
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
        },
        /**
         * 自动补齐字符长度
         * @param {String} text 要补齐长度的字符串
         * @param {Number} length 补齐的长度
         * @param {String} padstring 填补的字符
         * @option {String} left|right 是左补齐还是右补齐
         * @returns {string}
         */
        StrPad:function(text, length, padstring) {
            var type = arguments[3] || "left";
            text += '';
            padstring += '';
            var padtext = null;
            if(text.length < length) {
                padtext = padstring;

                while(padtext.length < (length - text.length)) {
                    padtext += padstring;
                }
                if (type == "left") {
                    text = padtext.substr(0, (length - text.length)) + text;
                } else if (type == "right") {
                    text = text + padtext.substr(0, (length - text.length));
                }

            }
            padtext = null;
            return text;
        },
        /**
         * 得到指字长度的随机字符串
         * @param {Number} str_length 随机长度
         * @option {String} 随机的字符串字符
         * @returns {string}
         */
        RandomStr:function(str_length) {
            var def_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var chars = arguments[1] || def_chars;
            var num;
            var out_str = "";
            for (var i=0;i<str_length;i++) {
                num = Math.round(Math.random()*chars.length);
                out_str += chars.substring(num, num+1);
            }
            chars = num = null;
            return out_str;
        },
        /**
         * 得到FLASH DOM对像
         * @param movieName
         * @returns {*}
         * @constructor
         */
        GetFlashMovieObject:function(movieName) {
            if (window.document[movieName]) {
                return window.document[movieName];
            }
            if (navigator.appName.indexOf("Microsoft")==-1) {
                if (document.embeds && document.embeds[movieName])
                    return document.embeds[movieName];
            } else {
                return document.getElementById(movieName);
            }
        }
    };
    ua = null;
    return CK;
});