class radioButton extends moveClip{
    origin = CENTER_CENTER
    hasBg = false
    state = false
    bg = [30]
    color = style ? style.selectedColor : [50, 100, 150]

    lineWidth = 1
    alpha = 0
    target = 0
    constructor(...args){
        super()
        this.set(...args)
        this.width = 20
        this.height = 20
        if(this.group){
            this.group.push(this)
        }
        this.target = this.state?255:0
    }
    onChange(){

    }

    draw(){
        let w = this.width
        let h = this.height
        let ow = w - this.lineWidth - 2
        let oh = h  -this.lineWidth - 2

        let r = min(ow, oh)/2 

        let ox = this.origin.x * w 
        let oy = this.origin.y * h 

        let dir = this.origin.x == 1?-1:1
        let rx = -ox + w/2
        let ry = -oy + h/2

        strokeWeight(this.lineWidth)
        noFill()
        stroke(this.color)

        if (this.shape == 2){
            ellipse(rx , ry, r*2, r*2)
            noStroke()
            let c = color(this.color)
            this.alpha = this.alpha + (this.target - this.alpha) * 0.2
            c.setAlpha(this.alpha)
            fill(c)
            ellipse(rx, ry, r, r) 
        }else{
            rectMode(CENTER)
            rect(rx, ry, ow, oh)
            noStroke()
            let c = color(this.color)
            this.alpha = this.alpha + (this.target - this.alpha) * 0.2
            c.setAlpha(this.alpha)
            fill(c)
            rect(rx, ry, r, r) 
        }
        
    }

    mousepressed(x, y, b){
        if (b == 1) {
            if (this.group) {
                this.group.forEach(e => {
                    e.state = false
                    e.alpha = 0
                    e.target = 0
                });
                this.state =  true
                this.target = 255
            }else{
                this.state = !this.state
                this.target = this.state?255:0
            }            
            this.onChange(this.state)
        }
    }
}
