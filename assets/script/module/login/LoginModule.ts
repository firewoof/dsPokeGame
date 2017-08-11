import Model from "./model/LoginModel"
import View from "./view/LoginView"
import Controller from "./controller/LoginController"
import UIManager from "./../../common/UIManager"

export default class LoginModule {
    private static instance:LoginModule;

    private view:View;
    private controller:Controller;
    private model:Model;

    constructor(){
        this.model = new Model();
        this.controller = new Controller();
    }

    public static getInstance() : LoginModule { 
        if(!LoginModule.instance){
            LoginModule.instance = new LoginModule();
        }
        return LoginModule.instance;
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
}