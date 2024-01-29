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
        this.value  = floor(this.value)

        if (this.value != this.lvalue) {
            this.lvalue = this.value
            this.onChange(this.value)
        }
        if (this.type == 1) {

        }else{
            noStroke()
            fill(this.lineColor)
            
            rectMode('left')
            fill(this.bg)
            rect(-ox + this.spaceX/2, -oy + this.height/2 - 2, this.width-this.spaceX, 4, 2, 2, 2, 2)
            fill(this.lineColor)
            rect(-ox+this.spaceX/2, -oy + this.height/2 - 2, w, 4, 2, 2, 2, 2)
            //rectMode('center')
            //rect( -ox + w + this.spaceX/2, -oy + this.height/2, 4, 20, 2)
            let c = color(this.lineColor)
            c.setAlpha(200)
            fill(c)
            ellipse( -ox + w + this.spaceX/2, -oy + this.height/2, this.height/3, this.height/3)
        }

        // stroke(this.fg)
        if (this.showText){
            noStroke()
            fill(this.fg)
            textAlign('center', 'center')
            textFont(this.font)
            textSize(this.fontSize)
            text(floor(this.showValue ?this.value:this.pos), -ox + w + this.spaceX/2, -oy + this.height/2 - this.fontSize*1.5)
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