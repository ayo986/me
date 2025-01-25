class sliderModern extends moveClip{
    origin = CENTER_CENTER
    width = 130
    height = 40
    lineColor = style.lineColor
    value = 30
    npos = 0
    hasBg = false
    range = vec2(0, 100)
    offset = 0
    lineWidth = 16
    text = ''
    ext = '%'
    // clip = false
    showText = true
    showCircle = true
    progressMode = false
    // clip = false
    onChange = function(){}

    constructor(...args){
        super()
        this.set(...args)
        this.done()
    }

    setValue(n){
        this.value = n
        this.done()
    }

    done(){
        let [w, h] = this.Size()
        let [ox, oy] =this.Origin()
        let r = this.lineWidth
        this.npos = map(this.value, this.range.x, this.range.y, -ox+r/2, -ox + w-r/2)
        this.offset = map(this.value, this.range.x, this.range.y, 0, 359)
    }

    drect(){
        rectMode(CORNER)
        this.height = this.lineWidth
        let [w, h] = this.Size()
        let [ox, oy] =this.Origin()
        let r = this.lineWidth
        
        this.corner = [h/2]
        noStroke()

        this.npos = constrain(this.npos, -ox + r/2, -ox + w - r/2)


        fill(this.bg)
        rect(-ox, -oy + h/2 - r/2, w, r)
        // stroke(this.bg)
        // strokeWeight(this.lineWidth)
        
        // line(-ox, -oy + h/2, -ox + w, -oy + h/2)


        let c = color(this.lineColor)
        if (!this.progressMode) {
            c.setAlpha(128)
        }
        
        fill(c)
        // let e = map(this.npos, -ox, -ox + w, 0, w)
        // line(-ox, -oy + h/2, -ox + e, -oy + h/2)
        rect(-ox, -oy + h/2 - r/2, this.npos + ox, r)
        c.setAlpha(255)

        if (this.showCircle) {
            fill(c)
            circle(this.npos, -oy + h/2, r)
        }


        this.value = map(this.npos, -ox+r/2, -ox + w - r/2, this.range.x, this.range.y)
        let v = round(this.value) + '' + this.ext
        let tw = textWidth(v)
        noStroke()
        if (this.showText) {
            fill(this.fg)
            text(v, -ox + w/2, -oy + h/2) 
        }
    }

    dcir(){
        let [ow, oh] = this.Size()
        let r = max(ow, oh)/2
        this.width = r *2
        this.height = this.width
        

        let [w, h] = this.Size()
        let [ox, oy] =this.Origin()
        this.corner = []
        this.hasBg = false

        strokeWeight(this.lineWidth)
        stroke(this.bg)
        noFill()
        arc(-ox + w/2, -oy+h/2, w - this.lineWidth, h - this.lineWidth, 0, PI*2)

        strokeWeight(this.lineWidth/3)
        let c = color(this.lineColor)
        c.setAlpha(160)
        stroke(c)
        let aa = map(this.value, this.range.x, this.range.y, 0, PI*2)
        arc(-ox + w/2, -oy+h/2, w - this.lineWidth, h - this.lineWidth, 0, aa)

        c.setAlpha(255)
        noStroke()
        fill(c)
        let xc = -ox + w/2 + (r - this.lineWidth/2) * cos(aa) 
        let yc = -oy + h/2 + (r - this.lineWidth/2) * sin(aa)

        if (this.showCircle) {
            circle(xc, yc, this.lineWidth)
        }

        this.value = map(this.offset, 0, 359, this.range.x, this.range.y)
        let v = round(this.value) + '' + this.ext
        if (this.showText) {
            fill(this.fg)
            text(v, 0, 0)
        }
    }

    draw(){
        textAlign(CENTER, CENTER)
        imageMode(CENTER)
        textFont(this.font)
        textSize(this.fontSize)
        rectMode(CORNER)
        if (this.shape == 1) {
            this.drect()
        }
        if (this.shape == 2) {
            this.dcir()
        } 
    }

    mousemoved(x, y, dx, dy){

        if (this.shape == 1) {
            this.npos = this.xmouse
        }

        if (this.shape == 2) {
            let e = atan2(this.ymouse, this.xmouse)
            e = degrees(e)
            e = (e + 360)%360
            e = constrain(round(e), 0, 359)
            let diff = (e - (this.offset + 360)%360) 
            if (abs(diff) > 30) {
                diff = 0
            }
            this.offset += diff
            this.offset = round(this.offset)
            this.offset = constrain((this.offset), 0, 359)
            this.value = map(this.offset, 0, 359, this.range.x, this.range.y)
        }

        this.onChange(this.value)
    }
    
    mousepressed(x, y, b){
        if (b == 1) {
            this.npos = this.xmouse
        }
    }
}