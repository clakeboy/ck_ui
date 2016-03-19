/**
 * CKDom HTML文档处理对像
 * Created by CLAKE on 2016/3/18.
 */

/**
 * CKDom HTML文档处理对像
 * @param emls Element 对像集合
 * @constructor CKDom
 */
function CKDom(emls) {
    //DOM Element 集合
    this.emls = emls;
}

CKDom.prototype.each = function(func) {
    CK.$.each(this.emls,func);
    return this;
};

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