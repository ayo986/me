class Text extends moveClip{
    text = "myText"
    constructor(text, x, y){
      super(x, y, 130, 60)
      this.text = text
    }

    draw(){
      let alpha = (this.opacity/100) * 255
      noStroke()
      textAlign('center', 'center')
      textFont(this.font)
      textSize(this.fontSize)

      let [originX, originY] = [this.origin.x, this.origin.y]
      let oX = this.width * originX
      let oY = this.height * originY
      
      let c = color(this.fg)
      c.setAlpha(alpha)
      fill(c)
      text(this.text, -oX + this.width/2, -oY + this.height/2)
    }
}