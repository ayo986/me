class Progress extends moveClip{
    origin = CENTER_CENTER
    lineColor = [0, 255, 0]
    lineWidth = 2
    minValue = 0
    maxValue = 100
    value = 50
    minPos = 0
    maxPos = 100
    pos = 50
    bg = [80]
    fg = [255]
    hasBg = false
    showText = true
    showValue = false
    type = 2

    constructor(x, y, w, h){
        super(x, y, w, h)
    }
    onChange(){

    }
    draw(){
        let ox = this.origin.x * this.width
        let oy = this.origin.y * this.height
        this.pos = constrain(this.pos, this.minPos, this.maxPos)
        this.pos = floor(this.pos)

        this.value = map(this.pos, this.minPos, this.maxPos, this.minValue, this.maxValue)
        this.value = floor(this.value)

        if (this.value != this.lValue) {
            this.lValue = this.value
            this.onChange(this.value)
        }

        strokeWeight(this.lineWidth)
        if (this.type == 1) {
            noFill()
            stroke(this.bg)
            arc(0, 0, this.width - 10, this.height - 10, 0, PI*2, OPEN)
            stroke(this.lineColor)
            let a = map(this.pos, this.minPos, this.maxPos, 0, PI*2)
            arc(0, 0, this.width - 10, this.height - 10, 0, a, OPEN)
        }else{
            rectMode('left')
            noStroke()
            fill(this.bg)
            rect(-ox, -oy + this.height/2 - 2, this.width, this.lineWidth, 2, 2, 2, 2)
            fill(this.lineColor)
            let w = map(this.pos, this.minPos, this.maxPos, 0, this.width)
            rect(-ox, -oy + this.height/2 - 2, w, this.lineWidth, 2, 2, 2, 2)
        }

        // stroke(this.fg)
        if (this.showText){
            noStroke()
            fill(this.fg)
            textAlign('center', 'center')
            textFont(this.font)
            textSize(this.fontSize)
            text((this.showValue?this.value:this.pos) + '', -ox + this.width/2, -oy + this.height/2)
        }
        
    }

}