
function PickRandomTable(t, n) {
    n = n || t.length
    let rs = []
    while (rs.length < n ) {
        let total = t.length
        let index = floor(random(0, total - 1))
        let o = t[index]
        if (rs.indexOf(o) <= -1) {
            rs.push(o)
        }
    }
    return rs
}

function randomTable(t, nt) {
    let n = t.length 
    nt = nt || n 
    while (nt > 0) {
        let ii = round(random(1, nt)) 
        //swapValues in table index ii nt
        let temp  = t[nt - 1]
        t[nt - 1] = t[ii - 1]
        t[ii - 1] = temp
        nt--
    }
    return t
}


function fireWorks(parent, x, y, r, n) {
    fireWorks_image = fireWorks_image || loadImage('AppRes/res/star.png')
    if (playSound) {
        playSound.stop()
    }
    correct_sound.play()
    playSound = correct_sound
    r = r || 6
    n = n || 10
    let w = r * 2
    for (var i = 0; i < n; i++) {
        let a = floor(random(360))
        let c = color('hsl('+ a + ', 100%, 50%)')
        // print(c)
        let o = new Pictur(fireWorks_image, x, y, w, w)
        o.origin = CENTER_CENTER
        o.imageColor = c
        o.hasBg = false
        o.AA = a
        o.life = random(30, 70)
        o.age = 0
        o.clip = false
        o.speed = random(2, 4)
        o.frame = (i-1) * 4 + 1
        o.angle = a
        o.enabled = false
        o.update = function() {

            this.age += 1//(this.AA - this.angle) * 0.9
            this.x += this.speed * cosdeg(this.AA)
            this.y += this.speed * sindeg(this.AA)
            this.angle += 5 * cosdeg(this.AA)

            let v = map(this.age, 0, this.life, 100, 0)
            this.sx = v
            this.sy = this.sx
            this.opacity = v
            if (v <= 0) {
                let ii = parent.childs.indexOf(this)
                let oRes = parent.childs.splice(ii, 1)

            }  
        }
        parent.insert(o)
    }
}


bcard = null
radiusOfFireWorks = 20
numberOfFireWorks = 6
Actives = []


// Active1

function Active1(sec) {

    view.childs = []
    let piv = new Pictur(null, 0, -80, 260, 200)

    let m = new MenuView(0, 80, 260, 80)
    m.limited = false
    m.dump = 0.98
    m.enableOpacityRoll = true
    m.displayItems = 4
    m.distanceofmove = 0
    m.bg = style.Button.bg
    view.insert(m)
    for (let t of sec) {
        let item = new Pictur(t.image, 0, 0, 100, 100)
        item.hasBg = false
        item.audio = t.audio
        m.addItem(item)

    }
    m.setIndex(1)
    m.onChange = function(index){
        let o = this.items[index-1]
        // if (playSound) {
        //     playSound.stop()
        // }
        // playSound = o.audio
        // playSound.play()
        piv.image = o.image
        piv.audio = o.audio
    }

    
    piv.origin = CENTER_CENTER
    piv.hasBg = true 
    piv.bg = style.Button.bg
    piv.mousepressed = function(x, y, b){
        this.opacity = 50
        if (b == 1) {
            if (this.audio) {
                if (playSound) {
                    playSound.stop()
                }
                playSound = this.audio 
                playSound.play()
            }
        }
    }

    piv.mousereleased = function(x, y, b){
        this.opacity = 100
    }
    view.insert(piv)
    return m
}

Actives.push(Active1)

///Active2
function Active2(sec) {
    view.childs = []

    let items = []
    for (let t of sec) {
        let item = {
            image: t.image,
            audio: t.audio,
            text: ''
        }
        items.push(item)
    }


    let piv = new Pictur(null, 0, 0, 80, 80)
    let m = new menuWheel2(0, 0, 100, items)
    m.dump = 0.95
    m.distanceofmove = 0
    m.bg = style.bg
    m.lineColor = style.lineColor

    m.onChange = function(index){
        let o = this.items[index-1]
        piv.image = o.image
        piv.audio = o.audio
    }

    view.insert(m)

    piv.origin = CENTER_CENTER
    piv.bg = style.Button.bg
    piv.shape = 2
    piv.mousepressed = function(x, y, b){
        this.opacity = 50
        if (b == 1) {
            if (this.audio) {
                if (playSound) {
                    playSound.stop()
                }
                playSound = this.audio 
                playSound.play()
            }
        }
    }

    piv.mousereleased = function(x, y, b){
        this.opacity = 100
    }

    view.insert(piv)
    return m
}

Actives.push(Active2)


//Active3


function Active3(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }
    let audio = rs[corectId].audio
    audio.play()
    playSound = audio
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    // //
    bcard = newImage('AppRes/res/bcard.png') 
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)
        let picbg = new Pictur(bcard, x, -iw/2, iw, iw)
        picbg.hasBg = false
        picbg.enabled = false
        e.insert(picbg)
        let pic = new Pictur(o.image, x, -iw/2, iw, iw)
        pic.id = i
        pic.hasBg = false
        pic.timeontap = 800
        pic.mousepressed = function(x, y, b) {
            this.opacity = 50
            this.enabled = false
            if (this.id == corectId) {
                this.move = true
                fireWorks(view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
            }
        }
        pic.ontap = function(o, x, y, b) {
            o.enabled = true
            if (o.id == corectId) {
                Active3(sec)
            }
        }
        pic.mousereleased = function(x, y, b) {
            this.opacity = 100
        }

        pic.update = function(){
            if (this.move && this.id == corectId) {
                this.y += (-200 - this.y)*0.2
            }
        }
        e.insert(pic)
    }
    view.insert(e)
}

