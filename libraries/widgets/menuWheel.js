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
        this.clip = true
    }

    onChange(){

    }
    draw(){
        noStroke()
        fill(this.bg)
        imageMode('center', 'center')
        textAlign('center', 'center')
        let n = this.items.length
        let angle_item = (360/n)

        if (n < 4) {
            return
        }
        
        this.offset += this.accX 
        this.offset += this.accY
        this.accX *= this.dump
        this.accY *= this.dump
        if (abs(this.accX) <= 0.5) {
            this.accX = 0
        }
        if (abs(this.accY) <= 0.5) {
            this.accY = 0
        }

        let a = radians(angle_item)
        let r = this.width- 24
        for (var i = 0; i < n; i++) {
            let s = i*a - a/2
            let item = this.items[i]
            let im = item.image
            tint(item.imageColor || this.imageColor)
            drawingContext.save()
            arc(0, 0, r, r, s + radians(this.space/2), s + a - radians(this.space/2))
            drawingContext.clip()
            let iw = r/2
            fill(item.bg || this.bg)
            arc(0, 0, r, r, s, s + a)
            push()
            rotate(s)
            if (im) {
                image(im, iw/2, iw/2, iw, iw)    
            }
            fill(item.fg || this.fg)
            textFont(this.font)
            textSize(this.fontSize)
            rotate(a/2)
            let txt = item.text || ''
            text(txt, iw - textWidth(txt)/2 - 8, 0)
            pop()
            drawingContext.restore()
        }

        ////////
        
        let b = this.offset 
        let index = floor((this.offset + angle_item)/angle_item)
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

        this.angle = this.initAngle + this.offset
    }

    drawbefor(){
        if (!this.showLine) {
            return
        }
        push()
        rotate(radians(-this.angle + this.initAngle))
        strokeWeight(8)
        stroke(this.lineColor)
        line(this.width/2 - 30, 0, this.width/2, 0)
        pop()
    }
    mousemoved(x, y, dx, dy){
        let v = sqrt(dx*dx + dy*dy)
        let is = v > this.distanceofmove
        if (this.clicked && is) {
            this.moving = true
            let maxv = sqrt(this.width*this.height)
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