class imagesButton extends Button{
    index = 0
    corner = 0
    constructor(x, y, w, h, images){
        super('', x, y, w, h)
        this.images = images || []
        this.alignIcon = 'center'

    }
    onChange(){}
    draw(){
        this.iconSize = [this.width, this.height]
        if (this.images.length > 0) {
            this.imageIcon = this.images[this.index]
        }
        super.draw()
    }

    mousepressed(x, y, b){
        if (b == 1) {
             this.index ++
             if (this.index > this.images.length-1) {
                 this.index = 0
             }   
             this.onChange(this.index)
        }

    }
}