
class circleGraph extends moveClip{
    bg = [30]
    fg = [200]
    origin = CENTER_CENTER
    textColor = [0]
    showText = true
    showValue = true
    radius = 50
    fontSize = 10
    align = 'right'
    constructor(x, y, w, h, items, _min, _max){
        super(x, y, w, h)
        this.shape = 1
        this.items = items || []
        this.min = _min || 0
        this.max = _max || 100
        this.radius = min(w, h)/2
        let sumValue = 0
        let total = this.items.length
        for (let i = 0; i < total; i++) {
            const p = this.items[i];
            sumValue += p.value
        }

        this.sumValue = sumValue
    }

    setRange(min, max){
        this.min = min 
        this.max = max
    }

    setPoints(points){
        this.points = points || []
    }
    draw(){
        textFont(this.font)
        textSize(this.fontSize)
        textAlign('center', 'center')

        let ox = this.origin.x * this.width
        let oy = this.origin.y * this.height

        let total = this.items.length
        let sa = 0
        let r = this.radius*2
        let items = []
        push()
        let dir = 0
        if (this.align == 'left') {
            dir = - 1
        }
        if (this.align == 'right') {
            dir = 1
        }
        translate(-ox + this.width/2 + dir  * (this.width/2 - this.radius) , -oy + this.height/2)
        for (let i = 0; i < total; i++) {
            const p = this.items[i];
            let a = map(p.value, this.min, this.sumValue, 0, 360)
            let nc = map(p.value, this.min, this.max, 0, 360)
            let ea = sa + a
            let hsla = 'hsl(' + floor(nc) + ', 100%, 50%)'
            let c = color(hsla)
            fill(c)
            arc(0, 0, r, r, radians(sa), radians(ea))

            let rr = r/3
            let x = rr * cosdeg(ea - (ea - sa) /2)
            let y = rr * sindeg(ea - (ea - sa) /2)
            let vv = map(p.value, this.min, this.max, 0, 100)
            let txt = round(vv) + '%'
            fill(this.textColor)
            push()
            translate(x, y)
            rotate(radians(ea - (ea - sa) /2))
            text(txt, 0 , 0)
            pop() 
            items.push(
                {text: p.text, value: p.value, per: txt, color: c}
            )
            sa = ea
        }

        fill(this.bg)
        let cr = this.radius/2
        ellipse(0, 0, cr, cr)
        fill(this.fg)
        textSize(10)
        text( '[' + this.min + ',' + this.max + ']', 0, 0)
        pop()
        rectMode('center')
        textAlign('center', 'center')
        let h = 0
        let n = 0
        noStroke()
        for (const p of items) {
            fill(p.color)
            let t = p.text
            let px =-ox + 10
            let py = -oy + map(n, 0, items.length-1, 20, this.height - 20)
            if (this.align == 'left') {
               px = -ox + this.width/2 - dir  * (this.width/2 - 10)
            }
            rect(px, py, 6, 6)
            fill(this.fg)
            text(t, px + dir * (textWidth(t)/2 + 10), py)
            n++
        }
    }
}