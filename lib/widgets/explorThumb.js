class explorThumb extends listView{
    origin = TOP_LEFT
    nodes = []
    bg = style.bg || [30, 30, 30]
    fg = style.fg || [200]
    itemColor = style.Button.bg
    
    constructor(x, y, w, h, nodes){
        super(x, y, w, h)
        this.nodes = nodes || []
        this.updateData()
    }

    onSelected(item, node){
        // print(node.text)
    }

    addElement(node, n){
        let im = node.fileImage ? loadImage(node.fileImage) : null 
        let itemColor = this.itemColor
        let o = new Button()
        o.set(node)
        o.childs = []
        o.imageIcon = im
        o.fg = this.fg
        o.bg = [itemColor[0] + 20*n, itemColor[1] + 20*n, itemColor[2] + 20*n]
        o.node = node
        if (node.childs) {
            o.mousereleased  = function(x, y, b){
                let p = this._parent_
                if (b == 1) {
                    if (!p.moving) {
                        this.node.expanded = !this.node.expanded
                        p.updateData()
                    }
                }
            }
        }else{
            o.mousereleased  = function(x, y, b){
                let p = this._parent_
                if (b == 1) {
                    if (!p.moving) {
                        p.onSelected(this, this.node)
                    }
                }
            } 
        }
        return o
    }

    drawloop(nodes, n){
        n = n || 0
        let ow = this.width
        let oh = this.height

        for (let node of nodes || []) {
            this.addItem(this.addElement(node, n))
            if (node.childs && node.expanded) {
                this.drawloop(node.childs, n+1)
            }
        }
    }

    updateData(){
        this.items = []
        this.childs = []
        this.drawloop(this.nodes, 0)
        
    }

}