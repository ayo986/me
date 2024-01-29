class Book extends moveClip{
    dump = 0.86
    imageColor = true
    items = []
    hasBg = false

    constructor(x, y, w, h){
        super(x, y, w, h)
        this.ctx = createGraphics(w, h, WEBGL)
        this.da = 0
        this.index = 0
        this.offset = 0
        this.acc = 0

    }

    item(index){
        let w = this.width 
        let h = this.height
        let rmin = min(w, h)
        let rmax = max(w, h)
        
        let rw = rmin * 0.4
        let rh = rmax * 0.55
        let ctx = this.ctx
        ///
        let e = this.meItems[index]
        e.da = constrain(abs(e.da), 10, 180 - 10)
        
        let sx = -1, sy = -1, sz = 1
        let px = 0, py = -rh/2
        let dir = 1
        let mangle = mod(e.da, 180) 
        let im = mangle < 90? this.items[e.aid].image: this.items[e.bid].image
        if (mangle > 90) {
            sx = 1
        }
        dir = sx == 1? 1: -1
        px  = sx == 1?0:- rw
        py  = sy == 1? -rh/2:rh/2
        let c = mangle < 90? this.items[e.aid].color: this.items[e.bid].color
        if (c) {
            ctx.fill(c)
        }
               

        ctx.push()
        ctx.translate(0, py, this.meItems[index].z)
        ctx.scale(sx, sy, sz)
        ctx.rotateY(PI)
        ctx.rotateY(radians(floor(dir * e.da)))

        if (im) {
            if (this.imageColor) {
                if (c) {
                    ctx.tint(c)
                }
                
            }
           ctx.texture(im)
        }
        ctx.rect(px, 0, rw, rh)
        ctx.pop()
        

    }

    draw() {
        let ctx = this.ctx
        ctx.clear()
        ctx.rectMode('left')
        ctx.noStroke()
        ctx.fill(255)

        let nItem = round(this.items.length/2) 
        if (!this.meItems) {
            this.meItems = []
            for (let i = 0; i < nItem; i++) {
                this.meItems.push(
                    {
                        da: 0,
                        id: i, 
                        aid: i*2, 
                        bid: i*2 + 1, 
                        a: i * (180/nItem), 
                        z: cosdeg(i * (180/nItem))
                    }
                )
            }
        }
        this.offset += this.acc
        this.acc *= this.dump
        
        if (abs(this.acc) < 0.5) {
            this.acc = 0
        }


        let index  = floor( (-this.offset)/180) 
        this.offset = constrain(this.offset, -180 * (this.meItems.length), 0)  
        this.index = index 
        this.meItems.sort((a,b)=>{
            return a.z > b.z
        })


        let e 
        for (let o of this.meItems) {
            if (o.id == this.index) {
                e = o
            }
        }

        if (e) {
            e.da = floor(this.offset%180) 
            e.z = cosdeg(e.da + e.a)
            print(e.id, e.z, (e.da%180))
        }


        for (let i = 0 ; i < nItem ; i++) {
            this.item(i)
        }

        image(ctx, 0, 0, this.width, this.height)
        // fill(255)
        // textAlign('center', 'center')
        // textFont(this.font)
        // textSize(12)
        //text('index: ' + (this.index), 0, 0)
    }

    mousemoved(x, y, dx, dy){
        if (this.clicked) {
            this.acc = dx
            this.acc = constrain(this.acc, - 10, 10)
        }
    }
}