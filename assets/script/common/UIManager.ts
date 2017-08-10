let POP_ANIMATION_TIME = 0.4;
export default class UIManager {

    //pushLayer 到当前场景
    public static pushLayer(view, scene ? , isDoAni ? :boolean){
        scene = scene || cc.director.getScene()

        //新添层是全屏遮盖特性，表示下层界面是看不到的，这里可以减少绘制)
        if(view.isCovered){
            scene.sortAllChildren();
            for (let children = scene.getChildren(), i = children.length; i > 0; --i) {
                let child = children[i - 1];
                //隐藏上一个全屏layer
                // if (child instanceof cc.Layer && child._isFullScreenOpaque == true) {
                //     cc.log("隐藏下一层全屏layer, layerName: "+child._layerName);
                //     child.setVisible(false);
                //     break;
                //  }
                }
        }
        scene.addChild(view);

        //打开界面时的动画效果
        // if (isDoAni || view instanceof PopLayer) {
        //     view.stopAllActions();
        //     view.setScale(1,0);
        //     view.runAction(cc.scaleTo(POP_ANIMATION_TIME,1,1).easing(cc.easeBackOut()));
        // }

        //TODO 新界面打开时 要做的其他逻辑..
    }

    //移除界面
    public static popLayer(view, scene?){
        scene.removeChild(view, true);

        //若当前层是全屏不透明layer则显示下一个全屏layer
        if(view.isCovered == true){
            for (var children = scene.getChildren(), i = children.length; i > 0; --i) {
                var child = children[i - 1];
                if (child.isCovered) {
                    cc.log("显示全屏下一层全屏layer, layerName: "+child._layerName);
                    child.setVisible(true);
                    break;
                }
            }
        }
    }
}