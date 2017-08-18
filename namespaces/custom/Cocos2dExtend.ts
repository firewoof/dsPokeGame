
/// <reference path="./../../creator.d.ts" />
//-------------------cc.Node的扩展--------------------------
/**
 * 以锚点相对布局(不会修改node锚点)
 * @param position      (想要设置的位置)
 * @param [anchorPoint]   (以哪个参考锚点设置位置,note:不会改变实际锚点) 
 * @param [isBoundingBox] (如果node有缩放的话，这里要设置为true 结果才能保证正确)
 */
cc.Node.prototype.setPos = function(position:Vec2, anchorPoint?:Vec2, isBoundingBox?:boolean) 
{
    var anchorPoint = anchorPoint || cc.p(0.5, 0.5);
    var nodeAnchorPoint = this.getAnchorPoint();
    // if(this.isIgnoreAnchorPointForPosition()){
    //     nodeAnchorPoint = cc.p(0, 0);
    // }
    var size = isBoundingBox ? this.getBoundingBox() : this.getContentSize();
    var width = size.width;
    var height = size.height;
    var offsetX = (nodeAnchorPoint.x - anchorPoint.x) * width;
    var offsetY = (nodeAnchorPoint.y - anchorPoint.y) * height;
    this.setPosition(cc.p(position.x + offsetX, position.y + offsetY));
}