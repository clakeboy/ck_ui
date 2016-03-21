/**
 * Created by CLAKE on 2016/3/22.
 */
define([
    'core/CKCore',
    'core/CKUtil',
    'core/CKDom'
], function(CK){
    console.log('main');
    return (window.CK = CK);
});
require(['main']);