class lineGraph extends moveClip{
    mode = 'rect'
    bg = [30]
    fontSize = 10
    origin = CENTER_CENTER
    lineWidth = 2
    lineColor = [255]
    textColor = [0]
    dotRadius = 5
    leftColor = [255, 100, 0]
    leftTextColor = [255]
    bottomColor = [50, 100, 255]
    bottomTextColor = [180]
    mX = 0
    mY = 0
    bgInfo = [0]
    showLine = true
    nRow = 5

    constructor(x,y, w, h, points, min, max){
        super(x, y, w, h)
        this.setPoints(points)
        this.setRange(min || 0, max || 100)
    }

    setRange(min, max){
        this.min = min 
        this.max = max
    }

    setPoints(points){
        this.points = points || []
    }

    draw(){

        noStroke()
        noFill()

        textAlign('center', 'top')
        textFont('arial')
        textSize(this.fontSize)
        strokeWeight(this.lineWidth)
        let ox = this.origin.x * this.width
        let oy = this.origin.y * this.height

        if (this.isOver()) {
            this.mX = mouseX - this.x
            this.mY = mouseY - this.y 
            
        }
        let step = this.max / this.nRow
        // this.spaceX = 40
        // this.spaceY = 40
        
        
        let WW = 30 - this.lineWidth
        let HH = 30 - this.lineWidth
        let lineXLength = this.width  - WW 
        let lineYLength = this.height - HH 

        let lx = -ox + WW
        let ly = -oy + lineYLength 


        stroke(this.leftColor)
        line(lx, ly, lx, -oy + HH)

        stroke(this.bottomColor)
        line(lx, ly, lx + lineXLength, ly)
        
        let ncount = this.points.length
        let itemWidth = (lineXLength/ncount)

        //rang 
        noStroke()
        fill(this.leftTextColor)
        
        for (let i = this.min; i <= this.max; i += step) {
            let v = round(i)
            let t = v 
            let py = map(v, this.min, this.max, -oy + this.height - HH, -oy + HH)
            text(t, lx - WW/2, py) 
        }


        if (this.mode == 'rect') {
            rectMode('left')
            noStroke()
            fill(this.lineColor)
            for (let i = 0; i < ncount; i++) {
                let e = this.points[i];
                let txt = e.text
                let n = e.value
                let v = map(n, this.min, this.max, 0,  lineYLength)

                let px = lx + (i)* itemWidth + this.lineWidth/2
                let py = map(n, this.min, this.max, -oy + this.height - HH, -oy + HH)

                let nc = floor(map(n, this.min, this.max, 0, 360))
                let c = color('hsl(' + nc + ', 100%, 50%)')
                c.setAlpha(148)
                fill(c)
                rect(px, py - this.lineWidth/2, itemWidth, ly - py)
                fill(this.textColor)
                textAlign('center', 'center')
                let perc = map(n, this.min, this.max, 0, 100)
                let per = round(perc) + '%'
                push()
                translate(px + itemWidth/2, py + v/2)
                rotate(PI/2)
                text(per, 0, 0)
                pop()
            }
        }


        // drawLine
        noStroke()
        noFill()
        stroke(this.lineColor)
        if (this.showLine) {
            beginShape()
            for (let i = 0; i < ncount; i++) {
                let e = this.points[i];
                let txt = e.text
                let n = e.value
                let px = lx + (i)* itemWidth 
                let py = map(n, this.min, this.max, -oy + this.height - HH, -oy + HH)
                vertex(px, py)
            }
            endShape()
        }


        //point and line and dot
        for (let i = 0; i < ncount; i++) {
            let e = this.points[i];
            let txt = e.text
            let n = e.value
            noStroke()
            noFill()
            let px = lx + (i)* itemWidth 
            let py = map(n, this.min, this.max, -oy + this.height - HH, -oy + HH)
            textAlign('center', 'top')
            fill(this.bottomTextColor)

            let nc = floor(map(n, this.min, this.max, 0, 360))
            let c = color('hsl(' + nc + ', 100%, 50%)')
            fill(c)

            text(txt, this.mode == 'none'?px:px +itemWidth/2 + this.lineWidth, ly + 10)
            noStroke()
            if (this.showLine) {
                let nc = floor(map(n, this.min, this.max, 0, 360))
                let c = color('hsl(' + nc + ', 100%, 50%)')
                fill(c)
                ellipse(px, py, this.dotRadius*2, this.dotRadius*2)  
            }

        }
        //show info
        if (this.showLine) {
            for (let i = 0; i < ncount; i++) {
                let e = this.points[i];
                let txt = e.text
                let n = e.value
                let px = lx + (i)* itemWidth 
                let py = map(n, this.min, this.max, -oy + this.height - HH, -oy + HH)
    
                let dx = this.mX - px 
                let dy = this.mY - py
                if (sqrt(dx*dx + dy*dy) <= this.dotRadius+4) {
                    let rt = txt + ':' + n
                    let ry =  this.mY < -oy + this.fontSize? py + this.fontSize: py - this.fontSize*2
                    rectMode('center')
                    fill(this.bgInfo)
                    rect(px, ry, textWidth(rt) + 20, this.fontSize*3, 5)
                    fill(this.lineColor)
                    textAlign('center', 'center')
                    text(rt, px, ry)
                }
            }
        }


    }
}

