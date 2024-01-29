
let scene = new Scene(0, 0, width, height)
let last_indexSection = - 1
let indexSection = 16
let statusDarkMode = true
let darkMode 
let ome
fireWorks_image = null
playSound = null

correct_sound = null 
Error_sound = null
let imd 
scene.draw = function(){
    
}
scene.setup = function(){
    imd = lg.newImage('AppRes/res/icons/App.png')
    correct_sound = correct_sound || loadSound('AppRes/res/combo.mp3')
    Error_sound = Error_sound || loadSound('AppRes/res/err.wav')
    this.childs = []
    this.bg = style.bg 
    // last_indexSection = - 1
    let maxv = max(width, height)
    let minv = min(width, height)
    corect_inc = (minv/maxv)
    if (playSound) {
        playSound.stop()
    }
    let mH = height *0.07

    tophead = new moveClip(0, mH, width, mH*2)
    tophead.origin = CENTER_LEFT
    tophead.bg = style.bg
    tophead.clip = false
    tophead.hasBg = true
    

    tophead.icon = lg.loadImage('AppRes/res/icons/App.png')

    let iconSize = tophead.height/2 
    let oo = new Pictur(tophead.icon, width - iconSize - 10, -iconSize/2, iconSize, iconSize) 
    oo.hasBg = false 
    oo.imageColor = [100, 200, 255]
    tophead.insert(oo)

    tophead.lws = lg.loadImage('AppRes/res/lws.png')
    oo = new Pictur(tophead.lws, this.width/2, 0, 200, mH) 
    oo.origin = CENTER_CENTER
    oo.hasBg = false 
    tophead.insert(oo)

    darkMode = darkMode || new Switch(20, 0)
    darkMode.type = 2
    darkMode.status = statusDarkMode
    darkMode.onChange = function(e){
        statusDarkMode = e
        style = {
            bg: [80, 100, 120], fg: [200],
                Button: {
                bg: [120, 140, 160], fg:[200]
            },

            lineColor: '#3ACEFF'

        }
        if (!e) {
            style = styleLight
        }

        scene.setup()
    }

    darkMode.origin = CENTER_LEFT
    darkMode.color = style.lineColor
    tophead.insert(darkMode)

    // let txt = 'داكن'
    // let textdarkMode = new Text(txt, 10, 0)
    // textdarkMode.origin = CENTER_LEFT
    // textdarkMode.fontSize = 18
    // textdarkMode.bg = style.bg
    // textdarkMode.fg = style.fg
    // textdarkMode.hasBg = false
    // textdarkMode.clip = false
    // textdarkMode.enabled = false
    // tophead.insert(textdarkMode)    

    let HV = height - (tophead.height + mH*2) - 1
    thumblist = new ListMenuView(0, 0 , width, HV)
    thumblist.direction = 'v'
    thumblist.bg = style.Button.bg
    thumblist.align = 'left'
    thumblist.dump = 0.98 
    thumblist.hasBg = true
    thumblist.lineColor = style.lineColor
    thumblist.distanceofmove = 0
    thumblist.space = 0
    thumblist.setDisplayItem(4)

    view = new moveClip(
        cx, HV/2 +(tophead.height + mH) + 1, width, HV)
    view.origin = CENTER_CENTER
    view.hasBg = true
    view.opacity = 20
    this.insert(view)
    view.insert(thumblist)

    if (!this.bgImage) {
        // this.bgImage = lg.loadImage('AppRes/res/bcard1.png')
    }
    

    menu = new List(cx, (tophead.height + mH/2) , width, mH)
    menu.direction = 'h'
    menu.dump = 0.98
    menu.bg = style.bg
    menu.distanceofmove = 0
    menu.space = 0
    menu.showBar = false
    menu.lineColor = style.lineColor
    menu.onSelected = function(index) {
         setTimeout(function() {
             scene.loadSection(index)
         }, 30)
    }


    About = new moveClip(0, 0 , width, height)
    About.bg = style.Button.bg
    About.hasBg = true
    About.opacity = 50

    About.ontap = function(o, x, y, b){
        let parent = scene
        if (b == 1) {
            let ii = parent.childs.indexOf(o)
            parent.childs.splice(ii, 1)
        }
    }

    ome =  new AboutMe(cx, cy, 200, 200)
    this.omeimage = lg.loadImage('AppRes/res/mypic.jpg')
    // ome.bgImage = this.omeimage
    ome.image = this.omeimage//tophead.icon
    ome.bg = style.bg
    ome.fg = style.fg
    ome.hasBg = true
    ome.shape = 2
    About.insert(ome)


    tabButtons = new ListMenuView(cx, height - mH/2, width, mH)
    tabButtons.direction = 'h'
    tabButtons.bg = this.bg
    tabButtons.align = 'left'
    tabButtons.dump = 0.98 
    tabButtons.distanceofmove = 0
    tabButtons.space = 0
    tabButtons.setDisplayItem(2)
    tabButtons.images = []
    let ii =0
    for (let i of ['AppRes/res/icons/about.png', 'AppRes/res/icons/19.png']) {
        let b = new Button('')
        if (!tabButtons.images[i]) {
            tabButtons.images[i] = lg.loadImage(i)
        }
        with(b){
            corner = []
            bg = style.bg
            alignText = 'center'
            alignIcon = 'center'
            iconSize = 32
            imageIcon = tabButtons.images[i]
            
        }
        if (ii == 0) {
            b.mousepressed = function(x, y, b) {
                this.opacity = 50
                
            } 
            b.ontap = function(o, x, y, b) {
                if (b==1) {
                    scene.insert(About)
                }
                
            } 
            b.mousereleased = function(x, y, b) {
                this.opacity = 100
                
            } 
        }

        if (ii == 1) {
            b.mousepressed = function(x, y, b) {
                this.opacity = 50
                
            } 

            b.ontap = function(o, x, y, b) {
                if (b==1) {
                    scene.loadActive()
                }
                
            } 
            b.mousereleased = function(x, y, b) {
                this.opacity = 100
                
            } 
        }
        tabButtons.add(b)
        ii ++
    }

    this.preloadImages()
    for (let i = 0; i < this.images.length; i++) {
        let item = {
            text:'', imageIcon: this.images[16 - i], alignIcon: 'center', iconSize: 32, bg: style.bg,
        }
       let o = menu.addItem(item)
    }
    
    menu.setDisplayItem(9)
    menu.setIndex(indexSection)
    menu.index_selected = indexSection


    //insert 
    this.insert(menu)

    this.loadSection(indexSection)
    this.insert(tabButtons)
    this.insert(tophead)

    
}


