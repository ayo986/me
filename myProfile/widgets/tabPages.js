class tabPages extends moveClip{
    origin = CENTER_CENTER
    width = 300
    height = 40
    align = 'left'

    constructor(...args){
        super()
        this.items = []
        this.set(...args)

        let [ox, oy] = this.Origin()
        let [w, h] = this.Size()

        let sizebtn = h

        let bw = sizebtn
        let bh = h

        if (this.direction == 'v') {
            sizebtn = w
            bw = w
            bh = sizebtn
        }
        let list = new listBox({
            origin: TOP_LEFT,
            direction: this.direction,
            x: this.direction == 'h' ? -ox + sizebtn: -ox, 
            y: this.direction == 'h' ? -oy : -oy + sizebtn, 
            width: this.direction == 'h' ? w - (sizebtn * 2) : w, 
            height: this.direction == 'v' ? h - (sizebtn * 2) : h,

            align: this.align,
            dump: 0.86,
            displayItems: 10,
            corner: [],
            // selectMode: false,
            enabledMove:false,
            onSelect: this.onSelect,
          })
          this.list = list

          list.update = function() {
            let nMax = this.items.length - this.displayItems + 1
            let p = this.Parent()
            if (p.lb) {
              let v = this.index>1
              p.lb.enabled = v
              if (!v) {
                p.lb.opacity = 30
              }else if (p.lb.opacity == 30){
                p.lb.opacity = 100
              }
              
            }
            if (p.rb) {
              let v = (this.index < nMax )
              p.rb.enabled = v
              if (!v) {
                p.rb.opacity = 30
              }else if (p.rb.opacity == 30){
                p.rb.opacity = 100
              }
            }
          }
          this.pack(list)

          //btn
          let lb = new Button({
            origin: TOP_LEFT,
            text: String.fromCharCode(this.direction == 'h'?9668:9650),
            corner: [],
            fg: list.selectedColor,
            alignText: 'center',

            x: -ox, y: -oy, width: bw, height: bh
          })
          lb.mousepressed = function(x, y, b) {
            if (b == 1) {
                this.opacity = 50
                list.index = list.index - 1
                if (list.index < 1) {
                    list.index = 1
                }
                list.setIndex(list.index)
            }
          }
        
          lb.mousereleased = function(x, y, b) {
            this.opacity = 100
          }
          this.lb = lb
          this.pack(lb)
        
          let rb = new Button({
            origin: TOP_LEFT,
            text: String.fromCharCode(this.direction == 'h'?9658:9660),
            corner: [],
            fg: list.selectedColor,
            alignText: 'center',
            x: this.direction == 'h' ? -ox + w - bw : -ox, y: this.direction == 'h' ? -oy : -oy + h - bh, width: bw, height: bh
          })
          rb.mousepressed = function(x, y, b) {
            if (b == 1) {
                this.opacity = 50
                list.index = list.index + 1
                let nMax = list.items.length - list.displayItems + 1
                if (list.index > nMax) {
                    list.index = nMax
                }
                list.setIndex(list.index)
            }
          }
        
          rb.mousereleased = function(x, y, b) {
            this.opacity = 100
          }
          this.rb = rb
          this.pack(rb)
    }

    onSelect(){

    }
    addItem(item){
        this.list.addItem(item)
    }
  }