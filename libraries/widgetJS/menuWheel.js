class menuWheel extends moveClip{
    dump = 0.98
    accX = 0
    accY = 0
    bg = [100]
    fg = [255]
    index = 1
    lastIndex = -1
    space = 1
    offset = 0
    initAngle = 0
    lineColor = [50, 100, 255, 150]
    imageColor = [255]
    showLine = true
    distanceofmove = 4


    constructor(x, y, r, items){
        let w = r*2
        super(x, y, w, w)
        this.shape = 2
        this.origin = CENTER_CENTER
        this.items = items
        this.angle = 0
        this.moving = false
        this.index = 1
        this.offset = 0
        this.radius = r
        this.clip = true
    }

    onChange(){

    }
    draw(){
        let f = this.textFont
        lg.setFont(f)

        lg.setColor(rgba(this.bg))
        let n = this.items.length
        let angle_item = (360/n)
        if (n < 4) {
            return
        }
        this.offset += this.accX 
        this.offset += this.accY
        this.accX *= this.dump
        this.accY *= this.dump
        if (Math.abs(this.accX) <= 0.5) {
            this.accX = 0
        }
        if (Math.abs(this.accY) <= 0.5) {
            this.accY = 0
        }

        let r = this.width/2
        let iw =( Math.PI * r)/ n
        r = r -iw/2
        for (var i = 0; i < n; i++) {
            let a = i*angle_item  + (this.offset)
            let x = r * Math.cosdeg(a) 
            let y = r * Math.sindeg(a) 

            let item = this.items[i]
            let im = item.image
            // tint(item.imageColor || this.imageColor)
            //drawingContext.save()
            //arc(0, 0, r, r, s + radians(this.space/2), s + a - radians(this.space/2))
            //drawingContext.clip()
            
            lg.setColor(rgba(item.bg || this.bg))
            //arc(0, 0, r, r, s, s + a)
            lg.push()
            lg.translate(x, y)
            lg.rotate(Math.rad(a))
            if (im) {
                drawImage(im, 0, 0, iw, iw)    
            }
            lg.setColor(rgba(item.fg || this.fg))
            // rotate(a/2)
            let txt = item.text || ''
            lg.print(txt, - f.getWidth(txt)/2, -f.getHeight(txt)/2)
            lg.pop()
            //drawingContext.restore()
        }

        ////////
        
        let b = this.offset 
        let index = Math.floor((this.offset + angle_item)/angle_item)
        let m = mod(-index+2, n)
        this.index = m == 0 ? n:m

        if (this.accX == 0 && this.accY == 0) {
            this.moving = false
            if (this.lastIndex != this.index) {
                this.lastIndex = this.index
                this.onChange(this.index)
            }
        }
        if (!this.moving) {
            let target = (index-1)*angle_item
            this.offset += (target- this.offset)*0.1
        }

        // this.angle = this.initAngle + this.offset
    }

    drawafter(){
        if (!this.showLine) {
            return
        }
        lg.setColor(rgba(this.lineColor))
        lg.push()
        //lg.rotate(radians(-this.angle))
        lg.setLineWidth(8)
        lg.line(this.width/2 - 30, 0, this.width/2, 0)
        lg.pop()
    }
    mousemoved(x, y, dx, dy){
        let v = Math.sqrt(dx*dx + dy*dy)
        let is = v > this.distanceofmove
        if (this.clicked && is) {
            this.moving = true
            let maxv = Math.sqrt(this.width*this.height)
            let inc = map(maxv, 0, 100, 0, 0.4)
            this.accX = -dx * inc
            this.accY = -dy * inc
        }
    }

    mousepressed(x, y, b){
        if (b == 1) {
            this.accX = 0
            this.accY = 0
            this.moving = false
        }
    }
}