class Button extends moveClip{
  clip = true
  text = 'Button'
  iconSize = 24
  imageIcon = null
  alignIcon = 'left'
  alignText = 'center'
  imageColor = [255]
  corner = 20
  imageCircle = false
  bg = [20]
  fg = [255]
  modeIcon = true
  space = 30
  origin = CENTER_CENTER
  

  constructor(txt, x, y, w, h){
    super(x, y, w, h)
    this.text = txt
  }

  draw(){
    let ox = this.width  * this.origin.x
    let oy = this.height * this.origin.y

    let alpha = (this.opacity/100) * 255
    

    let txt = this.text

    let c = rgba(this.fg)
    if (typeof(c) != 'string') {
        c[3] = alpha
    }
    lg.setColor(c)
    // love.graphics.ctx.fillStyle = 'hsl(200, 100%, 50%)'
    let ix = -ox + this.width/2
    let iy = -oy + this.height/2
    if (this.alignIcon == 'left') {
        ix = -ox + this.iconSize
    }

    if (this.alignIcon == 'right') {
        ix = this.width - ox  - this.iconSize
    }

    if (this.imageIcon) {
        let w = this.iconSize
        let h = w
        if (typeof(this.iconSize) == 'object' ) {
            w = this.iconSize[0]
            h = this.iconSize[1]
        }
        drawImage(this.imageIcon, ix, iy, w, h)
    }

    let f = this.textFont
    lg.setFont(f)
    let tw = f.getWidth(txt)
    let th = f.getHeight(txt)
    let tx = -ox + this.width/2 - tw/2
    let ty = -oy + this.height/2 - th/2

    if (this.alignText == 'left') {
        tx = -ox + this.iconSize*2
    }

    if (this.alignText == 'right') {
        tx = this.width - ox - tw - this.iconSize*2
    }
    lg.print(txt, tx, ty)
  }

}