Actives.push(Active3)



//Active4


function Active4(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let n = rs.length

    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }


    let e = new moveClip(0, 0, iw * n, iw*2)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    e.hasBg = false
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height

    // //

    bcard = newImage('AppRes/res/bcard.png') 

    let uIndex = randomTable([0, 1, 2])  

    let images = []
    let audios = ['no']
    let img_buttons = []
    e.a_img_buttons = []
    e.b_img_buttons = []
    // e.timeontap = 600
    e.playsound = null
    e.is = false

    img_buttons.push(bcard)

    for (let i = 0; i < 3 ; i++) {
        let j = uIndex[i]
        let x = -ox + (i*iw) 
        images.push(rs[i].image)
        

        let pic = new imagesButton(x, -iw, iw, iw, images)
        pic.index = i
        pic.hasBg = true
        pic.enabled = false
        pic.bg = style.bg
        e.a_img_buttons.push(pic)
        e.insert(pic)

        img_buttons.push(rs[j].image)
        audios.push(rs[j].audio)

        let pic2 = new imagesButton(x, 0, iw, iw, img_buttons)
        pic2.index = 0
        pic2.hasBg = true
        pic2.bg = style.Button.bg
        pic2.audios = audios

        pic2.onChange = function(index){
            if (index > 0) {
                if (e.playsound) {
                    e.playsound.stop()
                }
                e.playsound = this.audios[index]
                this.audios[index].play()
                let is = true
                for (let i in e.a_img_buttons) {
                    let a_index_btn = e.a_img_buttons[i].index
                    let b_index_btn = e.b_img_buttons[i].index
                    if (a_index_btn != uIndex[b_index_btn-1]) {
                        is = false 
                        break
                    }
                }

                if (is) {
                    e.enabled = false
                    fireWorks(view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
                    setTimeout(function() {
                        Active4(sec)
                    }, 800)
                }
                
                e.is = is
            }
        }
        e.b_img_buttons.push(pic2)
        e.insert(pic2)
    }


    e.status = true
    view.insert(e)

}

Actives.push(Active4)



//Active5


function Active5(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }
    // let audio = rs[corectId].audio
    // audio.play()
    // playSound = audio

    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw*3)
    e.origin = CENTER_CENTER
    e.clip = true
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height

    let pic = new Pictur(rs[corectId].image, 0, -iw/2, e.width, iw*2 )
    pic.origin = CENTER_CENTER
    pic.filter = GRAY
    e.insert(pic)
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)
        let pic = new Pictur(o.image, x, iw/2, iw, iw)
        pic.id = i
        pic.hasBg = false
        pic.timeontap = 700
        pic.filter = null
        pic.mousepressed = function(x, y, b) {
            let o = this
            if (b == 1) {
                this.opacity = 50
                this.enabled = false

                if (this.id == corectId) {
                    this.move = true
                     fireWorks(view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
                }
            }
        }

        pic.ontap = function(o, x, y, b) {
            o.enabled = true
            if (b == 1) {
                if (o.id == corectId) {
                    Active5(sec)
                }
            }
        }

        pic.mousereleased = function(x, y, b) {
            this.opacity = 100
        }

        pic.update = function(){
            // if (this.move && this.id == corectId) {
            //     this.y += (-200 - this.y)*0.2
            // }
        }
        e.insert(pic)
    }
    view.insert(e)
}

Actives.push(Active5)


//Active6


function Active6(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }
    let audio = rs[corectId].audio
    audio.play()
    playSound = audio
    // //
    bcard = newImage('AppRes/res/bcard.png') 
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw*3)
    e.origin = CENTER_CENTER
    e.clip = true
    e.bg = style.bg

    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height

    let sumCorrect = 0
    let numofCorrect = 0
    let childs = []
    
    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 3; i++) {
            let x = -ox + (i*iw)
            let y = -oy + (j * iw)
            let index = round(random(1, rs.length)) - 1

            if (index == corectId) {
                sumCorrect++
            }


            let picbg = new Pictur(bcard, x, y, iw, iw)
            picbg.hasBg = false
            picbg.enabled = false
            e.insert(picbg)
            let pic = new Pictur(rs[index].image, x, y, iw, iw)
            pic.id = index
            pic.hasBg = false
            childs.push(pic)
            pic.mousepressed = function(x, y, b) {
                if (b == 1) {
                    this.opacity = 50
                    if (this.id == corectId) {
                        numofCorrect++
                         fireWorks(view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
                         let parent = this._parent_
                         let ii =  parent.childs.indexOf(this)
                         if (ii > -1) {
                            parent.childs.splice(ii, 1)
                         }
                     }
                 }

                 if (sumCorrect == numofCorrect) {
                    setTimeout(function(){
                        Active6(sec)
                    }, 400)
                 } 
            }

            pic.mousereleased = function(x, y, b) {
                this.opacity = 100
            }
            e.insert(pic)
        }
    }

   
    // check 

    let num = 0
    for (let o of childs) {
        if (o.id != corectId) {
            num++
        }
    }

    // print(num, corectId)
    if (num == 9) {
       let ri = round(random(1, 9))-1
       childs[ri].image = rs[corectId].image
       childs[ri].id = corectId 
       sumCorrect = 1
    }

    view.insert(e)

    
}

Actives.push(Active6)


//Active7