scene.loadActive = function () {
    let n = 999999999
    let index = n
    let p = 'AppRes/res/ActivesIcons/' 
    let myself = scene

    this.SectionLoaded = this.SectionLoaded || []

    if (!this.SectionLoaded[index]) {
        this.SectionLoaded[index] = []
        let i = 1
        while(true) { 
            let url = p + i + '.png'
            if (fileExists(url)) {
                let im = lg.loadImage(url)
                this.SectionLoaded[index].push({
                    image: im
                })
                i++
            }else {
                break
            }
         } 
    }
    view.childs = []
    view.insert(thumblist)
    this.Section = this.SectionLoaded[index]
     thumblist.items = []
     thumblist.acc = 0

     if (this.Section.length > 0) {
        let ncol = 5
        let nrow = floor(this.Section.length/ncol)
        nrow = this.Section.length % ncol == 0? nrow:nrow+1
        for (let i = 1; i <= nrow; i ++) {
            let item = new moveClip()
            item.origin = CENTER_CENTER
            item.text = 'item ' + i
            item.fg = [255]
            item.bg = [50]
            item.hasBg = false
            item.clip = false
            thumblist.add(item)

            let btnW = (thumblist.width/ncol)
            for (let j = 1; j <= ncol; j++) {
                let index_image = (i-1)*ncol + j
                let is = myself.Section[index_image-1]
                if (is) {
                    let ix = thumblist.width/2 - ( (j-1)*btnW + btnW /2)
                    let iy = 0
                   let b = new Button('', ix + 1, iy, btnW - 2, 100)
                    b.id = index_image
                    b.corner = []
                    b.imageIcon = is.image
                    b.alignIcon = 'center'
                    b.bg = style.Button.bg
                    b.da = 0
                    b.status = false
                    b.imageCircle = false
                    b.modeIcon = false

                    b.mousepressed =function(x, y, btn){
                        if (btn==1) {
                            this.enabled = false
                            let parent = this._parent_
                            this.opacity = 50
                            this.da = 0
                            let lt = parent.childs.length - 1
                            let ii = parent.childs.indexOf(this)
                            let oo = parent.childs[lt]
                            parent.childs[ii] = oo
                            parent.childs[lt] = this
                        }
                    }

                    b.ontap =function(o, x, y, btn){
                        o.enabled = true
                        if (btn==1) {
                            if (!thumblist.moving) {
                                o.status = true
                                thumblist.items = []
                                view.childs = []
                                //print(o.id, indexSection)
                                let f = Actives[o.id - 1]
                                if (f) {
                                    let index = 17 - indexSection
                                    let sec = scene.SectionLoaded[index]
                                    f(sec)
                                }
                            }
                        }
                    }
                    b.mousereleased = function(){
                        this.opacity = 100
                    }
                    b.update = function(){
                        this.height = this._parent_.height
                        this.iconSize = min(this.width, this.height)/1.5
                    }
                    item.insert(b)
                }
 
            }
        }

        thumblist.setIndex(1)
     }
}


