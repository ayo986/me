
let scene = new Scene(0, 0, width, height)
scene.draw = function(){
    
}
scene.setup = function(){
    
}
scene.resize = function(w, h){
    this.width = w
    this.height = h
    this.childs = []
    this.setup()
}
return scene
