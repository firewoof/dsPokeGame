/**
 * 常量
 */
namespace cs {
    //服务器时区（协调世界时）
    export const SERVER_UTC = 8; //东区符号+ 西区符号-
    
        //自定义通用配色
        /** GRAY */
        export const GRAY = cc.color(143, 162, 176);
        /** RED */
        export const RED = cc.color(217, 73, 47);
        /** GREEN */    
        export const GREEN = cc.color(35, 141, 90);
        /** YELLOW */
        export const YELLOW = cc.color(252, 187, 12);
        /** BLACK */
        export const BLACK = cc.color(21, 25, 26);
}

window["cs"] = cs;