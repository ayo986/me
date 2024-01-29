
let scene = new Scene(0, 0, width, height)
let im , txt, data
let pos
scene.setup = function() {
    this.childs = []
    this.bg = [10]
    pos = new vec2(0, 0)

}

scene.draw = function(){
    lg.shadow('ff0000', 100)
    lg.setColor(rgba(255))
   // lg.print('aaaaa', cx, cy)
    lg.circle('fill', pos.x, pos.y, 50)
    pos.add(new vec2(1, 0))
    lg.shadow()
}

scene.resize = function(w, h){
    this.width = w
    this.height = h
    this.childs = []
    this.setup()
}
return scene