scene.loadSection = function (n) {
    let index = 17 - n
    let p = 'AppRes/res/' + (index) + '/'  
    let myself = this
    view.childs = []
    view.insert(thumblist)
    this.SectionLoaded = this.SectionLoaded || []

    if (last_indexSection != n) {
        indexSection = n
        last_indexSection = n
        if (playSound) {
            playSound.stop()
        }

    }

    if (!this.SectionLoaded[index]) {
        this.SectionLoaded[index] = []
        let i = 1
        while(true) { 
            let url = p + i + '.png'
            
            if (fileExists(url)) {
                let im = lg.loadImage(url)
                let audio_url = p + i + '.wav'
                let audio = loadSound(audio_url)

                this.SectionLoaded[index].push({
                    image: im, audio: audio , id: i
                })
                i++
            }else {
                break
            }
         } 
         
    }

    myself.Section = myself.SectionLoaded[index]

     thumblist.items = []
     thumblist.acc = 0

     if (myself.Section.length > 0) {
        let ncol = 5
        let nrow = floor(myself.Section.length/ncol)
        nrow = myself.Section.length % ncol == 0? nrow:nrow+1
       
        for (let j = 1; j <= nrow; j++) {
            let item = new moveClip()
            item.origin = CENTER_CENTER
            item.text = 'item ' + j
            item.fg = [255]
            item.bg = [50]
            item.hasBg = false
            item.clip = false
            thumblist.add(item)
            
            let btnW = (thumblist.width/ncol)
            for (let i = 1; i <= ncol; i++) {
                let index_image = (j-1)*ncol + i
                if (index_image > myself.Section.length) {
                    break
                }
                let is = myself.Section[index_image-1]
                
                if (is) {
                    let ix = thumblist.width/2 - ( (i-1)*btnW + btnW /2)
                    let iy = 0
                   
                   let b = new Button('', ix + 1, iy, btnW - 2, 100)
                    b.corner = 0
                    b.imageIcon = is.image
                    b.alignIcon = 'center'
                    b.bg = style.bg
                    b.audio = is.audio
                    b.da = 0
                    b.status = false
                    b.imageCircle = false
                    b.modeIcon = false
                   
                    b.mousepressed =function(x, y, b){
                        if (b==1) {
                            let parent = this._parent_
                            let o = this
                            o.opacity = 50
                            this.da = 0
                            let lt = parent.childs.length - 1
                            let ii = parent.childs.indexOf(this)
                            let oo = parent.childs[lt]
                            parent.childs[ii] = oo
                            parent.childs[lt] = this
                            // print(ii)
                        }
                    }

                    b.ontap =function(o, x, y, b){
                        if (!thumblist.moving && b == 1) {
                            if (playSound) {
                                playSound.stop()
                            }
                            o.audio.play() 
                            playSound = o.audio
                            o.status = true
                        }
                    }

                    b.mousereleased = function(){
                        this.opacity = 100
                    }
                    
                    b.update = function(){
                        if (this.status) {
                            this.da++
                        }
                        let maxv = max(width, height)
                        let minv = min(width, height)
                        let n = 10 * (maxv/minv)
                        if (this.da > 360/n) {
                            this.da = 0
                            this.status = false
                        }
                        this.sx =100 - n * cosdeg(this.da*n)
                        this.sy = this.sx
                        this.height = this._parent_.height
                        this.iconSize = [this.width - 2, this.height - 2]
                    }
                    item.insert(b)
                }
 
            }
        }

        thumblist.setIndex(1)
        thumblist.setDisplayItem(4)
     }
}

scene.preloadImages =function(){
    if (!this.images) {
        this.images = []
        for (let i = 1; i < 18; i++) {
            let url = 'AppRes/res/icons/' + i + '.png'
            let im = lg.loadImage(url)
            this.images.push(im)
         } 
    }
}


scene.resize = function(w, h){
    this.width = w
    this.height = h
    this.childs = []
    this.setup()
}
return scene