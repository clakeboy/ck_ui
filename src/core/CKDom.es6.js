/**
 * Created by CLAKE on 2016/3/20.
 */
export default class CKDom {
    constructor(elms) {
        this._elms = elms;
    }
    each(func) {
        CK.$.each(this.emls,func);
        return this;
    }
}

