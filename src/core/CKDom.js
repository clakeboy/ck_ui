/**
 * CKDom HTML文档处理对像
 * Created by CLAKE on 2016/3/18.
 */
define(['core/CKCore','core/CKUtil'],function(CK){
    /**
     * CKDom HTML文档处理对像
     * @param emls Element 对像集合
     * @constructor {CKDom}
     */
    function CKDom(emls) {
        //DOM Element 集合
        this.emls = emls;
    }

    /**
     * 循环DOM组数执行回调
     * @param func
     * @returns {CKDom}
     */
    CKDom.prototype.each = function(func) {
        CK.each(this.emls,func);
        return this;
    };

    /**
     * 设置DOM css 属性
     * @param style_list 样式列表
     * @returns {CKDom}
     */
    CKDom.prototype.css = function(style_list) {
        return this.each(function(){
            var style_key = null;
            for (var key in style_list) {
                try {
                    style_key = key;
                    if (key == "float") {
                        if (CK.util.is_ie) {
                            style_key = "styleFloat";
                        } else {
                            style_key = "cssFloat";
                        }
                    } else if (key == 'opacity' && CK.util.is_ie) {
                        var val = parseFloat(style_list[key]);
                        val = val > 1 ? 100:val*100;
                        style_key = 'filter';
                        style_list[key] = 'Alpha(opacity='+val+')';
                    } else if (key == 'borderRadius') {

                    }

                    this.style[style_key] = style_list[key];
                } catch(e) {
                    continue;
                }
            }
        });
    };

    /**
     * 得到或设置DOM属性
     * @param key
     * @returns {CKDom|Array|String}
     */
    CKDom.prototype.attr = function(key) {
        var val = arguments[1] || null;
        var is_set=false;
        if (val !== null) {
            val = val.toString();
            is_set = true;
        }
        if (is_set) {
            this.each(function(){
                this.setAttribute(key,val);
            });
            return this;
        } else {
            return this.emls[0]?this.emls[0].getAttribute(key):null;
        }
    };

    /**
     * 邦定DOM事件到DOM对像集合
     * @param evt_name 事件名
     * @param func 事件方法
     * @returns {CKDom}
     */
    CKDom.prototype.on = function(evt_name,func) {
        return this.each(function(){
            if (this.addEventListener) {
                this.addEventListener(evt_name,CK.util.CreateEvent(func),false);
            } else {
                this.attachEvent("on"+evt_name,CK.util.CreateEvent(func));
            }
        });
    };

    /**
     * 添加一个CLASS到DOM集合
     * @param cls_name
     * @returns {CKDom|*}
     */
    CKDom.prototype.addClass = function(cls_name) {
        var self = this;
        return this.each(function(){
            var arr = self.getClass(this);
            var muti = (cls_name.constructor == Array);
            if (arr) {
                if (muti) {
                    for (var key in cls_name) {
                        if (arr.indexOf(cls_name[key]) == -1) {
                            arr.push(cls_name[key]);
                        }
                    }
                } else {
                    if (arr.indexOf(cls_name) == -1) {
                        arr.push(cls_name);
                    }
                }
                this.className = arr.join(" ");
            } else {
                this.className = muti?cls_name.join(' '):cls_name;
            }
            arr = muti = null;
        });
    };

    /**
     * 删除DOM集合中的CLASS
     * @param cls_name
     * @returns {CKDom|*}
     */
    CKDom.prototype.removeClass = function(cls_name) {
        var self = this;
        return this.each(function(){
            var arr = self.getClass(this);
            var muti = (cls_name.constructor == Array);
            if (arr) {
                if (muti) {
                    var key;
                    for (key in cls_name) {
                        if (arr.indexOf(cls_name[key]) != -1) {
                            arr.splice(arr.indexOf(cls_name[key]),1);
                        }
                    }
                } else {
                    if (arr.indexOf(cls_name) != -1) {
                        arr.splice(arr.indexOf(cls_name),1);
                    }
                }
                this.className = arr.join(' ');
            }
            arr = muti = null;
        });
    };


    /**
     * 得到DOM集合的CLASS属性
     * @returns {Array|*}
     */
    CKDom.prototype.getClass = function() {
        var elm = arguments[0] || null;
        if (elm === null) {
            var class_name = this.emls[0] ? this.emls[0].className : '';
            return class_name.split(' ');
        } else {
            var s = elm.className;
            return s ? s.split(' ') : false;
        }
    };

    /**
     * 得到DOM集合的XY坐标
     * @returns {Array}
     */
    CKDom.prototype.points = function() {
        var rect = null;
        var parent = arguments[1] || null;
        rect = CK.util.GetElementXY(this.emls[0], parent);
        return rect;
    };

    /**
     * 得到或是设置DOM节点内容
     * @returns {*}
     */
    CKDom.prototype.text = function() {
        var text = arguments[0] || null;
        if (text) {
            return this.each(function(){
                console.log(this);
                this.textContent = text;
            });
        } else {
            return this.emls[0] ? this.emls[0].textContent : null;
        }
    };

    /**
     * 得到或是设置DOM节点HTML内容
     * @returns {*}
     */
    CKDom.prototype.html = function() {
        var text = arguments[0] || null;
        if (text) {
            return this.each(function(){
                this.innerHTML = text;
            });
        } else {
            return this.emls[0] ? this.emls[0].innerHTML : null;
        }
    };


    /**
     * 查询得到DOM节点
     * @param query
     * @returns {CKDom}
     */
    CK.$ = function(query) {
        var emls = null;
        if (typeof query == 'string') {
            var doc = arguments[1] || CK.util.GetDocument();
            emls = doc.querySelectorAll(query);
        } else {
            emls = [query];
        }

        return new CKDom(emls);
    };

    CK.CKDom = CKDom;

    return CK;
});
