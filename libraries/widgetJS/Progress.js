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
    corner = 2

    constructor(x, y, w, h){
        super(x, y, w, h)
    }

    onChange(){

    }

    draw(){
        let ox = this.origin.x * this.width
        let oy = this.origin.y * this.height
        this.pos = constrain(this.pos, this.minPos, this.maxPos)
        this.pos = Math.floor(this.pos)

        this.value = map(this.pos, this.minPos, this.maxPos, this.minValue, this.maxValue)
        this.value = Math.floor(this.value)

        if (this.value != this.lValue) {
            this.lValue = this.value
            this.onChange(this.value)
        }

        lg.setLineWidth(this.lineWidth)
        if (this.type == 1) {
            let r = 20// Math.min(this.width, this.height) - 10;
            lg.setColor(rgba(this.bg))
            lg.arc('line', 0, 0, r, 0, Math.PI*2)
            //
            let a = map(this.pos, this.minPos, this.maxPos, 0, Math.PI*2)
            lg.setColor(rgba(this.lineColor))
            lg.arc('fill', 0, 0, r, 0, a)
        }else{
            lg.setColor(rgba(this.bg))
            lg.rectangle('fill', -ox, -oy + this.height/2 - 2, this.width, this.lineWidth, 2)
            lg.setColor(rgba(this.lineColor))
            let w = map(this.pos, this.minPos, this.maxPos, 0, this.width)
            lg.rectangle('fill', -ox, -oy + this.height/2 - 2, w, this.lineWidth, 2)
        }


        if (this.showText){
            let txt = (this.showValue?this.value:this.pos) + ''
            let f = this.textFont
            lg.setColor(rgba(this.fg))
            lg.setFont(f)
            let tw = f.getWidth(txt)
            let th = f.getHeight(txt)
            lg.print(txt, -ox + this.width/2 - tw/2, -oy + this.height/2 - th/2)
        }
        
    }

}