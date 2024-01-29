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
        let f = this.textFont
        lg.setFont(f)
        lg.setLineWidth(this.lineWidth)
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

        let c = 'hsl(' + 360 + ', 100%, 50%)'
        lg.setColor(rgba(c))
        lg.line(lx, ly, lx, -oy + HH)

        lg.setColor(rgba(this.bottomColor))
        lg.line(lx, ly, lx + lineXLength, ly)

        let ncount = this.points.length
        let itemWidth = (lineXLength/ncount)

        //rang 
        lg.setColor(rgba(this.leftTextColor))
        for (let i = this.min; i <= this.max; i += step) {
            let v = Math.round(i)
            let t = v 
            let py = map(v, this.min, this.max, -oy + this.height - HH, -oy + HH)
            let tw = f.getWidth(t) 
            let th = f.getHeight(t)
            lg.print(t, lx - WW/2 - tw/2, py - th/2) 
        }


        if (this.mode == 'rect') {
            lg.setColor(rgba(this.lineColor))
            for (let i = 0; i < ncount; i++) {
                let e = this.points[i];
                let txt = e.text
                let n = e.value
                let v = map(n, this.min, this.max, 0,  lineYLength)

                let px = lx + (i)* itemWidth + this.lineWidth/2
                let py = map(n, this.min, this.max, -oy + this.height - HH, -oy + HH)

                let nc = Math.floor(map(n, this.min, this.max, 0, 360))
                let c = 'hsl(' + nc + ', 100%, 50%)'
                lg.setColor(c)
                lg.rectangle('fill', px, py - this.lineWidth/2, itemWidth, ly - py)
                lg.setColor(rgba(this.textColor))
                let perc = map(n, this.min, this.max, 0, 100)
                let per = Math.round(perc) + '%'
                let tw = f.getWidth(per) 
                let th = f.getHeight(per)
                lg.push()
                lg.translate(px + itemWidth/2, py + v/2)
                lg.rotate(Math.PI/2)
                lg.print(per, -tw/2, -th/2)
                lg.pop()
            }
        }


        // drawLine
        lg.setColor(rgba(this.lineColor))
        if (this.showLine) {
            let path = []
            for (let i = 0; i < ncount; i++) {
                let e = this.points[i];
                let txt = e.text
                let n = e.value
                let px = lx + (i)* itemWidth 
                let py = map(n, this.min, this.max, -oy + this.height - HH, -oy + HH)
                path.push(px)
                path.push(py)
            }
            lg.polygon2('line', path, false)
        }


        //point and line and dot
        for (let i = 0; i < ncount; i++) {
            let e = this.points[i];
            let txt = e.text
            let n = e.value
            let px = lx + (i)* itemWidth 
            let py = map(n, this.min, this.max, -oy + this.height - HH, -oy + HH)
            lg.setColor(this.bottomTextColor)
            let nc = Math.floor(map(n, this.min, this.max, 0, 360))
            let c = 'hsl(' + nc + ', 100%, 50%)'
            lg.setColor(c)
            let tw = f.getWidth(txt) 
            let th = f.getHeight(txt)
            lg.print(txt, this.mode == 'none'?px - tw/2:px -tw/2 +itemWidth/2 + this.lineWidth, ly + th/2)
            if (this.showLine) {
                let nc = Math.floor(map(n, this.min, this.max, 0, 360))
                let c = 'hsl(' + nc + ', 100%, 50%)'
                lg.setColor(c)
                lg.circle('fill', px, py, this.dotRadius)  
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
                if (Math.sqrt(dx*dx + dy*dy) <= this.dotRadius+4) {
                    let rt = txt + ':' + n
                    let ry =  this.mY < -oy + this.fontSize? py + this.fontSize: py - this.fontSize*2
                    lg.setColor(rgba(this.bgInfo)) 
                    let tw = f.getWidth(rt) 
                    let th = f.getHeight(rt)
                    let ww = tw * 2 
                    let hh = th * 2 
                    lg.rectangle('fill', px - ww/2, ry - hh/2, ww, hh, 5)
                    lg.setColor(this.lineColor)
                    lg.print(rt, px - tw/2, ry - th / 2)
                }
            }
        }


    }
}

