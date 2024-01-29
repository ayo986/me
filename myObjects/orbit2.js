class Orbit2 extends moveClip{
    origin = CENTER_CENTER
    dump = 0.98
    accX = 0  
    accY = 0 
    imageColor = [255]
    mode = 0
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
        let itemSize = (PI  * radius) / (this.points.length)
        radius = radius - itemSize*2
        this.rots.x += this.accX
        this.rots.y += this.accY
        // this.rots.z += -this.accY

        this.accX *= this.dump 
        this.accY *= this.dump 
        ctx.noStroke()
        ctx.noFill()
        let n = 0
        for (let pp of this.points) {
            let p = point3D(pp.x, pp.y, pp.z)
            p.rotateX((this.rots.x))
            p.rotateY((this.rots.y))
            p.rotateZ((this.rots.z))
            let px = p.x * radius
            let py = p.y * radius
            let pz = p.z * radius
            
            let c = this.colors.length > 0 ? this.colors[n%this.colors.length]:255
            ctx.fill(c)
            ctx.push()
            ctx.translate(px, py, pz)

            let z = 1//constrain(p.z, 0.1, 1)
            ctx.scale(z, -z, z)
            ctx.rotateX(radians(this.rots.x))
            ctx.rotateY(radians(this.rots.z))
            ctx.rotateZ(radians(this.rots.y))
            let im = this.images.length > 0 ? this.images[n%this.images.length]:null
            if (im) {
                ctx.texture(im)
            }
            let scl = constrain(p.z, 0.4, 1)
            let w = (px == 0 & py == 0 & pz == 0)? itemSize*2.5: itemSize * scl *1.2
            if (this.mode == 0) {
                ctx.sphere(w)
            }else if (this.mode == 1) {
                ctx.box(w)
            }
            
            ctx.pop()
            n ++
        }
        // ctx.pop()

        tint(this.imageColor)
        image(ctx, 0, 0, w, h)
    }

    mousemoved(x, y, dx, dy){
        this.accX = dy/4
        this.accY = -dx/4
    }
}