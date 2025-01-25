class menuBar extends moveClip{
    origin = CENTER_CENTER
    x = cx
    y = cy
    width = 40
    height = 40
    clip = false
    hasBg = false
    // bg = [200]
    nItems = 2
    dir = 1
    len = 20
    index = 1
    nindex = 1
    radius = 50
    itemSize = 40
    scaling = true

    constructor(...args){
        super()
        this.childs = []
        this.set(...args)
    }

    onChange(){

    }

    draw(){
        let font = this.font 
        rectMode(CORNER)
        textFont(font)
        noStroke()
        fill(this.fg)

        let over = this.isOver()
        let childs = this.childs
        let total = childs.length

        

        let [ox, oy] = this.Origin()
        let [pw, ph] = this.Size()

        let item_size = pw/(total)

        

        if (over) {
            let nindex = map(this.xmouse, -ox, pw - ox - item_size, 0, total-1)
            // nindex = constrain(nindex, -1 + 0.5, total - 1 + 0.5)            
            this.nindex = nindex
            this.index = floor( nindex ) 
        }

        let nindex = this.nindex
        let index = this.index
        let nItem = this.nItems
        let ncount = (nItem * 2 + 1)


        let r = item_size * ncount /2
        for (let i in childs) {
            let o = childs[i]
            o.origin = CENTER_CENTER
            let iox = o.origin.x * item_size
            let ioy = o.origin.y * ph
            let diff = (nindex - index)

            let x = map(i, 0, total - 1,  -ox + iox , pw - ox - iox)
            let y = ioy - oy 

            let n = index - nItem
            let k = index + nItem 

            let radius = this.radius
            if (over){
                if (i < n)  {
                    x = x - (radius)
                }
                if (i > k)  {
                    x = x + (radius)
                }
            }

            // //////
            let scl = 100
            if (over && i >= n && i <= k) {
                let id = i - n + 1
                let a = map((id - diff + 0.5)  , 1, ncount, 0, 180)
                a = constrain(a, 0, 180)
                let new_size = item_size + ((radius * 2)/ncount)
                let d = ((new_size / item_size) * 100 - 100)
                if (this.scaling) {
                    scl = 100 +  d * sindeg(a)
                    scl = constrain(scl, 100, 100 + d)
                }

                x = x - radius * cosdeg(a)
                if (this.ylen) {
                    y = y - this.ylen  * sindeg(a) 
                }else{
                    y = y - (d/100 * ph/2)  * sindeg(a) 
                }
                
            }
            //////////////////-
            o.sx = scl 
            o.sy = o.sx
            o.x = x 
            o.y = y 
            o.width = item_size
            o.height = this.height 
        }


        let xCorner = min(this.width, this.height)/2
        let yCorner = xCorner
        let[xx, yy, ww, hh] = [childs[0].x, childs[0].y, childs[0].width, childs[0].height]
        let[xx2, yy2, ww2, hh2] = [childs[total - 1].x, childs[total - 1].y, childs[total - 1].width, childs[total - 1].height]
        let xv = xx - (ww + this.len)/2
        let xr = xx2 + (ww2 + this.len)/2
        fill(this.bg)
        if (!this.noRect) {
            rect(xv, -oy, xr - xv , ph, xCorner, yCorner)
        }
        
        this.onChange(this.index)
    }
}