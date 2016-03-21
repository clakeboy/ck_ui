/**
 * Created by CLAKE on 2016/3/22.
 */
requirejs.config({
    //By default load any module IDs from js/lib
    //baseUrl: 'public',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        main: './main'
    }
});
require(['main']);