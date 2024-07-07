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
    let im = node.fileImage ? newImage(node.fileImage) : null 
    let itemColor = this.itemColor
    let o = node.radio ? new radioButton() : new Button()
    o.set(node)
    o.childs = []
    o.imageIcon = im
    o.fg = this.fg
    o.bg = [itemColor[0] + 20*n, itemColor[1] + 20*n, itemColor[2] + 20*n]
    o.node = node
    o.fontSize = 14
    o.alignText = this.alignText
    o.corner = [0]
    if (!node.radio) {
        o.mousereleased  = function(x, y, b){
            let p = this.getParent()
            if (b == 1) {
                if (!p.moving) {
                    if (this.node.childs) {
                        this.node.expanded = !this.node.expanded
                    }
                    
                    p.onSelected(this, this.node)
                    p.updateData()
                }
            }
        }
    }
    if (node.radio) {
        o.state = node.state
        o.onChange = function(state) {
            this.node.state =state
        }
    }

    return o
}
scene.setup = function(){
    this.childs = []
    this.clip = false
    let ebar = new explorThumb(0, 0, width, height - 40)
    loadJSON('db.json', data =>{
        ebar.addElement = addElement
        ebar.space = 4
        ebar.direction = 'v'
        ebar.align = 'left'
        ebar.alignText = 'right'
        // ebar.bg = [20]
        ebar.setDisplayItem(4)
        ebar.setIndex(1)
        this.insert(ebar)
        ebar.nodes = data
        ebar.updateData()
    })

    let btns = [
        {
            text: "CopyText", 
            imageIcon: newImage('res/icons/share.png'),
            mousepressed: function(x, y, b){
				this.opacity = 50
			},
			mousereleased: function(x, y, b){
				this.opacity = 100
				let sRes = copyTxt(ebar.nodes)
                navigator.clipboard.writeText(sRes)
				alert('done')
				// print(sRes)
			},
        },
        {
            text: "info",
            imageIcon: newImage('res/icons/info.png'), 
            alignText: 'right',
            mousepressed: function(x, y, b){
				this.opacity = 50
			},
			mousereleased: function(x, y, b){
				this.opacity = 100
				alert('Ahmed Younis Elisabethstr.18A 24143 kiel')

			},
        },
            
    ]
    let tbtns = new listView(0, height - 40, width, 40)
    tbtns.origin = TOP_LEFT
    tbtns.direction = 'h'
    // tbtns.bg = [10]
    tbtns.space = 0
    tbtns.setDisplayItem(2)
    for (let t of btns) {
        let b = new Button()
        b.set(t)
        tbtns.addItem(b)
    }
    this.insert(tbtns)

}
return scene
