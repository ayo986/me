class explorThumb extends listView{
	origin = TOP_LEFT
	nodes = []
	bg = style.bg || [30, 30, 30]
	fg = style.fg || [200]
	alignText = "left"
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
		let im = node.fileImage ? newImage(node.fileImage) : null 
		let itemColor = this.itemColor
		let o = new Button()
		o.set(node)
		o.childs = []
		o.imageIcon = im
		o.fg = this.fg
		o.bg = [itemColor[0] + 20*n, itemColor[1] + 20*n, itemColor[2] + 20*n]
		o.node = node
		o.alignText = this.alignText
		o.corner = [0]

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