class List extends ListMenuView {
    index_selected = -1

    onSelected(){
        // print(this.index_selected)
    }
    unselected(){
        for (const o of this.childs) {
            o.selected = false
        }
    }
    addItem(item){
        let b = new Button(item.text, 0, 0, 100, 100)
        b.fg = item.fg || this.fg 
        b.bg = item.bg || this.bg 
        b.font = item.font || this.font
        b.fontSize = item.fontSize || this.fontSize
        b.hasBg = item.hasBg || true
        b.lineColor = item.lineColor || this.lineColor
        b.shape = item.shape || 1
        b.corner = item.corner || []
        b.alignText = item.alignText || 'left'
        b.imageIcon = item.imageIcon
        b.iconSize = item.iconSize || 24
        b.alignIcon = item.alignIcon || 'left'
        // b.clip = false

        b.drawafter = function(){
            let parent = this._parent_
            let oX = this.origin.x * this.width
            let oY = this.origin.y * this.height 
            let e = parent.items[parent.index_selected]
            if (e) {
                e.selected = true
            }
            if (this.selected) {
                if (parent.direction == 'v') {
                    rectMode('left')
                    noStroke()
                    fill(parent.lineColor)
                    //text(char(57343), 0, 0)
                    let lx = parent.align == 'right'?-oX: - oX + this.width - parent.barSize
                    rect(lx, -oY, parent.barSize, this.height)
                }
                if (parent.direction == 'h') {
                    rectMode('left')
                    noStroke()
                    fill(parent.lineColor)
                    //text(char(57343), 0, 0)
                    let ly = parent.align == 'top'?-oY: -oY + this.height - parent.barSize 
                    rect(-oX, ly, this.width, parent.barSize)
                }

            }
            
        }
        b.mousepressed = function(x, y, b){
            let parent = this._parent_
            let me_obj = this
            
            if (b==1) {
                setTimeout(() => {
                    if (!parent.moving ) {
                        parent.unselected()
                        this.selected = true 
                        let idx = parent.items.indexOf(me_obj) 
                        parent.index_selected = idx
                        if (parent.last_index_selected != parent.index_selected) {
                            parent.last_index_selected != parent.index_selected
                            parent.onSelected(parent.index_selected)
                        }
                    

                    
                    }
                }, 60);  
            }
        }
        this.add(b)
        return b
    }
}