import Model from "./model/MainModel"
import View from "./view/MainView"
import Controller from "./controller/MainController"
import UIManager from "./../../common/UIManager"

export default class MainModule {
    private static instance:MainModule;

    private model:Model;
    private view:View;
    private controller:Controller;

    constructor(){
        this.model = new Model();
        this.controller = new Controller();
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
        cc.loader.loadRes(cs.PrefabSrc.mainView, cc.Prefab, function(err, prefab) {
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
        if(this.controller)
            this.controller.destroy();  //controller的 destory会附带 model的释放
    }
}