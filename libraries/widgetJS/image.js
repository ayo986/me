class Pictur extends moveClip{
    imageColor = [255]
    radius = 50
    constructor(image, x, y, w, h){
        super(x, y, w, h)
        this.image = image
    }
    draw(){
        if(!this.image){return}
        let alpha = (this.opacity/100) * 255
        let c = rgba(this.imageColor)
        if (typeof(c) != 'string') {
            c[3] = alpha
        }
        lg.setColor(c)

        let ox = this.origin.x * this.width 
        let oy = this.origin.y * this.height 

        if(this.shape == 1){
            drawImage(
                this.image, 
                -ox + this.width/2, 
                -oy + this.height/2, 
                this.width, this.height
            )
        }else{
            drawImage(this.image, 0, 0, this.radius*2, this.radius*2)
        }
    }
}