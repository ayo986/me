class RadioButton extends moveClip{
    origin = TOP_LEFT
    hasBg = false
    status = false
    bg = [0, 255, 0]
    type = 1
    lineWidth = 1
    alpha = 0
    target = 0
    clip = false
    radius = 10

    constructor(x, y, group){
        super(x, y, 20, 20)
        this.width = this.radius*2
        this.height = this.radius*2
        this.group = group
        if(this.group){
            group.push(this)
        }

    }
    onChange(){

    }

    draw(){
        this.width = this.radius*2
        this.height = this.radius*2
        let w = this.width
        let h = this.height
        let ow = w - this.lineWidth - 2
        let oh = h - this.lineWidth - 2

        let r = Math.min(ow, oh)/2 

        let ox = this.origin.x * w 
        let oy = this.origin.y * h 

        let dir = this.origin.x == 1?-1:1
        let rx = -ox + w/2
        let ry = -oy + h/2

        lg.setLineWidth(this.lineWidth)
        lg.setColor(rgba(this.bg))

        if (this.type == 1){
            lg.circle('line', rx , ry, r*2)
            let c = rgba(this.bg)
            this.alpha = this.alpha + (this.target - this.alpha) * 0.2
            c[3] = this.alpha
            lg.setColor(rgba(c))
            lg.circle('fill', rx, ry, r) 
        }else{
            lg.rectangle('line', rx-ow/2, ry-oh/2, ow, oh)
            let c = rgba(this.bg)
            this.alpha = this.alpha + (this.target - this.alpha) * 0.2
            c[3] = this.alpha
            lg.setColor(c)
            lg.rectangle('fill', rx-r/2, ry-r/2, r, r) 
        }
        
    }

    mousepressed(x, y, b){
        if (b == 1) {
            if (this.group) {
                this.group.forEach((e) => {
                    e.status = false
                    e.alpha = 0
                    e.target = 0
                });
                this.status = true
                this.target =255
            }else{
                this.status = !this.status
                this.target = this.status?255:0
            }            
            this.onChange(this.status)
        }
    }
}
