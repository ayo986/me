class Scene extends moveClip{
    bg = style.bg

    constructor(...props){
        super(...props)
        this.x = 0
        this.y = 0
        this.width = windowWidth
        this.height = windowHeight
    }

    resize(w, h){
        let ox = this.origin.x * w
        let oy = this.origin.x * h
        this.x = ox
        this.y = oy
        this.width = w
        this.height = h
        this.setup()
    }
}