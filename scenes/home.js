
let scene = new Scene()
function getCount(t){
    let n = 0
    for (let o of t) {
        if (o.state) {
            n++
        }
    }
    return n 
}

function copyTxt(nodes, n, str, p){
    n = n || 0
    p = p || ''
    str = str || ''
    let j = 0
    for (let node of nodes || []) {
        if (node.childs && getCount(node.childs) > 0) {
            str = str + '*' + p + '(' + node.text + ')*\r\n'
        }

        if (node.state) {
            j++
            let nr = 16 - node.text.length
            let hh = ''
            // if (nr > 0) {
            //    hh = ' '.repeat(nr)
            // }
            str = str + j + '-' + node.text + hh + '\r\n'
        }

        if (node.childs) {
           str = copyTxt(node.childs, n + 1, str, node.text)
        }
    }

    return str
}
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
    if (node.radio) {
        o.onChange = function(state) {
            this.node.state = state
        }
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


    let ebar = new explorThumb(0, 0, width, height - 40)
    ebar.align = 'left'
    ebar.addElement = addElement
    ebar.bg = [style.bg[0]/2, style.bg[1]/2, style.bg[2]/2]
    ebar.space = 2
    this.insert(ebar)
    ebar.setDisplayItem(14)
    ebar.setIndex(1)

    loadJson('db.json', function(data) {
        let db = data
        ebar.nodes = data
        ebar.updateData()
    })

    let lv = new listView(0, height - 40, width, 40)
    lv.direction = 'h'
    lv.bg = [20]
    lv.space = 0
    lv.origin = TOP_LEFT
    this.insert(lv)

    let buttons = [
        {
            text: "Copy List", 
            imageIcon:lg.newImage('res/icons/share.png'),
            mousepressed: function(x, y, b){
                this.opacity = 50
            },
            mousereleased: function(x, y, b){
                this.opacity = 100
                let sRes = copyTxt(ebar.nodes)
                navigator.clipboard.writeText(sRes + '\r\n' + 'Ahmed Younis');
                // print(sRes)
            },
        },
        {
            text: "About", 
            imageIcon:lg.newImage('res/icons/info.png'), 
            alignText: "right",
            mousepressed: function(x, y, b){
                this.opacity = 50
            },
            mousereleased: function(x, y, b){
                this.opacity = 100
                alert('Ahmed Younis Elisabethstr.18A 24143 kiel')

            },
        },
    ]

    for (let i in buttons) {
        let b = buttons[i]
        let o = new Button()
        o.set(b)
        lv.addItem(o)
    }
    lv.setDisplayItem(2)
}
return scene

