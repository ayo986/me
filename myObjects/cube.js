class Cube extends moveClip{
    origin = CENTER_CENTER
    imageColor = [255]
    rots = createVector()
    fontSize = 8
    font = loadFont('fonts/arial.ttf')
    setting = [
        {fill: color(200),  stroke: null, image:null, text: null},
        {fill: color(150),  stroke: null, image:null, text: null},
        {fill: color(100),  stroke: null, image:null, text: null},
        {fill: color(200),  stroke: null, image:null, text: null},
        {fill: color(200),  stroke: null, image:null, text: null},
        {fill: color(100),  stroke: null, image:null, text: null},
    ]
    constructor(x, y, len){
        let w = len*2
        super(x, y, w, w)
        this.len = len
        this.clip = false
        this.rots = createVector()
        this.p3d = createVector()
        this.ctx = createGraphics(w, w, WEBGL)
    }

    setImages(t){
        for (let i = 0; i < t.length; i++) {
            this.setting[i].image = t[i]
        }
    }
    setTexts(t){
        for (let i = 0; i < t.length; i++) {
            this.setting[i].text = t[i]
        }
    }    

    setTextsColor(t){
        for (let i = 0; i < t.length; i++) {
            this.setting[i].textColor = t[i]
        }
    }  

    setFillColors(t){
        for (let i = 0; i < t.length; i++) {
            this.setting[i].fill = t[i]
        }
    } 

    setStrokeColors(t){
        for (let i = 0; i < t.length; i++) {
            this.setting[i].stroke = t[i]
        }
    } 
    drawFaces(len){
       // face1
       this.ctx.noFill()
       this.ctx.noStroke()
        let c = this.setting[0]
        if (c.fill) {
            this.ctx.fill(c.fill)
        }
        if (c.stroke) {
            this.ctx.stroke(c.stroke)
        }

        this.ctx.push()
        this.ctx.translate(0, 0, len/2)
        this.ctx.scale(1, -1)
        this.ctx.rotateY(0)
        // this.ctx.quad(-len/2, -len/2, len/2, -len/2, len/2, len/2, -len/2, len/2)
        if (c.image) {
            this.ctx.texture(c.image)
        }
        this.ctx.rect(0, 0, len, len)
        if (c.text) {
            this.ctx.fill(c.textColor || 0)
            this.ctx.textFont(this.font)
            this.ctx.textSize(this.fontSize)
            this.ctx.text(c.text, 0, 0)
        }
        this.ctx.pop()

        // face2
        this.ctx.noFill()
        this.ctx.noStroke()
        c = this.setting[1]
        if (c.fill) {
            this.ctx.fill(c.fill)
        }
        if (c.stroke) {
            this.ctx.stroke(c.stroke)
        }
        this.ctx.push()
        this.ctx.translate(-len/2, 0, 0)
        this.ctx.scale(1, -1, -1)
        this.ctx.rotateY(PI/2)
        if (c.image) {
            this.ctx.texture(c.image)
        }

        this.ctx.rect(0, 0, len, len)
        if (c.text) {
            this.ctx.fill(c.textColor || 0)
            this.ctx.textFont(this.font)
            this.ctx.textSize(this.fontSize)
            this.ctx.text(c.text, 0, 0)
        }
        this.ctx.pop()


        this.ctx.noFill()
        this.ctx.noStroke()
        // face3
        c = this.setting[3]
        if (c.fill) {
            this.ctx.fill(c.fill)
        }
        if (c.stroke) {
            this.ctx.stroke(c.stroke)
        }
        this.ctx.push()
        this.ctx.translate(len/2, 0, 0)
        this.ctx.scale(1, -1)
        this.ctx.rotateY(PI/2)
        if (c.image) {
            this.ctx.texture(c.image)
        }
        this.ctx.rect(0, 0, len, len)

        if (c.text) {
            this.ctx.fill(c.textColor || 0)
            this.ctx.textFont(this.font)
            this.ctx.textSize(this.fontSize)
            this.ctx.text(c.text, 0, 0)
        }
        this.ctx.pop()

       this.ctx.noFill()
       this.ctx.noStroke()
        // face4
        c = this.setting[2]
        if (c.fill) {
            this.ctx.fill(c.fill)
        }
        if (c.stroke) {
            this.ctx.stroke(c.stroke)
        }

        this.ctx.push()
        this.ctx.translate(0, 0, -len/2)
        this.ctx.scale(-1, -1)
        this.ctx.rotateY(0)

        if (c.image) {
            this.ctx.texture(c.image)
        }
        this.ctx.rect(0, 0, len, len)
        if (c.text) {
            this.ctx.fill(c.textColor || 0)
            this.ctx.textFont(this.font)
            this.ctx.textSize(this.fontSize)
            this.ctx.text(c.text, 0, 0)
        }
        this.ctx.pop()

        this.ctx.noFill()
        this.ctx.noStroke()
        // face5
        c = this.setting[4]
        if (c.fill) {
            this.ctx.fill(c.fill)
        }
        if (c.stroke) {
            this.ctx.stroke(c.stroke)
        }
        this.ctx.push()
        this.ctx.translate(0, len/2, 0)
        this.ctx.scale(1, -1)
        this.ctx.rotateX(PI/2)
        if (c.image) {
            this.ctx.texture(c.image)
        }
        this.ctx.rect(0, 0, len, len)
        if (c.text) {
            this.ctx.fill(c.textColor || 0)
            this.ctx.textFont(this.font)
            this.ctx.textSize(this.fontSize)
            this.ctx.text(c.text, 0, 0)
        }
        this.ctx.pop()


        this.ctx.noFill()
        this.ctx.noStroke()
        // face6
        c = this.setting[5]
        if (c.fill) {
            this.ctx.fill(c.fill)
        }
        if (c.stroke) {
            this.ctx.stroke(c.stroke)
        }
        this.ctx.push()
        this.ctx.translate(0, -len/2, 0)
        this.ctx.scale(1, 1, -1)
        this.ctx.rotateX(PI/2)
        if (c.image) {
            this.ctx.texture(c.image)
        }
        this.ctx.rect(0, 0, len, len)
        if (c.text) {
            this.ctx.fill(c.textColor || 0)
            this.ctx.textFont(this.font)
            this.ctx.textSize(this.fontSize)
            this.ctx.text(c.text, 0, 0)
        }
        this.ctx.pop()
    }

    draw(){
        let len = this.len
        textAlign('center', 'center')
        this.ctx.clear()
        this.ctx.noStroke()
        this.ctx.noFill()
        this.ctx.imageMode('center')
        this.ctx.textAlign('center', 'center')
        this.ctx.rectMode('center')


        this.ctx.push()
        let p3d = this.p3d
        this.ctx.translate(p3d.x, p3d.y, p3d.z)
        this.ctx.rotateX(radians(this.rots.x))
        this.ctx.rotateY(radians(this.rots.y))
        this.ctx.rotateZ(radians(this.rots.z))

        this.drawFaces(len)

        // //end
        this.ctx.pop()

        tint(this.imageColor)
        image(this.ctx, 0, 0, this.width, this.height)
    }
}