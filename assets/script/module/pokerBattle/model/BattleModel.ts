/**
 * battle
 */
import {SimplePlayer} from "../../../common/models/Player"
import CardModel from "./CardModel"
export default class BattleModel extends BaseModel {
    _isLastStage:boolean
    _totalRound:number
    _curRound:number

    _isVisibleCardNum:boolean
    _totalPlayer:number
    _totalPoker:number

    _readyPlayers:Array<SimplePlayer>

    //客户端表示的是物理位置 自己永远是0, 逆时针递增
    _selfClientPos:number
    //服务端表示的是逻辑位置 服务器的位置是 0  1  2  3  其中0为房主
    _selfServerPos:number

    //手上有的扑克牌, 经过排序的 poker
    _selfCards:Array<CardModel>
    //以 num, suit, seq 组合成字符串作为key
    _selfCardsMixMap:object
    //以symbol 做key
    _selfCardsSymbolMap:object    

    constructor(){
        super("BattleModel")
        this._isLastStage = false
        this._totalRound = 0
        this._curRound = 0
        this._isVisibleCardNum = false
        this._totalPlayer = 3
        this._totalPoker = 16

        this._selfCards = []                //[ Card实例, ... ]
        this._selfCardsMixMap = {}          //可以使用 key(suit + num + seq) 索引
        this._selfCardsSymbolMap = {}       //可以使用card symbol 快速索引
    }

    //
    initSelfCardsMap(){    
        for(let i = 0 ; i < this._selfCards.length; i++) {
            let card:CardModel = this._selfCards[i]
            // mix key 处理
            let key = "" + card.suit + card.num + card.seq
            this._selfCardsMixMap[key] = card
            // symbol map 处理
            this._selfCardsSymbolMap[card.symbol] = card
        }
    }

    /**
     * 客户端表示的是物理位置 我永远是0, 逆时针递增
     * 服务端表示的是逻辑位置 服务器的位置是 0  1  2  3  其中0为房主
     * pos 是服务器的逻辑位置
     */ 
    getClientPos(serverPos:number) {
        let difV = this._selfServerPos - serverPos
        let clientPos = 0
        if(difV < 0 )
            clientPos = this._selfClientPos - difV
        else if (difV > 0 )
            clientPos = this._totalPlayer - difV
        else
            clientPos = this._selfClientPos    
        return clientPos
    }

    // 排序扑克, 从小到大排序
    sortCardsNum(cardsArr:Array<number>)
    {
        let sortFunc = function (data1:number, data2:number)
        {
            if (data1 < 3 && data2 >= 3)
                return 0
            else if (data1 >= 3 && data2 < 3)
                return 1
            else
                return data1 - data2            
        }

        cardsArr.sort(sortFunc)
    }

    /**
     * 排序扑克, 从小到大排序
     */ 
    sortCards(cards:Array<CardModel>)
    {
        let sortFunc =  function (data1:CardModel, data2:CardModel) : number
        {
            let isSwap = false;
            if ((data1.num < 3 && data2.num < 3) || (data1.num >= 3 && data2.num >= 3)) 
            {
                if (data1.num == data2.num )
                    isSwap = data1.suit > data2.suit
                else
                    isSwap = data1.num < data2.num
                }
                else if (data1.num < 3 && data2.num >= 3)
                {
                isSwap = false
                }
                else if (data1.num >= 3 && data2.num < 3) 
                {
                isSwap = true
            }
                else {
                isSwap = data1.num < data2.num
            }
            return isSwap ? 1 : -1;
        }

        cards.sort(sortFunc)
    }
}