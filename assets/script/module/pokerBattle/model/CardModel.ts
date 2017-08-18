/**
 * 牌
 */
export default class CardModel extends BaseModel{
    private _num:number          //
    private _suit:cs.CardSuits   //花色
    private _seq:number          //排序序号

    //
    private __symbol

    constructor(){
        super("CardModel")

        //
        this.__symbol = Symbol("card_symbol")
    }

    setCard(num:number, suit:cs.CardSuits, seq:number){

    }

    /**
     * 以symbol作为独一无二的key
     */
    get symbol(){
        return this.__symbol
    }

    get num(){
        return this._num
    }

    get suit(){
        return this._num
    }

    get seq(){
        return this._num
    }

    set seq( value ){
        this._seq = value;
    }
}