
class circleGraph extends moveClip{
    bg = [30]
    fg = [200]
    origin = CENTER_CENTER
    textColor = [0]
    showText = true
    showValue = true
    radius = 50
    align = 'right'

    constructor(x, y, w, h, items, _min, _max){
        super(x, y, w, h)
        this.shape = 1
        this.items = items || []
        this.min = _min || 0
        this.max = _max || 100
        this.radius = Math.min(w, h)/2
    }

    setRange(min, max){
        this.min = min 
        this.max = max
    }

    setPoints(points){
        this.points = points || []
    }
    draw(){
        let sumValue = 0
        let total = this.items.length
        for (let i = 0; i < total; i++) {
            const p = this.items[i];
            sumValue += p.value
        }

        this.sumValue = sumValue

        let f = this.textFont
        lg.setFont(f)

        let ox = this.origin.x * this.width
        let oy = this.origin.y * this.height

        let sa = 0
        let r = this.radius
        let items = []
        lg.push()
        let dir = 0
        if (this.align == 'left') {
            dir = - 1
        }
        if (this.align == 'right') {
            dir = 1
        }
        // print(this.min, this.sumValue)

        lg.translate(-ox + this.width/2 + dir  * (this.width/2 - this.radius) , -oy + this.height/2)
        for (let i = 0; i < total; i++) {
            const p = this.items[i];
            let a = sa + map(p.value, this.min, this.sumValue, 0, 360)
            let ea = a

            //print(i, a, ea)
            let nc = map(p.value, this.min, this.max, 0, 360)
            let hsla = 'hsl(' + Math.floor(nc) + ', 100%, 50%)'
            let c = rgba(hsla)
            lg.setColor(c)
            lg.arc('fill', 0, 0, r, Math.rad(sa), Math.rad(ea))

            let rr = r/3
            let x = rr * Math.cosdeg(ea - (ea - sa) /2)
            let y = rr * Math.sindeg(ea - (ea - sa) /2)
            let vv = map(p.value, this.min, this.max, 0, 100)
            let txt = Math.round(vv) + '%'
            lg.setColor(rgba(this.textColor))
            lg.push()
            lg.translate(x, y)
            lg.rotate(Math.rad(ea - (ea - sa) /2))
            lg.print(txt, r/2 - f.getWidth(txt)/2 - 2, -f.getHeight(txt)/2)
            lg.pop() 

            items.push(
                {text: p.text, value: p.value, per: txt, color: c}
            )
            sa = ea
        }

        lg.setColor(rgba(this.bg))
        let cr = this.radius/2
        lg.circle('fill', 0, 0, cr)
        lg.setColor(rgba(this.fg))
        let lbl = '[' + this.min + ',' + this.max + ']'
        lg.print(lbl, -f.getWidth(lbl)/2, -f.getHeight(lbl)/2)
        lg.pop()

        let h = 0
        let n = 0

        for (const p of items) {
            lg.setColor(rgba(p.color))
            let t = p.text||''
            let px =-ox + 10
            let py = -oy + map(n, 0, items.length-1, 20, this.height - 20)
            if (this.align == 'left') {
               px = -ox + this.width/2 - dir  * (this.width/2 - 10)
            }
            lg.rectangle('fill', px, py, 6, 6)
            lg.setColor(rgba(this.fg))
            lg.print(t, px + dir * (f.getWidth(t)/2 + 10), py)
            n++
        }
    }
}