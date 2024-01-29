[mouseX, mouseY] = [0, 0]
myProject = {}
myProject.images = {}
myProject.audios = {}
myProject.gimages = {}
love.load = function () {
  [width, height] = lg.getDimensions()
  originWidth = width
  originHeight = height
  cx = width / 2
  cy = height / 2
  gotoScene('scenes/home.js')
}

love.draw = function () {
  lg.setColor(255, 255, 255, 255)
   Stage_Master.on_draw()
}

love.update = function (dt) {
  Stage_Master.on_update(dt)
}

love.mousepressed = function(x, y, b){
   Stage_Master.on_mousepressed(x, y, b)
}

love.mousereleased = function(x, y, b){
  Stage_Master.on_mousereleased(x, y, b)
}

love.mousemoved = function(x, y, dx, dy){
  Stage_Master.on_mousemoved(x, y, dx, dy)
}

love.resize = function(w, h){
  [width, height] = [w, h]
  cx = width / 2
  cy = height / 2
  Stage_Master.on_resize(w, h)
}

love.run();
