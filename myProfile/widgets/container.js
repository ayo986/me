class Container extends moveClip{
    origin = CENTER_CENTER
    align = 'left'
    hasBg = false
    space = 10
    width = 300 
    height = 400
    num = 4
    corner = []

    constructor(...args){
        super()
        this.set(...args)
    }

    draw(){
        let childs = this.getChilds()
        let n = this.num
        if (this.childs.length > n) {
            n = this.childs.length
        }
        let space = this.space 
        let [ox, oy] = this.Origin()
        let [w, h] = this.Size()
        let iw = w/n - space/2

        for (let i in childs) {
            let c = childs[i]
            let aa = -ox
            let bb = -ox + w - iw
            //swap
            if (this.align == 'right') {
                let cc = aa
                aa = bb 
                bb = cc
            }
            c.width = iw
            c.height = h 
            let [xo, yo] = c.Origin()
            c.x = xo + map(i, 0, n-1, aa, bb) 
            c.y = -oy + yo
        }
    }
}