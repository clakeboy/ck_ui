/**
 * 核心类库
 * Created by CLAKE on 2016/3/17.
 */

//添加一个WINDOW
CK.addWindow = function(cfg) {
    if (cfg && cfg['name']) {
        CK.window_cfgs[cfg.name] = cfg;
    }
    cfg = null;
};