function Active7(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }
    // let audio = rs[corectId].audio
    // audio.play()
    // playSound = audio
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw*2)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    // //
    bcard = newImage('AppRes/res/bcard.png') 

    let indexBox = round(random(1, rs.length)) - 1
    let boxes = []
    let img = rs[corectId].image
    
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)

        let picbg = new Pictur(bcard, x, -iw, iw, iw)
        picbg.idx = -100
        picbg.hasBg = false
        picbg.enabled = false
        e.insert(picbg)

        let picbg2 = new Pictur(bcard, x, 0, iw, iw)
        picbg2.idx = -100
        picbg2.hasBg = false
        picbg2.enabled = false
        e.insert(picbg2)

        let pic = new Pictur(img, x, -iw, iw, iw)
        pic.idx = -99
        pic.hasBg = false
        if (i != indexBox) {
            e.insert(pic)
        }
        boxes.push(pic)



        let picI = new Pictur(o.image, x, 0, iw, iw)
        picI.idx = i * 100
        picI.id = i
        picI.hasBg = false
        picI.timeontap = 600

        picI.mousepressed = function(x, y, b) {
            this.opacity = 50
            this.enabled = false
            
            if (this.id == corectId) {
                this.idx = 1000
                this.move = true
                fireWorks(
                    view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
            }
        }

        picI.ontap = function(o, x, y, b) {
            o.enabled = true
            if (o.id == corectId) {
                Active7(sec)
            }
        }

        picI.mousereleased = function(x, y, b) {
            this.opacity = 100
        }

        picI.update = function(){
            if (this.move && this.id == corectId) {
                let tx =  boxes[indexBox].x
                let ty =  boxes[indexBox].y
                this.x += (tx - this.x) * 0.08
                this.y += (ty - this.y) * 0.08
            }
        }

        e.insert(picI)
        
    }

    e.drawbefor = function(){
        this.childs.sort((a, b) => {
            return a.idx - b.idx
        })
    }
    view.insert(e)
}

Actives.push(Active7)


function Active8(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    let img = rs[corectId].image
    if (playSound) {
        playSound.stop()
    }
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw*2)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    bcard = newImage('AppRes/res/bcard.png') 
    let uIndex = randomTable([0, 1, 2])  
    let twork = []
    let tobject = []
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)
        let pic = new Pictur(o.image, x+iw/2, -iw/2, iw, iw)
        pic.id = i
        pic.hasBg = true
        pic.bg = style.Button.bg
        pic.origin = CENTER_CENTER
        pic.da = 180
        pic.target = 180
        pic.open = true
        pic.mousepressed = function(x, y, b){
            if (b == 1) {
                if (this.open) {
                    this.open = false
                    if (twork.length == 2) {
                        for (const o of twork) {
                            if (o.enabled) {
                                o.target = 180
                                o.open = true
                            }
                        }
                        twork = []
                    }
                    twork.push(this)
                }else{
                    this.open = true
                    let ii = twork.indexOf(this)
                    if (ii > -1) {
                        twork.splice(ii, 1)
                    }
                }
                this.target = floor(this.target) == 0?180 :0
                
                if (twork.length == 2) {
                    let a = (twork[0].id)
                    let b = (twork[1].id)
                    if (a == b) {
                        twork[0].enabled = false
                        twork[1].enabled = false
                        fireWorks(
                            view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)   
                    }
                    
                }

                //check
                let chek = true
                for (const o of tobject) {
                    if (o.enabled) {
                        chek = false
                    }
                }

                if (chek) {
                    setTimeout(function(){
                        Active8(sec)
                    }, 200)
                }
            }
        }
        pic.update = function(){
            this.da += (this.target - this.da) * 0.05
    
            let im = bcard
            let v = 100
            if (cosdeg(this.da) <= 0 && cosdeg(this.da) >= -1) {
                im = rs[this.id].image
                v = -100
            }
    
            this.sx = v * cosdeg(this.da)
            this.sy = 100 + 20  * sindeg(this.da)
    
    
            this.image = im
        }
        e.insert(pic)
        tobject.push(pic)
        let picU = new Pictur(rs[uIndex[i]].image, x+iw/2, iw/2, iw, iw)
        picU.id = uIndex[i]
        picU.hasBg = true
        picU.bg = style.Button.bg
        picU.origin = CENTER_CENTER
        picU.da = 180
        picU.target = 180
        picU.open = true

        picU.mousepressed = function(x, y, b){
            if (b == 1) {
                if (this.open) {
                    this.open = false
                    if (twork.length == 2) {
                        for (const o of twork) {
                            if (o.enabled) {
                                o.target = 180
                                o.open = true
                            }
                        }
                        twork = []
                    }
                    twork.push(this)
                }else{
                    this.open = true
                    let ii = twork.indexOf(this)
                    if (ii > -1) {
                        twork.splice(ii, 1)
                    }
                }
                this.target = floor(this.target) == 0?180 :0
                
                if (twork.length == 2) {
                    let a = (twork[0].id)
                    let b = (twork[1].id)
                    if (a == b) {
                        twork[0].enabled = false
                        twork[1].enabled = false
                        fireWorks(
                            view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)   
                    }
                    
                }

                //check
                let chek = true
                for (const o of tobject) {
                    if (o.enabled) {
                        chek = false
                    }
                }

                if (chek) {
                    setTimeout(function(){
                        Active8(sec)
                    }, 200)
                }
            }
        }

        picU.update = function(){
            this.da += (this.target - this.da) * 0.05
    
            let im = bcard
            let v = 100
            if (cosdeg(this.da) <= 0 && cosdeg(this.da) >= -1) {
                im = rs[this.id].image
                v = -100
            }
    
            this.sx = v * cosdeg(this.da)
            this.sy = 100 + 20  * sindeg(this.da)
    
    
            this.image = im
        }
        e.insert(picU)
        tobject.push(picU)
    }


    view.insert(e)
}

