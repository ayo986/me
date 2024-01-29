class Orbit extends moveClip{
    origin = CENTER_CENTER
    dump = 0.98
    accX = 0  
    accY = 0 
    imageColor = [255]
    
    constructor(x, y, w, h, total){
        super(x, y, w, h)
        this.p3d = createVector()
        this.ctx = createGraphics(w, h, WEBGL)
        this.rots = createVector()
        this.points = createSpharePoint([], total - 1 || 28)
        this.points.push(createVector())
        this.colors = []
        this.images = []
        
    }

    draw(){
        imageMode('center')
        let w = this.width
        let h = this.height
        let ctx = this.ctx
        ctx.clear()
        let pos = this.p3d
        let radius = min(w, h)/2 
        let itemSize = radius * 0.2 
        radius = radius - itemSize*2
        this.rots.x += this.accX
        this.rots.y += this.accY
        // this.rots.z += -this.accY

        this.accX *= this.dump 
        this.accY *= this.dump 
        ctx.noStroke()
        ctx.noFill()
        ctx.push()
        ctx.translate(pos.x, pos.y, pos.z)
        ctx.rotateX(radians(this.rots.x))
        ctx.rotateY(radians(this.rots.y))
        ctx.rotateZ(radians(this.rots.z))
        ctx.fill(255)
        let n = 0
        for (let p of this.points) {
            let px = p.x * radius
            let py = p.y * radius
            let pz = p.z * radius
            
            let c = this.colors.length > 0 ? this.colors[n%this.colors.length]:255
            ctx.fill(c)
            ctx.push()
            ctx.translate(px, py, pz )
            let z = p.z //constrain(p.z, 0, 1)
            // ctx.scale(z, z, z)
            //ctx.scale(-1, -1, -1)
            ctx.rotateX(radians(this.rots.x))
            ctx.rotateY(radians(this.rots.y))
            ctx.rotateZ(radians(this.rots.z))
            let im = this.images.length > 0 ? this.images[n%this.images.length]:null
            if (im) {
                ctx.texture(im)
            }
            
            let w = itemSize//(px == 0 & py == 0 & pz == 0)? radius*1.2: itemSize
            ctx.sphere(w/2)
            ctx.pop()
            n ++
        }
        ctx.pop()

        tint(this.imageColor)
        image(ctx, 0, 0, w, h)
    }

    mousemoved(x, y, dx, dy){
        this.accX = -dy/4
        this.accY = -dx/4
    }
}