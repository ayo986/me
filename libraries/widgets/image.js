class Pictur extends moveClip{
    imageColor = [255]
    // origin = vec(0.5, 0.5)
    filter = null
    constructor(image, x, y, w, h){
        super(x, y, w, h)
        this.image = image
        this.filter = null
    }
    draw(){
        if(!this.image){return}
        let alpha = (this.opacity/100) * 255
        let c = color(this.imageColor)
        c.setAlpha(alpha)
        tint(c)
        imageMode('center')
        
        let [originX, originY] = [this.origin.x, this.origin.y]
        let oX = this.width * originX
        let oY = this.height * originY
        if (this.filter) {
            this.image.filter(this.filter)
            // filter(this.filter)
        }
        if(this.shape == 1){
            image(this.image, this.width/2 - oX, this.height/2 - oY, this.width, this.height)
        }else{
            image(this.image, 0, 0, this.width, this.height)
        }

    }
}