Actives.push(Active8)



function Active9(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    let img = rs[corectId].image
    if (playSound) {
        playSound.stop()
    }
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw*2)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    bcard = newImage('AppRes/res/bcard.png') 
    let uIndex = randomTable([0, 1, 2])  
    let twork = []
    let tobject = []
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)
        let pic = new Pictur(o.image, x+iw/2, -iw/2, iw, iw)
        pic.id = i
        pic.hasBg = true
        pic.bg = style.Button.bg
        pic.origin = CENTER_CENTER
        pic.da = 180
        pic.target = 180
        pic.open = true
        pic.mousepressed = function(x, y, b){
            if (b == 1) {
                if (this.open) {
                    this.open = false
                    if (twork.length == 2) {
                        for (const o of twork) {
                            if (o.enabled) {
                                o.target = 180
                                o.open = true
                            }
                        }
                        twork = []
                    }
                    twork.push(this)
                }else{
                    this.open = true
                    let ii = twork.indexOf(this)
                    if (ii > -1) {
                        twork.splice(ii, 1)
                    }
                }
                this.target = floor(this.target) == 0?180 :0
                
                if (twork.length == 2) {
                    let a = (twork[0].id)
                    let b = (twork[1].id)
                    if (a == b) {
                        twork[0].enabled = false
                        twork[1].enabled = false
                        fireWorks(
                            view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)   
                    }
                    
                }

                //check
                let chek = true
                for (const o of tobject) {
                    if (o.enabled) {
                        chek = false
                    }
                }

                if (chek) {
                    setTimeout(function(){
                        Active9(sec)
                    }, 200)
                }
            }
        }
        pic.update = function(){
            this.da += (this.target - this.da) * 0.05
    
            let im = rs[this.id].image
            let v = 100
            if (cosdeg(this.da) <= 0 && cosdeg(this.da) >= -1) {
                im = bcard
                v = -100
            }
    
            this.sx = v * cosdeg(this.da)
            this.sy = 100 + 20  * sindeg(this.da)
    
    
            this.image = im
        }
        e.insert(pic)
        tobject.push(pic)
        let picU = new Pictur(rs[uIndex[i]].image, x+iw/2, iw/2, iw, iw)
        picU.id = uIndex[i]
        picU.hasBg = true
        picU.bg = style.Button.bg
        picU.origin = CENTER_CENTER
        picU.da = 180
        picU.target = 180
        picU.open = true

        picU.mousepressed = function(x, y, b){
            if (b == 1) {
                if (this.open) {
                    this.open = false
                    if (twork.length == 2) {
                        for (const o of twork) {
                            if (o.enabled) {
                                o.target = 180
                                o.open = true
                            }
                        }
                        twork = []
                    }
                    twork.push(this)
                }else{
                    this.open = true
                    let ii = twork.indexOf(this)
                    if (ii > -1) {
                        twork.splice(ii, 1)
                    }
                }
                this.target = floor(this.target) == 0?180 :0
                
                if (twork.length == 2) {
                    let a = (twork[0].id)
                    let b = (twork[1].id)
                    if (a == b) {
                        twork[0].enabled = false
                        twork[1].enabled = false
                        fireWorks(
                            view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)   
                    }
                    
                }

                //check
                let chek = true
                for (const o of tobject) {
                    if (o.enabled) {
                        chek = false
                    }
                }

                if (chek) {
                    setTimeout(function(){
                        Active9(sec)
                    }, 200)
                }
            }
        }

        picU.update = function(){
            this.da += (this.target - this.da) * 0.05
    
            let im = rs[this.id].image
            let v = 100
            if (cosdeg(this.da) <= 0 && cosdeg(this.da) >= -1) {
                im = bcard
                v = -100
            }
    
            this.sx = v * cosdeg(this.da)
            this.sy = 100 + 20  * sindeg(this.da)
    
    
            this.image = im
        }
        e.insert(picU)
        tobject.push(picU)
    }


    view.insert(e)
}

Actives.push(Active9)


//Active10
function Active10(sec) {
    view.childs = []
    let n = sec.length
    let rs = PickRandomTable(sec, n < 10 ? n-1 : 9)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }

    let iw = 100
    if (view.width < 300) {
        iw = (view.width/3)
    }

    let e = new moveClip(0, 0, iw * 3, iw*2)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    // //

    for (let i = 0; i < 3; i++) {
        let x = -ox + (i*iw) + iw/2
        let m = new MenuView(x, 0, iw, iw*2)
        m.bg = style.Button.bg
        m.direction = 'v'
        for (let o of rs) {
            let im = new Pictur(o.image, 0, 0, 100, 100)
            im.hasBg = true
            im.bg = style.bg
            m.addItem(im)
        }
        m.setDisplayItem(3)
        m.setIndex(1)
        m.enableOpacityRoll = true
        m.valueofopacity = 40
        m.showLine = false
        m.dump = 0.96
        m.enabled = i == 1
        if (i == 1) {
            let index = 1
            while (true) {
                index = round(random(1, rs.length)) - 1
                if (index != 1 ) {
                    break
                }
            }
            m.setIndex(index)

            m.onChange = function(ind){
                if (ind == 1) {
                    fireWorks(
                        view, 0, 0, radiusOfFireWorks, numberOfFireWorks)
                    setTimeout(() => {
                        Active10(sec)
                    }, 600);
                }
            }
        }
        e.insert(m)
    }
    bcard = newImage('AppRes/res/bcard.png') 

    view.insert(e)
}

Actives.push(Active10)


