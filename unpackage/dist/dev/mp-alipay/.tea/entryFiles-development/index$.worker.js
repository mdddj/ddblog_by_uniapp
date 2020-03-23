if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../colorui/components/cu-custom?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/post-card?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/BottomNav?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../common/jyf-parser/components/jyf-parser/libs/trees?hash=c135f1e1af069904f3184c321fa0bccecb80f35b');
require('../../common/jyf-parser/components/jyf-parser/jyf-parser?hash=c135f1e1af069904f3184c321fa0bccecb80f35b');
require('../../pages/index/index?hash=fececf6d47684b2600240b7a86f7132c244a0666');
require('../../pages/detail/article?hash=3abbb54b8846c9bfb75a48e171a37dc3397d19e7');
require('../../pages/articles/articles?hash=3fd6ccd38cc36664f81f92fc169f46dec9669371');
require('../../pages/list/list?hash=d88397f36c50e61be41f9d920b865c573b4fd01a');
require('../../pages/search/search?hash=fececf6d47684b2600240b7a86f7132c244a0666');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}