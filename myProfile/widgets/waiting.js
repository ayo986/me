class Waiting extends moveClip{
    width = 80
    height = 80
    lineWidth = 1
    index = 0
    hasBg = false
    speed = 6
    total = 12
    fg = style? style.lineColor:this.fg
    constructor(...args){
        super()
        this.set(...args)
    }

    draw(){
        textAlign(CENTER, CENTER)
        imageMode(CENTER)
        textFont(this.font)
        textSize(this.fontSize)
        strokeWeight(this.lineWidth)
        let [ox, oy] =this.Origin()
        let [w, h] = this.Size()
        let radius = min(w, h)/2
        let ai = 360/this.total
        noFill()
        let n = 0
        for (let i = 0; i < 360; i+= ai) {
            stroke(this.bg)
            push()
            translate(-ox+w/2, -oy + h/2)
            rotate(radians(i))

            if (n == this.index) {
                stroke(this.fg)
            }

            line(radius - 15, 0, radius - 5, 0)
            pop()
            n++
        }

        if (this.nframe%this.speed == 0) {
            this.index++
            if (this.index > this.total - 1) {
                this.index = 0
            }
        }
        
    }
}