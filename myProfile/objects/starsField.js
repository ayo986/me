class starsField extends moveClip {
    origin = CENTER_CENTER
    hasBg = false
    maxSize = 20
    total = 60
    speed = 1
    maxOpacity = 100

    constructor(...args) {
        super()
        this.set(...args)
        for (let i = 0; i < this.total; i++) {
            this.addItem()
        }
    }

    addItem(){
        let [ox, oy] = this.Origin()
        let [w, h] = this.Size() 

        let px = random(-ox, -ox + w)
        let py = random(-oy, -oy + h)
        let z = random(w)
        let item = new Button({
            // shape: 2,
            text: random() > 0.5?'1':'0',
            x: px, y: py, z: z,
            width: 50, height: 50,
            clip: false,
            textAlign: [CENTER, CENTER],
            hasBg: false,
            iconSize: 0,
            fontSize: 40,
            fg: this.fg,
            bx: px, by: py,

        })

        item.update = function() {
            let p = this.Parent()
            let [ox, oy] = p.Origin()
            let [w, h] = p.Size() 

            this.z -= p.speed
            if (this.z <= p.speed) {
                this.z = w
                let px = random(-ox, -ox + w)
                let py = random(-oy, -oy + h)
                let z = random(w)

                this.set({
                    bx: px, by: py, z: z
                })

            }

            this.x = map(this.bx/this.z, -1, 1, -ox, -ox + w)
            this.y = map(this.by/this.z, -1, 1, -oy, -oy + h)
            let s = map(this.z, 0, w, 100, 0)
            this.sx = s
            this.sy = s

            this.opacity = map(this.z, 0, w, p.maxOpacity, 0)

        }
        this.pack(item)
    }
}