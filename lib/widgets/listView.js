class listView extends moveClip{
	bg = [50]
	direction = 'v'
	align = 'right'
	limited = true
	slide = false
	showLine = true
	lineWidth = 1
	lineColor = [50, 100, 255]

	dump = 0.86
	displayItems = 5
	scaling = true
	valueofopacity = 20
	enableOpacityRoll = false
	space = 8
	distanceofmove = 4
	barSize = 2

	constructor(x, y, w, h){
		super(x, y, w, h)
		this.childs = []
		this.offset = 0
		this.acc = 0
		this.items = []
		this.origin = CENTER_CENTER
		this.lastIndex = -1
		this.index = 1
		this.moving = false
		this.setDisplayItem(5)
		this.setIndex(1)
	}

	setDisplayItem(n){
		this.displayItems = n
		this.offset = this.getOffset(n)
		
	}
	onChange(){

	}

	addItem(o){
		this.items.push(o)
	}

	modItems(j){
		let total = this.items.length
		let n = mod((j + total), total) 
		n = n==0 ? total : n
		return n
	}

	getItemSize(){
		let l = this.direction == 'h'?this.width:this.height
		return (l/this.displayItems)
	}

	getOffset(n){
		let l = this.direction == 'h'?this.width:this.height
		return (n - 1 ) * (l/this.displayItems)
	}

	setIndex(n){
		this.offset = this.getOffset(n)
		this.index = n
	}


	draw(){
		this.m_update()
	}
	
	drawafter(){
		stroke(this.lineColor)
		strokeWeight(this.barSize)
		let ox =  this.origin.x * this.width 
		let oy =  this.origin.y * this.height 


		let sb = this.getOffset(this.displayItems)
		let maxLen = this.getOffset(this.items.length)
		
		let hasBar= maxLen - sb > 0
		if (hasBar && this.moving) {
			if (this.direction == 'v') {
				let sizeBar = map(sb, 0, maxLen, 0, this.height)
				let v = map(-this.offset, 0, maxLen, 0, this.height)
				let hh = this.barSize
				let bx = -ox + this.width - hh
				if (this.align == 'left') {
					bx = -ox  + hh
				}
				line(bx, -oy + v, bx, -oy + v + sizeBar)
			}
			if (this.direction == 'h') {
				let sizeBar = map(sb, 0, maxLen, 0, this.width)
				let v = map(-this.offset, 0, maxLen, 0, this.width)
				let hh = this.barSize
				let by = -oy + this.height - hh
				line(-ox + v, by, -ox + v + sizeBar, by)
			}
		}
	}

	m_update(){
		let oX = this.origin.x * this.width
		let oY = this.origin.y * this.height

		let itemSize = this.getItemSize()
		let kindex = floor((-this.offset + itemSize)/itemSize)
		//print(kindex, angle_item,this.offset)
		this.offset -= this.acc
		this.acc *= this.dump

		
		if (this.limited) {
			let diff = this.items.length - this.displayItems + 1
			diff = diff > 0 ? diff : 1
			this.offset = constrain(this.offset, -this.getOffset(diff), 0)
		}
		
		if(abs(this.acc) < 0.5){
			this.acc = 0
		}

		this.moving = abs(this.acc) > 0 

		let pox =  - oX 
		let poy =  - oY 

		let state = this.items.length <= this.displayItems
		let k = state ? 1 : kindex-1
		let kk = state ? this.items.length + 1 : kindex + this.displayItems + 1
		// print(this.displayItems, state)
		this.childs = []
		for (let i = k; i < kk; i++) {
			let v = (i-1) * itemSize  + this.offset
			let index = this.modItems(i)
			let val = pox + v //+ itemSize/2
			if (this.direction == 'v') {
				val = poy + v //+ itemSize/2
			}

			let o = this.items[index-1]
			if (o) {
				// o.origin = CENTER_CENTER
				o.x = this.direction == 'h'? val + o.origin.x * itemSize :pox + o.origin.x * this.width
				o.y = this.direction == 'v'? val + o.origin.y * itemSize:poy + o.origin.y * this.height
				o.width = this.direction == 'h' ? itemSize - this.space/2 : (this.width  - this.space)
				o.height = this.direction == 'v' ? itemSize - this.space/2 : (this.height - this.space)
				o.radius = (itemSize - this.space/2) / 2
				this.insert(o)
			}
		}
	}


	mousemoved(x, y, dx, dy){
		let v = sqrt(dx*dx + dy*dy)
		let is = v > this.distanceofmove
		if (this.clicked && is) {
			let inc = this.friction
			this.acc = this.direction == 'v'? (dy * inc) : (dx * inc)
		}
	}
	mousepressed(x, y, b){
		if (b == 1) {
			this.acc = 0
		}
	}
}