//Active11
function Active11(sec) {
    view.childs = []
    let n = sec.length
    let rs = PickRandomTable(sec, n < 10 ? n-1 : 9)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }

    let iw = 100
    if (view.width < 300) {
        iw = (view.width/3)
    }

    let e = new moveClip(0, 0, iw * 3, iw*2)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    // //

    for (let i = 0; i < 3; i++) {
        let x = -ox + (i*iw) + iw/2
        let m = new MenuView(x, 0, iw, iw*2)
        m.bg = style.Button.bg
        m.direction = 'v'
        for (let o of rs) {
            let im = new Pictur(o.image, 0, 0, 100, 100)
            im.hasBg = true
            im.bg = style.bg
            m.addItem(im)
        }
        m.setDisplayItem(3)
        m.setIndex(1)
        m.enableOpacityRoll = true
        m.valueofopacity = 40
        m.showLine = false
        m.dump = 1
        m.acc = -QUARTER_PI*4
        m.enabled = false
        e.insert(m)
    }
    bcard = newImage('AppRes/res/bcard.png') 

    e.value = -1
    e.mousepressed = function(x, y, b){
        if (b == 1) {
            this.value ++
            if (this.childs[2-this.value]) {
                this.childs[2-this.value].acc = 0
            }
            


            let check = true 
            let one = this.childs[0]
            for (const o of this.childs) {
                if (abs(o.acc) > 0 ) {
                    check = false
                    break
                }

                if (o.index != one.index) {
                    check = false
                    break
                }
            }

            if (check) {
                fireWorks(
                    view, 0, 0, radiusOfFireWorks, numberOfFireWorks)

            }

            if (this.value == 2) {
                this.enabled = false
                setTimeout(() => {
                    Active11(sec)
                }, 800);
            }
            
        }
    }
    view.insert(e)
}

Actives.push(Active11)



function Active12(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    let img = rs[corectId].image
    if (playSound) {
        playSound.stop()
    }
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw*3)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    bcard = newImage('AppRes/res/bcard.png') 
    let uIndex = randomTable([0, 1, 2])  
    let twork = []
    let tobject = []
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)
        let pic = new Pictur(o.image, x+iw/2, -iw, iw, iw)
        pic.id = i
        pic.hasBg = true
        pic.bg = style.Button.bg
        pic.origin = CENTER_CENTER
        pic.mousepressed = function(x, y, b){
            if (b == 1 && !this.to && !this.used)  {
                this._parent_.one = this
            }
        }

        pic.onEnter = function(){
            this._parent_.two = this
        }
        e.insert(pic)
        tobject.push(pic)

        let picU = new Pictur(rs[uIndex[i]].image, x+iw/2, iw, iw, iw)
        picU.id = uIndex[i]
        picU.hasBg = true
        picU.bg = style.Button.bg
        picU.origin = CENTER_CENTER
        picU.mousepressed = function(x, y, b){
            if (b == 1 && !this.to && !this.used) {
                this._parent_.one = this
            }
        }
        picU.onEnter = function(){
            this._parent_.two = this
        }
        e.insert(picU)
        tobject.push(picU)
    }

    e.drawafter = function(){
        strokeWeight(2)
        if (this.one) {
            stroke(255)
            line(this.mx, this.my, this.one.x, this.one.y)
        }

        let n = 0
        for (let o of this.childs) {
            if (o.to) {
                n++
                stroke(255)
                line(o.x, o.y, o.to.x, o.to.y) 
            }
        }
        if (n >= 3 && !this.win) {
            this.win = true
            fireWorks(
                view, 0, 0, radiusOfFireWorks, numberOfFireWorks)
            setTimeout(() => {
                Active12(sec)
            }, 800);
        }
        // print(n)
    }

    e.mousereleased = function(x, y, b){
        if (b == 1) {
            if (this.one && this.two && this.two != this.one ) {
                if (this.one.id == this.two.id) {
                    this.one.to = this.two
                    this.two.used = true
                }
            }
            this.one = null
            this.two = null
        }
        
    }
    e.update = function(x, y, dx, dy){

    }
    view.insert(e)
}

Actives.push(Active12)


//

function Active13(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    let img = rs[corectId].image
    let rndNum = round(random(1, 10)) 
    if (playSound) {
        playSound.stop()
    }

    let Numbers = []
    for (let i = 1; i <= 10; i++) {
        let im = newImage('AppRes/res/2/' + i + '.png')
        Numbers.push(im)
    }
    



    let w = 100
    if (view.width < 300) {
        w = (view.width/3)
    }
    
    let e = new moveClip(0, 0, w * rs.length, w*3)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let iw = (e.width/12)
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height

    while (e.childs.length != rndNum) {
        let ww = e.width - iw
        let hh = e.height - iw - 100
        let x = random(-ww/2, ww/2)
        let y = random(-hh/2, hh/2)-50
        let is = true 
        for (let o of e.childs) {
            let xdiff = o.x - x
            let ydiff = o.y - y
            let d = sqrt(xdiff*xdiff + ydiff*ydiff)
            if (d < iw + 2) {
                is = false
                break
            }
        }

        if (is) {
            let pic = new Pictur(img, x, y, iw, iw)
            pic.hasBg = true
            pic.bg = style.Button.bg
            pic.origin = CENTER_CENTER
            pic.enabled = false
            e.insert(pic)
        }
    }

    let images_Numbers = []
    images_Numbers.push(rndNum)
    
    while (images_Numbers.length != 3) {
        let n = round(random(1, 10)) 
        if (n != rndNum) {
            images_Numbers.push(n)
        }
    }
    let uIndex = randomTable([0, 1, 2]) 
    for (let i in images_Numbers) {
        let v = images_Numbers[uIndex[i]]
        let w = e.width/3
        let x = -ox + (i*w)
        let pic = new Pictur(Numbers[v-1], x+w/2, e.height/2-50, w, 100)
        pic.id = v
        pic.hasBg = true
        pic.bg = style.Button.bg
        pic.origin = CENTER_CENTER
        pic.opacity = 100
        pic.mousepressed = function(x, y, b){
            if (this.id == rndNum) {
                fireWorks(
                    view, 0, 0, radiusOfFireWorks, numberOfFireWorks)
                    setTimeout(() => {
                        Active13(sec)
                    }, 600);
            }
        }
        e.insert(pic)
    }
    view.insert(e)
}

