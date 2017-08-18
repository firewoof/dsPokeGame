/**
 * 枚举
 */
namespace cs {
    /**
     * 日志类型
     */
    export enum LogTypes {
        REQUEST = "Request",
        NORMAL = "Normal"
    }

    /**
     * 本地存储 key
     */
    export enum LSTypes {
        UUID = "UUID",
        NORMAL = "Normal"
    }

    /**
     * 黑红梅方
     */
    export enum CardSuits{
        Spades = 1,
        Hearts,
        Club,
        Diamonds
    }

    /**
     * 玩家的准备状态
     */
    export enum ReadyStatus{
        None = 1,   //未就绪
        Ready,      //就绪
        Left        //离开
    }
}