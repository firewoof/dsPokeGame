const {ccclass, property} = cc._decorator;
@ccclass
export default class PokerSheetOutLeft extends cc.Component {

    @property(cc.Prefab)
    cardPrefab:cc.Prefab

    onLoad(){
        let bgPanel:cc.Node = this.node;
        //slots up 12张        
        for(let i = 0; i < 11; i++){            
            let cardView =  cc.instantiate(this.cardPrefab);            
            cardView.setScale(0.59);
            bgPanel.addChild(cardView, i);                                            
            cardView.setPos(cc.p(i * 33, bgPanel.height), cc.p(0, 1), true);                
            cc.log("cardView anchor::"+ JSON.stringify(cardView.getAnchorPoint()));
            cc.log("pos::"+JSON.stringify(cc.p(i * 33, bgPanel.height)) + "i ::"+i);
        }

        //slots down 5张
        for(let i = 0; i < 5; i++){        
            let cardView =  cc.instantiate(this.cardPrefab); 
            cardView.setScale(0.59);           
            bgPanel.addChild(cardView, 12 + i);
            cardView.setPos(cc.p(0 + i * 33, 0), cs.ANCHOR_LEFT_BOTTOM, true);
        }
    }
    
}