Actives.push(Active13)


function Active14(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }
    let audio = rs[corectId].audio
    audio.play()
    playSound = audio
    // //
    bcard = newImage('AppRes/res/bcard.png') 
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw*3)
    e.origin = CENTER_CENTER
    e.clip = true
    e.bg = style.bg

    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height

    let sumCorrect = 0
    let numofCorrect = 0
    let childs = []

    for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 3; i++) {
            let x = -ox + (i*iw)
            let y = -oy + (j * iw)
            let index = round(random(1, rs.length)) - 1

            if (index == corectId) {
                sumCorrect++
            }


            let picbg = new Pictur(bcard, x, y, iw, iw)
            picbg.hasBg = false
            picbg.enabled = false
            // e.insert(picbg)


            let pic = new Pictur(rs[index].image, x, y, iw, iw)
            pic.id = index
            pic.hasBg = false
            let im = null
            
            for (const k in myProject.images) {
                if (myProject.images[k] == rs[index].image) {
                    // print(k)
                    if (!myProject.gimages[k]) {
                        im = loadImage(k)
                        myProject.gimages[k] = im
                    }else{
                        im = myProject.gimages[k]
                    }
                    
                }
                
            }
            // im.filter(GRAY)
            pic.filter = GRAY
            pic.image = im
            pic.baseImage = rs[index].image
            childs.push(pic)

            pic.mousepressed = function(x, y, b) {
                if (b == 1) {
                    this.opacity = 50
                    if (this.id == corectId) {
                        numofCorrect++
                        this.filter = null
                        // this.filter = GRAY
                        this.enabled = false
                        this.image = this.baseImage
                        // this.imageColor = [255, 0, 0, 255]
                        fireWorks(view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)

                     }
                 }

                 if (sumCorrect == numofCorrect) {
                    setTimeout(function(){
                        Active14(sec)
                    }, 600)
                 } 
            }

            pic.mousereleased = function(x, y, b) {
                this.opacity = 100
            }
            e.insert(pic)
        }
    }

   
    // check 

    let num = 0
    for (let o of childs) {
        if (o.id != corectId) {
            num++
        }
    }

    // print(num, corectId)
    if (num == 9) {
       let ri = round(random(1, 9))-1
       childs[ri].image = rs[corectId].image
       childs[ri].id = corectId 
       sumCorrect = 1
    }

    view.insert(e)

    
}

Actives.push(Active14)





function Active15(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }

    // let audio = rs[corectId].audio
    // audio.play()
    // playSound = audio
    
    let scondImageIndex 

    while (true ) {
        scondImageIndex = round(random(1, rs.length)) - 1
        if (scondImageIndex != corectId) {
            break
        }
    }
    
    for (let i in rs) {
        if (i != corectId) {
            rs[i] = rs[scondImageIndex]
        }
    }

    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, 0, iw * rs.length, iw)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    // //
    bcard = newImage('AppRes/res/bcard.png') 
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)
        let picbg = new Pictur(bcard, x, -iw/2, iw, iw)
        picbg.hasBg = false
        picbg.enabled = false
        e.insert(picbg)
        let pic = new Pictur(o.image, x, -iw/2, iw, iw)
        pic.id = i
        pic.hasBg = false
        pic.timeontap = 800
        pic.mousepressed = function(x, y, b) {
            this.opacity = 50
            this.enabled = false
            if (this.id == corectId) {
                this.move = true
                fireWorks(view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
            }
        }
        pic.ontap = function(o, x, y, b) {
            o.enabled = true
            if (o.id == corectId) {
                Active15(sec)
            }
        }
        pic.mousereleased = function(x, y, b) {
            this.opacity = 100
        }

        pic.update = function(){
            if (this.move && this.id == corectId) {
                this.y += (-200 - this.y)*0.2
            }
        }
        e.insert(pic)
    }
    view.insert(e)
}

Actives.push(Active15)


