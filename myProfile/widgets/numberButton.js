class numberButton extends moveClip{
    origin = CENTER_CENTER
    width = 100
    height = 30
    value = 0
    range = vec2(0, 100)
    
    onChange(){

    }

    constructor(...args){
        super()
        this.set(...args)

        let [ox, oy] = this.Origin()
        let [w, h] = this.Size()

        let BTN_SIZE = h

        let bw = BTN_SIZE
        let bh = h


        let view = new Button({
            x: -ox + w/2,
            y: -oy + h/2,
            text:this.value,
            width: w - (BTN_SIZE * 2),
            height: h,
            corner:[],
            alignText: 'center',
            // bg: this.bg,
            fg: this.fg,
            font: this.font,
            fontSize: this.fontSize,
            enabled:false,
          })
          this.view = view
          this.pack(view)

          view.update = function() {
            let p = this.Parent()
            this.text = p.value

            if (p.lb) {
                let v = p.value>p.range.x
                p.lb.enabled = v
                if (!v) {
                  p.lb.opacity = 30
                }else if (p.lb.opacity == 30){
                  p.lb.opacity = 100
                }
                
              }
              if (p.rb) {
                let v = (p.value < p.range.y )
                p.rb.enabled = v
                if (!v) {
                  p.rb.opacity = 30
                }else if (p.rb.opacity == 30){
                  p.rb.opacity = 100
                }
              }
          }

        //btn////////////////////////////////////////////////
        let lb = new Button({
            origin: TOP_LEFT,
            text: String.fromCharCode(9668),
            corner: [],
            alignText: 'center',
            x: -ox, y: -oy, width: bw, height: bh
            })
            lb.mousepressed = function(x, y, b) {
                let p = this.Parent()
                if (b == 1) {
                    this.opacity = 50
                    p.value = p.value - 1
                    if (p.value < p.range.x) {
                        p.value = p.range.x
                    }
                    p.onChange(p.value)
                }
            }

            lb.mousereleased = function(x, y, b) {
            this.opacity = 100
            }
            this.lb = lb
            this.pack(lb)
        ////////////////////////////////////////////////

        //btn////////////////////////////////////////////////
        let rb = new Button({
            origin: TOP_LEFT,
            text: String.fromCharCode(9658),
            corner: [],
            alignText: 'center',
            x: -ox + w - bw, y: -oy, width: bw, height: bh
            })
            rb.mousepressed = function(x, y, b) {
                let p = this.Parent()
                if (b == 1) {
                    this.opacity = 50
                    p.value = p.value + 1

                    if (p.value > p.range.y) {
                        p.value = p.range.y
                    }

                    p.onChange(p.value)
                }
            }

            rb.mousereleased = function(x, y, b) {
            this.opacity = 100
            }
            this.rb = rb
            this.pack(rb)
        ////////////////////////////////////////////////
        this.onChange(this.value)
    }
}