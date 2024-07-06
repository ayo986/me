class Button extends moveClip{
    x = 0 
    y = 0
    width = 130
    height = 40
    text = 'myText'
    bg = style.Button.bg
    fg = style.Button.fg
    iconSize = 24
    imageIcon = null
    alignText = 'left'
    imageColor = [255]
    corner = 0
    imageCircle = false
    modeIcon = true
    space = 30

    constructor(txt, x, y, w, h) {
      super(x, y, w, h);
      this.text = txt
    }

    draw(){
        let alpha = (this.opacity/100) * 255
        if(!this.enabled){
            alpha = 128
        }
        let ow = this.width
        let oh = this.height
        let ox = this.origin.x * ow
        let oy = this.origin.y * oh

        let ix = -ox + ow/2 - this.iconSize/2
        let iy = -oy + oh/2

        //text
        let f = lg.newFont(this.font, this.fontSize)
        lg.setFont(f)

        let txt = this.text
        let tw = f.getWidth(txt)
        let th = f.getHeight(txt)

        let tx = ix - tw/2 + this.iconSize/2
        let ty = iy - th/2

        if (this.alignText == 'left') {
            ix = -ox + 4
            tx = ix + this.iconSize + 6
        }

        if (this.alignText == 'right') {
            ix = -ox + ow - 4 - this.iconSize
            tx = ix - tw - 6
        }

        if (this.imageIcon) {
            let [ir, ig, ib, ia] = rgba(this.imageColor)
            lg.setColor(ir, ig, ib, alpha)
            if (this.imageCircle) {
                lg.saveClip()
                lg.circle('fill', ix+this.iconSize/2, iy, this.iconSize/2)
                lg.setClip();
            }
            drawImage(this.imageIcon, ix, iy, this.iconSize, this.iconSize, {x: 0.0, y: 0.5})

            if (this.imageCircle) {
                lg.noClip()
            }
        }

        let [fr, fg, fb, fa] = rgba(this.fg)
        lg.setColor(fr, fg, fb, alpha)

        lg.print(txt, tx, ty)
    }
}
