import CardModel from "../model/CardModel"
import BattleModel from "../model/BattleModel"
import UIManager from "../../../common/UIManager"
import CardView from "./CardView"
const {ccclass, property} = cc._decorator;
@ccclass
export default class SelfCardsView extends BaseView{    

    @property(cc.Prefab)
    cardPrefab:cc.Prefab

    _cardPool:cc.NodePool
    _cards:Array<CardModel>
    _usingCards:Array<any>

    //牌距，牌宽
    _cardGap:number
    _cardWidth:number

    onLoad()
    {     
        this._usingCards = [];
        //创建牌池
        this._cardPool = new cc.NodePool();

        let cards = this._cards = [];   
        //test
        for(let i = 0; i < 16; i++){
            var cardInfo = new CardModel();
            cards.push(cardInfo);
        }
        
        this._cardGap = 50;
        this._cardWidth = this.cardPrefab.data.width;

        this.refresh();
    }

    genCard() {
        let cardView = null;
        if(this._cardPool.size() > 0){
            cardView = this._cardPool.get()
        }else{
            cardView = cc.instantiate(this.cardPrefab)        
        }
        //卡牌移动
        //cardView.on(cc.Node.EventType.MOUSE_DOWN, this._mouseDownCallback.bind(this));    
        cardView.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp.bind(this));    
        //touch        

        return cardView;
    }

    onTouchMove(){
        //TODO 
    }

    onMouseUp(event:cc.Event.EventMouse){
        cc.log("onMouseUp");
        let target = event.getCurrentTarget();
        let originPosY = target["_originPosY"];
        if(target["_isSelected"]){
            target.position = cc.p(target.getPositionX(), originPosY);
            target["_isSelected"] = false
        }else{
            target.position = cc.p(target.getPositionX(), originPosY + 30);
            target["_isSelected"] = true
        }
    }

    /**
     * 回收所有牌
     */
    cycleCard(){
        let usingCards = this._usingCards;
        for(let i = 0; i < usingCards.length; i++){
            let cardView = usingCards[i];
            this._cardPool.put(cardView);
        }
        this._usingCards = [];
    }

    /**
     * 重刷
     */
    refresh(){     
        //计算第一张牌的起始位置(为保证整副牌居中)    
        let cardsWidth = (this._cards.length - 1) * this._cardGap + this._cardWidth;
        let startX = (cc.winSize.width - cardsWidth) * 0.5;
        //先回收
        this.cycleCard();    
        
        for(let i = 0; i < this._cards.length; i++){
            let cardInfo = this._cards[i];
            let cardView = this.genCard();   
            cardView.getComponent(CardView).setCard(cardInfo);     
            cardView.parent = this.node;
            cardView.setPosition(startX + i * 48, 0);
            cardView["_originPosY"] = cardView.getPositionY();
            this._usingCards.push(cardView);            
        }
    }
}