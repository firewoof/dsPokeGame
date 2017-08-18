import Model from "../model/CardModel"
const {ccclass, property} = cc._decorator;
@ccclass
export default class CardView extends cc.Component {
    //数字
    @property(cc.Sprite)
    cardNumSprite: cc.Sprite

    //花色min
    @property(cc.Sprite)
    suitMinSprite: cc.Sprite

    //花色center
    @property(cc.Sprite)
    suitSprite: cc.Sprite

    @property(cc.Sprite)
    maskSprite: cc.Sprite

    onload(){
        this.maskSprite.node.active = false;
    }

    setCard (cardInfo:Model) {
        //todo
    }
}