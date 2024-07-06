
let scene = new Scene()

function addElement(node, n){
    let mc = new moveClip(0, 0, 10, 10)
    mc.hasBg = false
    let im = node.fileImage ? loadImage(node.fileImage) : null 
    let itemColor = this.itemColor
    let o = new radioButton('', 0, 0, 100, 100)
    
    o.width = this.width
    o.height = this.getItemSize()-this.space
    // o.origin = CENTER_CENTER
    // o.origin = TOP_LEFT
    o.set(node)
    o.radio = node.radio
    o.childs = []
    o.imageIcon = im
    o.alignText = 'right'
    o.fg = this.fg
    o.bg = [itemColor[0] + 20*n, itemColor[1] + 20*n, itemColor[2] + 20*n]
    o.node = node
    o.vater = this
    o.state = node.state
    o.check = function() {
        return !o.vater.moving
    }
    o.onChange = function(state) {
        this.node.state = state
        saveJSON(this.vater.nodes, "res.json", true)
    }
    if (node.childs) {
        o.mousereleased  = function(x, y, b){
            let p = this.vater
            if (b == 1) {
                if (!p.moving) {
                    this.node.expanded = !this.node.expanded
                    p.updateData()
                }
            }
        }
    }
    mc.insert(o)
    return mc
}
scene.setup = function(){
    this.childs = []
    // this.bg = [100]
    let im = lg.loadImage('res/icons/1.png')


    let mv = new explorThumb(0, 0, width, height)
    mv.align = 'left'
    mv.addElement = addElement
    mv.bg = [style.bg[0]/2, style.bg[1]/2, style.bg[2]/2]
    mv.space = 2
    this.insert(mv)
    mv.setDisplayItem(14)
    mv.setIndex(1)

    loadJson('db.json', function(data) {
        let db = data
        mv.nodes = data
        mv.updateData()
    })
}
return scene

