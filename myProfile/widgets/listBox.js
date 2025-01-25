class listBox extends listMenuView{
    direction = 'v'
    width = 230
    height = 200
    space = 4
    limited = true
    align = 'right'
    last_curr = null
    current = null
    index_item = -1
    lineWidth = 1
    selectMode = true
    selectedColor = style ? style.lineColor : [50, 100, 200]

    constructor(...args){
        super()
        this.items = []
        this.set(...args)

        this.setCurrent(this.index_item)
        
    }
    onSelect(){

    }
    onpress(x, y, b){
        let p = this.Parent()
        if (b == 1 && !p.moving) {
            p.setCurrent(this.id)
        }
    }

    setCurrent(index){
        this.last_curr = this.current
        this.index_item = index
        this.current = this.items[index]

        if (this.selectMode && this.current) {
            if (this.last_curr) {
                this.last_curr.bg = this.last_curr.bg_color
            }
            this.current.bg = this.selectedColor
        }

        if (this.current) {
            this.onSelect(index, this.current)
        }
    }

    getCurrent(){
        return this.current 
    }

    addItem(item){
        super.addItem(item)
        let n = this.items.length
        item.id = n - 1
        item.bg_color = item.bg
        item.ontap = this.onpress
    }

    drawafter(){
        super.drawafter()
        if (this.selectMode) {
            return
        }
        rectMode(CORNER)
        let curr = this.current
        noStroke()
        fill(this.selectedColor)

        let is = this.childs.indexOf(curr)
        if (curr && is > -1) {
            let [ox, oy] = this.Origin()
            let [cox, coy] = curr.Origin()
            let [w, h] =  curr.Size()

            if (this.direction == 'v') {
                let xx = this.align == 'right'? -ox + this.lineWidth : -ox + this.width - this.lineWidth
                rect(
                    xx, 
                    -coy + curr.y, 
                    this.lineWidth,
                    curr.height
                )
            }else{
                rect(
                    -cox + curr.x, 
                    -oy + this.height - this.lineWidth, 
                    curr.width,
                    this.lineWidth
                )
            }

        }
    }
}