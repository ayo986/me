class Scene extends moveClip{
    bg = style.bg
    fg = style.fg

    constructor(props){
        super(0, 0, window.innerWidth, window.innerHeight)
        this.set(props)
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