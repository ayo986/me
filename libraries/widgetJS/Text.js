class Text extends moveClip{
  clip = true
  text = 'Text'
  alignText = 'center'
  imageColor = [255]
  corner = 0
  imageCircle = false
  bg = [20]
  fg = [255]
  modeIcon = true
  space = 30
  origin = CENTER_CENTER
  

  constructor(txt, x, y){
    super(x, y, 10, 10)
    this.text = txt
  }

  draw(){
    let f = this.textFont
    lg.setFont(f)

    let ox = this.width  * this.origin.x
    let oy = this.height * this.origin.y

    let alpha = (this.opacity/100) * 255
    

    let txt = this.text

    let c= rgba(this.fg)
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
        drawImage(this.imageIcon, ix, iy, this.iconSize, this.iconSize)
    }


    let tw = f.getWidth(txt)
    let th = f.getHeight(txt)

    this.width = tw 
    this.height = th 

    let tx = -ox + this.width/2 - tw/2
    let ty = -oy + this.height/2 - th/2 + 1

    if (this.alignText == 'left') {
        tx = -ox
    }

    if (this.alignText == 'right') {
        tx = this.width - ox - tw 
    }
    lg.print(txt, tx, ty)
  }

}