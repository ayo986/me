class menuWheel extends moveClip{
    origin = CENTER_CENTER
    width = 130
    height = 130
    shape = 2
    dump = 0.98
    accX = 0
    accY = 0
    index = 1
    lastIndex = -1
    space = 2
    offset = 0
    initAngle = 0
    borderSize = 16
    imageAlpha = 255
    lineColor = style?style.lineColor : [50, 100, 255, 150]
    imageColor = [255]
    showLine = true
    distanceofmove = 4


    constructor(...args){
        super()
        this.items = []
        this.set(...args)
        this.angle = 0
        this.moving = false
        this.index = 1
        this.offset = 0
    }

    onChange(){

    }
    draw(){

        let [ew, eh] = this.Size()
        let eMax = max(ew, eh)
        this.width = eMax
        this.height = this.width 
        let [ox, oy] =this.Origin()
        let [w, h] = this.Size()

        noStroke()
        fill(this.bg)
        imageMode(CENTER)
        textAlign(CENTER, CENTER)
        let n = this.items.length
        let angle_item = (360/n)
        
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

        let ai = radians(angle_item)
        let r = max(w, h) -  this.borderSize

        let itemSize = (TWO_PI * r/2)/n


        for (var i = 0; i < n; i++) {
            let a = -(i*ai + ai/2) 
            let item = this.items[i]
            let im = item.image
            
            push()

            rotate(a)
            fill(this.bg)
            arc(0, 0, r, r, radians(this.space/2), ai - radians(this.space/2))
            drawingContext.save()
            drawingContext.clip()
            fill(item.bg || this.bg)
            arc(0, 0, r, r, 0, ai)
            let iw = r/2

            let aa = -a - radians(this.initAngle)
            rotate(aa)
            if (this.image) {
                let c = color(this.imageColor || 255)
                c.setAlpha(this.imageAlpha || 255)
                tint(c)
                image(this.image, 0, 0, w, h)
            }
            rotate(-aa)



            fill(item.fg || this.fg)
            textFont(this.font)
            textSize(this.fontSize)
            rotate(ai/2)
            if (im) {
                let c = color(item.imageColor || 255)
                tint(c)
                let pw = w/2
                image(im, pw/2, 0, pw, itemSize*0.9)
            }
            let txt = item.text || ''

            push()
            translate(iw * 0.8 - textWidth(txt)/2, 0)
            rotate(0)
            text(txt, 0, 0)
            pop()
            drawingContext.restore()

            pop()


            fill(this.bg)
            circle(-ox+w/2, -oy + h/2, iw * 0.3)
        }

        ////////
        
        let b = this.offset 
        let index = floor((-this.offset + angle_item + angle_item/2)/angle_item)
        let m = mod(-index + 2, n)
        this.index = m == 0 ? n:m
        // print(this.index)
        if (this.accX == 0 && this.accY == 0) {
            this.moving = false
            if (this.lastIndex != this.index) {
                this.lastIndex = this.index
                this.onChange(this.index)
            }
        }
        if (!this.moving) {
            let target = -(index-1)*angle_item
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
            let inc = this.friction
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