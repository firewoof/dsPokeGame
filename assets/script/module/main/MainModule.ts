import MainView from "./view/MainView"
import MainController from "./controller/MainController"
import MainModel from "./model/MainModel"
import UIManager from "./../../common/UIManager"

export default class MainModule {
    private static instance:MainModule;

    private view:MainView;
    private controller:MainController;
    private model:MainModel;

    constructor(){
        this.model = new MainModel();
        this.controller = new MainController();
    }

    public static getInstance() : MainModule { 
        if(!MainModule.instance){
            MainModule.instance = new MainModule();
        }
        return MainModule.instance;
    }

    initMVC () {
        this.view.controller = this.controller
        this.view.model = this.model
        this.controller.model = this.model;
    }

    show(){
        //资源加载只能异步
        cc.loader.loadRes("prefabs/mainView.prefab", cc.Prefab, function(err, prefab) {
            if (err) {
                console.error(err);
                return;
            }
            let inst =  cc.instantiate(prefab);
            UIManager.pushLayer(inst);

            cc.log("instantiate prefab mainView");
            this.view = inst.getComponent("MainView");
            this.view.print();

            this.initMVC();
        }.bind(this))
    }

    destroy(){
        if(this.controller){
            this.controller.destroy();  //controller的 destory会附带 model的释放
        }
    }
}