function Active16(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    for (let i in rs) {
        rs.push(rs[i])
    }


    let corectId = round(random(1, rs.length)) - 1
    let img = rs[corectId].image
    if (playSound) {
        playSound.stop()
    }


    let w = 100
    if (view.width < 300) {
        w = (view.width/6)
    }

    let iw = w / 3
    let e = new moveClip(0, 0, w *3, w*3)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    bcard = newImage('AppRes/res/bcard.png') 
    let uIndex = randomTable([0, 1, 2])  
    let twork = []
    let tobject = []
    for (let i in rs) {
        let o = rs[i]
        let x = 0
        let y = 0
        while (true) {
            let WW = e.width - iw
            let HH = e.height - iw
            let px = random(-WW/2, WW/2)
            let py = random(-HH/2, HH/2)
            let check = true
            for (let o of e.childs) {
                let xdiff = o.x - px 
                let ydiff = o.y - py
                let d = sqrt(xdiff*xdiff + ydiff*ydiff)
                if (d <= iw) {
                    check = false
                    break
                }
            }

            if (check) {
                x = px 
                y = py
                break
            }
        }

        let pic = new Pictur(o.image, x, y, iw, iw)
        pic.id = i%3
        pic.hasBg = true
        pic.bg = style.Button.bg
        pic.origin = CENTER_CENTER
        pic.shape = 2
        pic.mousepressed = function(x, y, b){
            if (b == 1 && !this.to && !this.used) {
                this._parent_.one = this
            }
        }

        pic.onEnter = function(){
            this._parent_.two = this
        }
        e.insert(pic)
        tobject.push(pic)

  
    }

    e.drawafter = function(){
        strokeWeight(2)
        if (this.one) {
            stroke(255)
            line(this.mx, this.my, this.one.x, this.one.y)
        }

        let n = 0
        for (let o of this.childs) {
            if (o.to) {
                n++
                stroke(255)
                line(o.x, o.y, o.to.x, o.to.y) 
            }
        }
        if (n >= 3 && !this.win) {
            this.win = true
            fireWorks(
                view, 0, 0, radiusOfFireWorks, numberOfFireWorks)
            setTimeout(() => {
                Active16(sec)
            }, 800);
        }
        // print(n)
    }

    e.mousereleased = function(x, y, b){
        if (b == 1) {
            if (this.one && this.two && this.two != this.one ) {
                if (this.one.id == this.two.id) {
                    this.one.to = this.two
                    this.two.used = true
                }
            }
            this.one = null
            this.two = null
        }
        
    }
    e.update = function(x, y, dx, dy){

    }
    view.insert(e)
}

Actives.push(Active16)




function Active17(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    for (let i in rs) {
        rs.push(rs[i])
    }


    let corectId = round(random(1, rs.length)) - 1
    let img = rs[corectId].image
    if (playSound) {
        playSound.stop()
    }

    let w = 100
    if (view.width < 300) {
        w = (view.width/6)
    }

    let iw = w / 3
    let e = new moveClip(0, 0, w *3, w*3)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    bcard = newImage('AppRes/res/bcard.png') 
    let uIndex = randomTable([0, 1, 2])  
    let twork = []
    let tobject = []
    let front_image = []
    for (let i in rs) {
        let o = rs[i]
        let x = 0
        let y = 0
        while (true) {
            let WW = e.width - iw
            let HH = e.height - iw
            let px = random(-WW/2, WW/2)
            let py = random(-HH/2, HH/2)
            let check = true
            for (let o of e.childs) {
                let xdiff = o.x - px 
                let ydiff = o.y - py
                let d = sqrt(xdiff*xdiff + ydiff*ydiff)
                if (d <= iw) {
                    check = false
                    break
                }
            }

            if (check) {
                x = px 
                y = py
                break
            }
        }

        let im
        for (const k in myProject.images) {
            if (myProject.images[k] == o.image) {
                // print(k)
                if (!myProject.gimages[k]) {
                    im = loadImage(k)
                    myProject.gimages[k] = im
                }else{
                    im = myProject.gimages[k]
                }
                
            }
            
        }

        let pic = new Pictur(o.image, x, y, iw, iw)
        pic.id = i%3
        pic.hasBg = true
        pic.image = i<3?o.image:im
        pic.bg = style.Button.bg
        pic.origin = CENTER_CENTER
        pic.shape = 2
        pic.filter = i < 3 ? null:GRAY
        pic.idx = i < 3 ? i:-1
        // pic.enabled = i < 3
        // pic.opacity = i < 3 ? 100:25
        // pic.imageColor = i < 3 ? color(255):color(255, 100)
        if (i<3) {
            front_image.push(pic)
        }
        pic.mousepressed = function(x, y, b){
            if (b == 1 && this.idx >= 0) {
                let parent = this._parent_
                let n = parent.childs.length
                parent.one = this
                this.idx = 2
                let j = 0
                for (let o of front_image) {
                    if (o.id != this.id) {
                        o.idx = j
                     j++   
                    }
                }
            }
        }
        e.insert(pic)
        tobject.push(pic)
    }

    e.drawbefor = function(){
        this.childs.sort((a, b) => {
            return a.idx - b.idx
        })
    }

    e.mousemoved = function(x, y, dx, dy){
        if (this.clicked && this.one) {
            this.one.x = this.mx
            this.one.y = this.my
        }
    }

    e.sum = 0
    e.mousereleased = function(x, y, b){
        if (b == 1) {
            let two
            for (const o of this.childs) {
                if (o != this.one && this.one.id == o.id && o.isOver()) {
                    two = o
                    this.one.enabled = false
                }
            }

            if (two) {
                this.sum++
                this.one.x = two.x
                this.one.y = two.y
            }else{
                this.one.x = this.one.baseX
                this.one.y = this.one.baseY
            }

            this.one = null
            if (this.sum >= 3 ) {
                this.enabled = false
                fireWorks(
                    view, 0, 0, radiusOfFireWorks, numberOfFireWorks)
                setTimeout(() => {
                    Active17(sec)
                }, 800);
            }
        }
        
    }
    
    view.insert(e)
}

Actives.push(Active17)





