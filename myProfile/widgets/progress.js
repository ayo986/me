class Progress extends sliderModern{
    width = 60
    height = 20
    lineWidth = 1
    hasBg = false
    progressMode = true
    showCircle = false
    showText = false 
    enabled = false
    constructor(...args){
        super()
        this.set(...args)
    }

    //noEvent
    mousemoved(x, y, dx, dy){

    }
    mousepressed(x, y, b){

    }
}