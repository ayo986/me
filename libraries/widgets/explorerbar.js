class Explorerbar extends Scroll{
  bg = [60]
  itemHeight = 60
  iconSize = 24
  space = 0
  spaceItemX = 0
  spaceItemY = 0
  corner = []
  align = 'right'
  alignText = 'left'
  fontItem = 'Arial'
  fontSizeItem = 10
  item = {
    bg: [30],
    fg: [200]
  }

  refrech(){
    this.childs = []
    this.offsetX = 0
    this.offsetY = 0
    this.nposX = 0
    this.nposY = 0
    let y = 0
    for (let node of this.nodes) {
      node.expanded = node.expanded == null?true:node.expanded 
      let maxHeight = (node.items.length+1) * (this.itemHeight)
      let o = new moveClip(0, y, self.width, maxHeight)
      o.bg = this.bg
      o.corner = this.corner
      o.clip = false
      this.insert(o)

      let p = new Button(node.text, 0, 0, this.width, this.itemHeight) 
      p.origin = TOP_LEFT
      p.corner = [this.corner[0], this.corner[1], 1, 1]
      p.clip = false
      p.imageIcon = node.icon
      p.imageCircle = true
      p.iconSize = this.iconSize
      p.alignText = this.alignText
      p.alignIcon = this.alignText
      p.node = node
      p._class = this
      p.font = this.font
      p.fontSize = this.fontSize
      
      p.onPress = function(x, y, b){
        if (b == 1) {
          let self = this
          setTimeout(() => {
            if (!self._class.moving) {
              self.node.expanded = !self.node.expanded
              self._class.refrech()
            }
          }, 60);
        }
      }
      o.insert(p)

      y = y + this.itemHeight
      let id = 0 
      if (node.expanded){
        
        for (let item of node.items) {
          id ++
          let b = new Button(item.text, 0, id * this.itemHeight, this.width, this.itemHeight - this.spaceItemY)
          b.origin = TOP_LEFT
          b.corner = id == node.items.length?[1, 1, this.corner[0], this.corner[1]] : []
          b.clip = true
          b.bg = this.item.bg
          b.fg = this.item.fg
          b.imageIcon = item.icon
          b.imageCircle = true
          b.iconSize = this.iconSize
          b.alignText = this.alignText
          b.alignIcon = this.alignText
          b.onPress = item.onPress
          b.font = this.fontItem
          b.fontSize = this.fontSizeItem
          o.insert(b)
          y = y + this.itemHeight
        }
      }
      o.height = (id+1) * this.itemHeight
    }

    this.maxHeight = y
  }
} 