//Active18
function Active18(sec) {
    view.childs = []
    let rs = PickRandomTable(sec, 3)
    let corectId = round(random(1, rs.length)) - 1
    if (playSound) {
        playSound.stop()
    }
    let audio = rs[corectId].audio
    audio.play()
    playSound = audio
    let iw = 100
    if (view.width < 300) {
        iw = (view.width/rs.length)
    }

    let e = new moveClip(0, iw/2, iw * rs.length, iw*4)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = style.bg
    e.hasBg = false
    e.index = round(random(1, rs.length)) - 1
    e.indexImage = round(random(1, rs.length)) - 1
    
    let ox = e.origin.x * e.width
    let oy = e.origin.y * e.height
    // //
    let imgW = iw/2
    let pic = new Pictur(rs[corectId].image, 0, -view.origin.y * view.height + imgW, imgW, imgW)
    pic.shape = 2
    pic.hasBg = true
    pic.enabled = false
    view.insert(pic)

    let backImages = []
    bcard = newImage('AppRes/res/bcard.png') 
    for (let i in rs) {
        let o = rs[i]
        let x = -ox + (i*iw)
        let picbg = new Pictur(o.image, x, -iw/2+2, iw, iw-4)
        picbg.hasBg = true
        picbg.enabled = true
        picbg.bg = style.Button.bg
        picbg.id = i
        picbg.mousepressed = function(x, y, b){
            if (this.id == corectId) {
                e.enabled = false
                fireWorks(
                    view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
                    setTimeout(() => {
                        Active18(sec)
                    }, 800);
            }
        }
        backImages.push(picbg)
        e.insert(picbg)


        let pic = new Pictur(bcard, x, -iw/2, iw, iw)
        pic.id = i
        pic.hasBg = false
        pic.enabled = true
        e.insert(pic)
    }

    e.target = 0
    e.status = true

    e.update = function(){
        if (!this.enabled) {
            return
        }
        let indexPlace = this.index
        let indeximage = this.indexImage
        let o = backImages[indexPlace]
        for (const v of backImages) {
            v.id = -1 
            v.image = null
        }
        o.image = rs[indeximage].image
        o.id = indeximage
        this.target = this.status? (-iw - iw/2): (-iw/2)
        this.da = this.status? 0.06: 0.1
        o.y += (this.target -o.y)*this.da

        if (abs(floor(this.target - o.y)) <= 1 ) {
            o.y = this.target
            this.status = !this.status 
            if (this.status) {
                this.index = round(random(1, rs.length)) - 1
                this.indexImage = round(random(1, rs.length)) - 1
            }
        }


    }
    view.insert(e)
}

Actives.push(Active18)







//


//Active19
function Active19(sec) {
    view.childs = []
    let corectId = round(random(1, sec.length)) - 1
    if (playSound) {
        playSound.stop()
    }

    let audio = sec[corectId].audio
    audio.play()
    playSound = audio

    bcard = newImage('AppRes/res/bcard.png') 

    function item(e, iw, ih){
        if (e.childs.length > 11) {
            return
        }
        let w = e.width
        let h = e.height
        let x = random(-w/2 + iw/2, w/2 - ih/2)
        let y = random(-h, -h/2-ih)
        let index = round(random(1, sec.length)) - 1
        let o = new Pictur(sec[index].image, x, y, iw, ih)
        o.id = index
        o.hasBg = true 
        o.shape = 2 
        o.bg = style.Button.bg
        o.vy = 0.5
        o.update = function(){
            this.y += +this.vy
            if (this.y > e.height/2 + this.height) {
                let w = e.width  
                let h = e.height  
                let index = round(random(1, sec.length)) - 1
                this.image = sec[index].image
                this.id = index
                this.x = random(-w/2 + this.width/2, w/2 - this.width/2) 
                this.y = random(-h, -h/2-this.height) 
            }
        }
        e.insert(o)
    }
    let e = new moveClip(0, 0, view.width, view.height)
    e.origin = CENTER_CENTER
    e.clip = false
    e.bg = [100]//style.bg
    e.hasBg = false

    let iw = 50
    let ox = view.origin.x * view.width
    let oy = view.origin.y * view.height

    let pic = new Pictur(sec[corectId].image, -ox + iw/2, -oy + iw/2, iw, iw)
    pic.shape = 2
    pic.hasBg = true
    pic.enabled = false
    e.insert(pic)

    e.target = vec2(0, 0)
    let fishIm = newImage('AppRes/res/fish.png')
    let fish = new Pictur(fishIm, 0, 0, iw, iw)
    fish.origin = CENTER_CENTER
    fish.hasBg = false
    fish.fixed = true
    fish.imageColor = color('hsl(200, 100%, 50%)')
    
    fish.update = function(){
        let parent = this._parent_
        let target = parent.target

        let xdiff =  target.x - this.x
        let ydiff =  target.y - this.y

        let t = 0.05
        this.x += xdiff * t
        this.y += ydiff * t

        this.angle = degrees(atan2(ydiff, xdiff)) 
        let n = parent.childs.length
        let o = parent.childs[n - 1]
        let i = parent.childs.indexOf(this)
        parent.childs[i] = o
        parent.childs[n - 1] = this
    }
    e.insert(fish)
    

    e.update = function(){
        if (!this.enabled) {
            return
        }
        if ( round(random(1, 20)) == 20) {
            item(this, iw, iw)
        }

        if (this.clicked) {
            this.target = vec2(this.mx, this.my)
        }


        for (let o of this.childs) {
            let xdiff =  fish.x - o.x
            let ydiff =  fish.y - o.y
            let d = sqrt(xdiff*xdiff + ydiff*ydiff)
            if (d <= o.width && !o.fixed && o.id == corectId) {
                let ii = this.childs.indexOf(o)
                if (ii>-1) {
                    this.childs.splice(ii, 1)
                }
                this.enabled = false
                fireWorks(
                    view, view.mx, view.my, radiusOfFireWorks, numberOfFireWorks)
                    setTimeout(() => {
                        Active19(sec)
                    }, 800);
            }
        }
    }

    view.insert(e)
}

Actives.push(Active19)