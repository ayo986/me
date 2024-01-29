class Slider extends moveClip{
    origin = CENTER_CENTER
    lineColor = [0, 255, 0]
    lineWidth = 2
    minValue = 0
    maxValue = 200
    value = 100
    lvalue = null
    minPos = 0
    maxPOs = 100
    pos = 50

    bg = [80]
    fg = [255]
    
    hasBg = false
    showText = true
    type = 2
    fontSize = 10
    spaceX = 30
    showValue = false
    corner = 4

    onChange(){

    }
    constructor(x, y, w){
        super(x, y, w||130, 50)
    }

    draw(){
        let ox = this.origin.x * this.width 
        let oy = this.origin.y * this.height 
        this.pos = constrain(this.pos, this.minPos, this.maxPOs)
        let w = map(this.pos, this.minPos, this.maxPOs, 0, this.width-this.spaceX)

        this.value = map(this.pos, this.minPos, this.maxPOs, this.minValue, this.maxValue)
        this.value  = Math.floor(this.value)

        if (this.value != this.lvalue) {
            this.lvalue = this.value
            this.onChange(this.value)
        }
        if (this.type == 1) {

        }else{
 
            lg.setColor(rgba(this.bg))
            lg.rectangle('fill', -ox + this.spaceX/2, -oy + this.height/2 - 2, this.width-this.spaceX, 4, 2)
            lg.setColor(rgba(this.lineColor))
            lg.rectangle('fill', -ox+this.spaceX/2, -oy + this.height/2 - 2, w, 4, 2)
            let c = rgba(this.lineColor)
            c[3] = 200
            lg.setColor(rgba(c))
            lg.circle('fill', -ox + w + this.spaceX/2, -oy + this.height/2, this.height/3.3)
        }

        if (this.showText){
            let txt = Math.floor(this.showValue ?this.value:this.pos)
            lg.setColor(rgba(this.fg))
            lg.setFont(this.textFont)
            let tw = this.textFont.getWidth(txt)
            let th = this.textFont.getHeight(txt)
            lg.print(
                txt,
                 -ox + w + this.spaceX/2 - tw/2, 
                 -oy + this.height/2 - th/2
            )
        }
        
    }

    mousemoved(x, y, dx, dy){
        if (this.clicked) {
            
            let n = x - (this.x - this.origin.x * this.width) 
            this.pos = map(n, this.spaceX/2, this.width - this.spaceX/2, this.minPos, this.maxPOs)
        }
    }

    mousepressed(x, y, b){
        if (b == 1) {
            let n = x - (this.x - this.origin.x * this.width) 
            this.pos = map(n, this.spaceX/2, this.width - this.spaceX/2, this.minPos, this.maxPOs)
        }
    }

}