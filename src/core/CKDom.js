/**
 * CKDom HTML文档处理对像
 * Created by CLAKE on 2016/3/18.
 */

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
    CK.$.each(this.emls,func);
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
    var vals=[],is_set=false;
    if (val !== null) {
        val = val.toString();
        is_set = true;
    }
    this.each(function(){
        if (is_set) {
            this.setAttribute(key,val);
        } else {
            vals.push(this.getAttribute(key));
        }
    });
    if (is_set) {
        return this;
    } else {
        return vals.length > 1 ? vals : vals[0];
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
            this.addEventListener(evt_name,CK.util.createEvent(func),false);
        } else {
            this.attachEvent("on"+evt_name,CK.util.createEvent(func));
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
        var class_vals = [];
        this.each(function(){
            var s = this.className;
            class_vals.push(s.split(" "));
        });
        return class_vals.length > 1 ? class_vals : class_vals[0];
    } else {
        var s = elm.className;
        return s ? s.split(' ') : false;
    }
};

/**
 * 得到DOM集合的XY坐标
 * @returns {*}
 */
CKDom.prototype.xy = function() {
    var parent = arguments[1] || null;
    return CK.util.getElementXY(this,parent);
};

