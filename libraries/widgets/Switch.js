class Switch extends moveClip{
    origin = TOP_LEFT
    hasBg = true
    status = false
    color = [0, 255, 0]
    bg = [50]
    type = 1
    lineWidth = 1
    alpha = 0
    target = 0
    corner = [16]
    constructor(x, y, group){
        super(x, y, 32, 16)
        this.group = group
        if(this.group){
            group.push(this)
        }
    }
    onChange(){

    }

    draw(){
        let w = this.width
        let h = this.height
        let ow = w - this.lineWidth - 2
        let oh = h  -this.lineWidth - 2

        let r = min(ow, oh)/2 

        this.da = this.da || r
        let ox = this.origin.x * w 
        let oy = this.origin.y * h 

        let dir = this.origin.x == 1?-1:1
        let rx = -ox + w/2
        let ry = -oy + h/2

        noStroke()
        strokeWeight(this.lineWidth)

        


        let c = color(100)
        let targetX = this.width - r
        let target = 0
        if (this.status) {
            targetX = r
            c = color(this.color)
            target = 255
        }
        this.da += (targetX - this.da) * 0.5
        this.alpha = this.alpha + (target - this.alpha) * 0.2

        c.setAlpha(this.alpha)
        rectMode('center')
        fill(c)
        rect(-ox + this.da + this.width/2 - r/2, ry, this.width, this.height)
        fill(255)
        ellipse(-ox + this.da, ry, r*2, r*2)        
    }

    mousepressed(x, y, b){
        let o = this
        if (b == 1) {
            this.enabled = false
            if (this.group) {
                this.group.forEach(e => {
                    e.status = false
                });
                this.status = true
            }else{
                this.status = !this.status
            }            
            this.onChange(this.status)

            setTimeout(function(){
                o.enabled = true
            }, 60)
        }
    }
}
