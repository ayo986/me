class Orbit extends moveClip{
    origin = CENTER_CENTER
    bg = [30]
    hasBg = true
    points = []
    accX = 0 
    accY = 0
    dump = 0.98
    clip = false
    moving = false
    shadowColor = '#ffffff'
    distanceofmove = 4
    update(){

        let radius = Math.min(this.width, this.height)/2
        let n = this.childs.length
        let itemSize = 2*radius * Math.PI / n
        radius = radius - itemSize /2 - 10

        this.accX *= this.dump
        this.accY *= this.dump
        if (Math.abs(this.accX) < 0.5) {
            this.accX = 0
        }

        if (Math.abs(this.accY) < 0.5) {
            this.accY = 0
        }
        this.moving = !(this.accX == 0 && this.accY == 0)

        if (this.points.length==0) {
            this.points = createSpharePoint([], n)
            for (let i in this.childs) {
                let o = this.childs[i]
                o.p3d = this.points[i]
            }
        }

        this.childs.sort((a, b) => {
            return a.p3d.z > b.p3d.z
        })

        for (let p of this.points) { 
            p.rotateX(this.accY)         
            p.rotateY(this.accX)          
        }

        for (let o of this.childs) {
            let p = o.p3d 
            let x = p.x * radius 
            let y = p.y * radius 
            let z = p.z * radius 
            o.x = x 
            o.y = y
            let sx = map(p.z, -1, 1, 0.2, 1)
            o.width = itemSize
            o.height = itemSize
            if (o.shape == 2) {
                o.radius = itemSize/2
            }
            o.sx = sx * 100
            o.sy = sx * 100
            o.opacity = sx * 100
            o.shadowColor = this.shadowColor
            o.shadowBlur = Math.floor(itemSize) 
        }
    }
    
    mousemoved(x, y, dx, dy){
        let v = Math.sqrt(dx*dx + dy*dy)
        let is = v > this.distanceofmove
        if (this.clicked && is) {
            this.moving = true
            let maxv = Math.sqrt(this.width*this.height)
            let inc = map(maxv, 0, 100, 0, 0.1)
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