class ListMenuView extends moveClip{
    bg = [50]
    direction = 'h'
    align = 'right'
    limited = true
    slide = false
    showLine = true
    lineColor = [50, 100, 255, 150]

    dump = 0.86
    displayItems = 5
    scaling = true
    valueofopacity = 20
    enableOpacityRoll = false
    space = 8
    distanceofmove = 4
    barSize = 2
    showBar = true

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
        this.setIndex(1)
    }

    setDisplayItem(n){
        this.displayItems = n
        
    }
    onChange(){

    }
    add(o){
        this.items.push(o)
        this.setIndex(this.index)
    }

	modItems(j){
		let total = this.items.length
		let n = mod((j + total), total) 
		n = n==0 ? total : n
		return n
    }

    getOffset(n){
        let total = this.displayItems
        if ( this.items.length < this.displayItems) {
            total = this.items.length
        }
        let itemSize = this.width/total
        if (this.direction == 'v') {
            itemSize = this.height/total
        }
        return (n-1) * itemSize
    }

	setIndex(n){
        this.offset = this.getOffset(n)
        this.index = n
    }


    draw(){
        this.m_update()
    }
    
    drawafter(){
        if (!this.limited) {
            return
        }
        if (!this.showBar) {
            return
        }

        lg.setColor(rgba(this.lineColor))
        let oX = this.origin.x * this.width
        let oY = this.origin.y * this.height 
        let sb = this.getOffset(this.displayItems)
        let maxLen = this.getOffset(this.items.length)
        
        let hasBar= maxLen - sb > 0
        if (hasBar) {
            if (this.direction == 'v') {
                let sizeBar = map(sb, 0, maxLen, 0, this.height)
                let v = map(this.offset, 0, maxLen, 0, this.height)
                let hh = this.barSize
                let bx = -oX + this.width - hh
                if (this.align == 'left') {
                    bx = -oX  + hh
                }
                lg.rectangle('fill', bx, -oY + v, hh, sizeBar)
            }
            if (this.direction == 'h') {
                let sizeBar = map(sb, 0, maxLen, 0, this.width)
                let v = map(this.offset, 0, maxLen, 0, this.width)
                let hh = this.barSize
                lg.rectangle('fill', -oX + v, -oY + this.height - hh, sizeBar, hh)
            }
        }
        
    }
    m_update(){
        let oX = this.origin.x * this.width
        let oY = this.origin.y * this.height

        this.kIndex = Math.floor(this.displayItems/2)
        let angle_item = (180/this.displayItems)
        let radius = this.direction == 'h'?this.width/2:this.height/2
        let total = this.displayItems

        if ( this.items.length<this.displayItems) {
            total = Math.floor(this.displayItems/2) + 1
        }

        let itemSize = (this.width/total) 

        if (this.direction == 'v') {
            itemSize = (this.height/total) 
        }
        let kindex = Math.floor((this.offset + itemSize + itemSize - 0.5)/itemSize)
        //print(kindex, angle_item,this.offset)
        
        let maxLen = this.getOffset(this.items.length - this.displayItems + 1)
        
        if (this.items.length > this.displayItems) {
            this.offset += this.acc
        }
        this.acc *= this.dump
        if (this.limited) {
            this.offset = constrain(this.offset, 0, maxLen)
        }
        if(Math.abs(this.acc) < 0.5){
            this.acc = 0
        }

        this.moving = Math.abs(this.acc) > 0 

        let target 
        let pox =  - oX + this.width/2
        let poy =  - oY + this.height/2
        this.childs = []
        let k = 1
        let has = this.items.length > this.displayItems  - 1
        if (has) {
            k = -this.displayItems 
        }

        let kk = this.items.length + 1
        if (has) {
            kk = this.displayItems 
        }
        for (let i = k; i < kk; i++) {

            let j = (i + kindex)
            let nval = (j-1) * itemSize - this.offset + itemSize/2
            if (!has) {
                nval = (i-1) * itemSize + itemSize/2
            }
            let val =  nval - oX
            if (this.direction == 'v') {
                val = nval - oY
            }
            let idx = this.modItems(j)
            let o = this.items[idx-1]
            if (o) {
                o.origin = CENTER_CENTER
                o.x = this.direction == 'h'? val:pox
                o.y = this.direction == 'v'? val:poy
                o.width = this.direction == 'h' ? itemSize - this.space/2 : (this.width  - this.space)
                o.height = this.direction == 'v' ? itemSize - this.space/2 : (this.height - this.space)
                this.insert(o)
            }
        }

        if (this.acc == 0)  {
            if (this.lastIndex != this.index) {
                this.lastIndex = this.index
                this.onChange(this.index)
            }
        }
    }


    mousemoved(x, y, dx, dy){
        let v = Math.sqrt(dx*dx + dy*dy)
        let is = v > this.distanceofmove
        if (this.clicked && is) {
            let maxv = Math.sqrt(this.width*this.height)
            let inc = map(maxv, 0, 480, 0, 0.8)
            this.acc = this.direction == 'v'? (dy * inc):(dx * inc)
        }
    }
    mousepressed(x, y, b){
        if (b == 1) {
            this.acc = 0
        }
    }
}