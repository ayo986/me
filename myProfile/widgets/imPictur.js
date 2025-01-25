class imPictur extends moveClip{
    origin = CENTER_CENTER
    imageColor = [255]
    filter = null
    // bg = [30]
    // hasBg = false
    constructor(...args){
        super()
        this.filter = null
        this.set(...args)
    }

    draw(){
        if(!this.image){return}
        let alpha = (this.opacity/100) * 255
        let c = color(this.imageColor)
        c.setAlpha(alpha)
        tint(c)
        imageMode(CENTER)
        
        let [w, h] = this.Size()
        let [ox, oy] = this.Origin()

        if (this.filter) {
            this.image.filter(this.filter)
            // filter(this.filter)
        }
        if(this.shape == 1){
            image(this.image, -ox + w/2, -oy + h/2, this.width, this.height)
        }else{
            image(this.image, 0, 0, w, h)
        }
    }
}