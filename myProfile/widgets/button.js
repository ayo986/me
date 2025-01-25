
class Button extends moveClip{
    origin = CENTER_CENTER
    clip = true
    text = 'Button'
    iconSize = 0
    imageIcon = null
    alignIcon = TOP_RIGHT
    imageColor = [255]
    corner = [20]
    imageCircle = false
    textAlign = [LEFT, CENTER]
    modeIcon = true
    space = 30
    
    outLineColor = null
    nofill = false
    weight = 1
    onPress = function(){}
    onClick = function(){}

    constructor(...args){
        super()
        this.set(...args)
    }

    draw(){
        noStroke()
        noFill()
        textAlign(this.textAlign[0], this.textAlign[1])
        imageMode(CENTER)
        textFont(this.font)
        textSize(this.fontSize)
        strokeWeight(this.weight)
        let [ox, oy] =this.Origin()
        let [ow, oh] = this.Size()

        let tw = textWidth(this.text)
        let th = 0
        // this.opacity = this.clicked ? 50: 100
        let alpha = (this.opacity/100) * 255
        

        let iw = this.iconSize
        let ih = this.iconSize


        let ix = -ox + this.alignIcon.x * ow + ( 0.5 - this.alignIcon.x) * (iw+10)
        let iy = -oy + this.alignIcon.y * oh + ( 0.5 - this.alignIcon.y) * (ih+10)

        if (this.imageIcon) {
            // print(this.alignIcon)
            let c = color(this.imageColor)
            c.setAlpha(alpha)
            tint(c)
            if (this.imageCircle) {
                drawingContext.save()
                fill(this.bg)
                ellipse(ix, iy, iw, ih)
                drawingContext.clip()
                image(this.imageIcon, ix, iy, iw, ih)
                drawingContext.restore()

            }else{

                if (!this.modeIcon) {
                    iw = this.width - this.space
                    ih = this.height - this.space
                }
                image(this.imageIcon, ix, iy, iw, ih)
            }
        }
        //fg
        if (this.outLineColor) {
            stroke(this.outLineColor)
        }
        if (!this.nofill) {
            let c = color(this.fg)
            c.setAlpha(alpha)
            fill(c)
        }

        text(this.text, iw*1.5, this.textAlign[1] == CENTER? 0 : 10, ow, oh)
    }
}