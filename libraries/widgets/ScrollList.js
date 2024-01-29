class ScrollList extends moveClip{
	items = []
	direction = 'h'
	offset = 0
	acc = 0
	index = 1
	lastIndex = 1
	moving = false
	bg = [50]
	align = 'left'
	displayItem = 6
	itemWidth = 100
	itemHeight = 100
	maxWidth = 0
	maxHeight = 0
	keyIndex = 0
	slide = false
	list = true
	dump = 0.7
	easing = 0.1
	typeofmoving = 1
	barColor = [50, 100, 255]
	sizeofbar = 4
	showbar = true
	constructor(x, y, w, h){
		super(x, y, w, h)
	}
	onChange(){

	}
    addItem(item){
        this.items.push(item)
    }

    done(){
        this.itemWidth = (this.width/this.displayItem)
        this.itemHeight = (this.height/this.displayItem)

        if (this.direction == 'h') {
            this.maxWidth = (this.items.length * this.itemWidth)
            this.hasBarH = this.maxWidth > this.width
            if (this.hasBarH) {
                this.sizeBarH = (this.width) * (this.width/this.maxWidth)
            }
        }

        if (this.direction == 'v') {
            this.maxHeight = (this.items.length * this.itemHeight)
            this.hasBarV = this.maxHeight > this.height
            if (this.hasBarV) {
                this.sizeBarV = (this.height) * (this.height/this.maxHeight)
            }
        }
    }

	modItems(i){
		let total = this.items.length
		let n = mod((i + total), total) 
		n = n==0 ? total : n
		return n
    }

	setIndex(index){
		index = index - this.keyIndex
		this.itemWidth = (this.width/this.displayItem)
		this.itemHeight = (this.height/this.displayItem)

		this.index = index
		this.offset = (this.index - 1)  * this.itemWidth
		if (this.direction == 'v'){
            this.offset = (this.index - 1) * this.itemHeight
        }
    }

	getIndex(offset){
		this.itemWidth = (this.width/this.displayItem)
		this.itemHeight = (this.height/this.displayItem)

		let index = (offset + this.itemWidth) / this.itemWidth
		if (this.direction == 'v'){
			index = (offset + this.itemHeight) / this.itemHeight
        }
		return [index, floor(index)]
    } 

    draw(){
        this.m_update()
    }

	drawafter(){
		if(!this.showbar || !this.list){return}
		if (this.moving) {
			
			let ox = this.origin.x * this.width
			let oy = this.origin.y * this.height
			if (this.hasBarV) {
				rectMode('left')
				noStroke()
				fill(this.barColor)
				let x= (this.width - this.sizeofbar - ox)
				let y = this.offset - oy
				if (this.align == 'right') {
					x = -ox
				}

				let w = this.sizeofbar
				let h = this.sizeBarV
				let maxLen = this.maxHeight - ((this.displayItem) * this.itemHeight)
				let yy = map(y, 0, maxLen, 0, this.height-h)
				rect(x, yy, w, h)
			}

			if (this.hasBarH) {
				rectMode('left')
				noStroke()
				fill(this.barColor)
				let x = -ox + this.offset
				let y = (this.height - this.sizeofbar-oy)

				let w = this.sizeBarH
				let h = this.sizeofbar

				let maxLen = this.maxWidth - ((this.displayItem) * this.itemWidth)
				let xx = map(x, 0, maxLen, 0, this.width-w)
				let px = this.align == 'right'? this.width - xx - w : xx
				rect(px, y, w, h)
			}
		}
		
	}

    m_update(){
        this.done()

        this.offset = this.offset + this.acc
        

        let maxLen = this.maxWidth - ((this.displayItem) * this.itemWidth)
		if (this.direction == 'v'){
			maxLen = this.maxHeight - ((this.displayItem) * this.itemHeight)
        }
		this.offset = constrain(this.offset, 0, maxLen)
		
		let [index, kIndex] = this.getIndex(this.offset + this.itemWidth/2)
		if (this.direction == 'v') {
			[index, kIndex] = this.getIndex(this.offset + this.itemHeight/2)
        }
		
		let k = this.displayItem
		let n = 0
		this.childs = []
        for (let i = -k; i <= k; i++) {
            n++
            let j = i + kIndex 
            let nval = (j-1) * this.itemWidth - this.offset
            if (this.direction == 'v') {
                nval = (j-1)*this.itemHeight - this.offset
            }
            let idx = this.modItems(j)
            let o = this.items[idx-1]
            if (o) {
				let ox = o.origin.x * o.width
				let oy = o.origin.y * o.height 
                o.x = this.direction == 'h'? ox + nval : ox
                o.y = this.direction == 'v'? oy + nval : oy
                o.width = this.direction == 'h'? this.itemWidth : o.width
                o.height = this.direction == 'v'? this.itemHeight : o.height
                o.radius = max(this.width, this.height)/2
                this.insert(o)
            }
        }


		if (!this.clicked && this.moving) {
			this.moving = false 
			if (this.slide && abs(this.acc) > 4) {
				let sign = this.acc < 0 ? -1 : 1
				this.offset += sign * this.itemWidth/2
				this.acc = 0
			}
		}

        this.acc = this.acc * this.dump

		let[rIndex, rkIndex] = this.getIndex(this.offset + this.itemWidth/2)
		if (this.direction == 'v') {
			[rIndex, rkIndex] = this.getIndex(this.offset + this.itemHeight/2)
		}

		this.index = this.modItems(rkIndex + this.kIndex)

		let target = (rkIndex - 1) * this.itemWidth
		if (this.direction == 'v') {
			target = (rkIndex - 1) * this.itemHeight
		}

		if (!this.moving && abs(this.acc) <= 0.5) {
			this.acc = 0
			if (this.typeofmoving == 1) {
				this.offset += (target - this.offset) * (this.easing || 0.1)
			}

			if (this.lastIndex != this.index) {
				this.lastIndex = this.index
				this.onChange(this.index)
			}
		}
    }
	mousemoved(x, y, dx, dy){
		let v = sqrt(dx*dx + dy*dy)
		if (this.clicked && v >= 4 ){
			this.moving = true
			this.acc = this.direction == 'v' ? -dy : -dx
        }
    }

	mousepressed(x, y, b){
		if (b == 1 ){
			this.acc = 0
			this.moving = false
        }
    }
}