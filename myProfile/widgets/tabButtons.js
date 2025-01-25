class tabButtons extends Container{
    origin = CENTER_CENTER
    // hasBg = false
    selectedMode = true

    space = 0
    width = 230 
    height = 40
    corner = [20]
    lineColor = style?style.lineColor: [50, 100, 200]
    index = 0
    lineWidth = 1
    selectColor = style?style.selectedColor: [50, 100, 200]

    current = null
    constructor(...args){
        super()
        this.index = 0
        this.set(...args)
        
    }

    onChange(index){

    }


    done(){
        let childs = this.childs
        for (const i in childs) {
            let o = childs[i]
            o.bg = this.bg
        }
        if (this.current) {
            this.current.bg = this.selectColor       
        }

    }
    onpress = function(x, y, b) {
        let p = this.Parent()
        if (b == 1) {
            p.index = this.id
            p.onChange(p.index, this)
        }
    }

    addButton(item){
        let n = this.numChilds()
        item.id = n
        item.bg = this.bg
        item.fg = this.fg
        item.mousepressed = this.onpress
        this.pack(item)
    }

    draw(){
        super.draw()
        this.current = this.childs[this.index]
        if (this.selectedMode) {
            this.done()
        }
    }

    drawafter(){
        if (this.selectedMode) {
            return
        }
        rectMode(CENTER)
        let curr = this.current
        noStroke()
        fill(this.lineColor)
        if (curr) {
            let [ox, oy] = curr.Origin()
            rect(curr.x + curr.width/2 - ox, curr.height/2 - this.lineWidth/2, curr.width, this.lineWidth)
        }
    }
}