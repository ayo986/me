
lg = love.graphics

love.load = function () {
  TOP_LEFT = vec2(0, 0)
  TOP_CENTER = vec2(0.5, 0)
  TOP_RIGHT = vec2(1, 0)
  
  CENTER_LEFT = vec2(0, 0.5)
  CENTER_CENTER = vec2(0.5, 0.5)
  CENTER_RIGHT = vec2(1, 0.5)
  
  BUTTOM_LEFT = vec2(0, 1)
  BUTTOM_CENTER = vec2(0.5, 1)
  BUTTOM_RIGHT = vec2(1, 1)
  let [w, h] = lg.getDimensions()
  width = w
  height = h
  cx = w/2
  cy = h/2
  gotoScene('scenes/home.js')
}

love.draw = function () {
  let [w, h] = lg.getDimensions()
  width = w
  height = h
  cx = w/2
  cy = h/2
  lg.setLineWidth(1)
  lg.setColor(0, 0, 0)
  scene_master.on_draw()
}

love.mousepressed = function(x, y, b){
  scene_master.on_mousepressed(x, y, b)
}

love.mousereleased = function(x, y, b){
  scene_master.on_mousereleased(x, y, b)
}

love.mousemoved = function(x, y, dx, dy){
  scene_master.on_mousemoved(x, y, dx, dy)
}

love.resize = function(w, h){
  width = w
  height = h
  cx = w/2
  cy = h/2
  scene_master.on_resize(w, h)
}

love.run();