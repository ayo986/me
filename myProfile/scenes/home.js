let scene = new Scene()
let aboutImage
let items_txt = [
    'Kurzprofil',
    'Persönliche Daten',
    'Sprachkenntnisse',
    'Programmiersprachen',
    'EDV-Kenntnisse',
    'Interessen',
    'Ausbildung',
    'Berufliche Entwicklung',
    'Kontakt',
]
let icons = [
    59389, 
    61504, //59485, //59568, //59965,
    59493, //63628 59965 59978 59853 59724
    63722,

    57457,//59853,
    59515, //59724,

    59404,
    59621,
    58156
]

let data
let menubar, pview
let state = true
let stars_field 
scene.setup = function(){
    let adresse = newImage('res/icons/2.png')
    let mail = newImage('res/icons/1.png')
    let tel = newImage('res/icons/4.png')
    let ar = newImage('res/icons/ara.png')
    let en = newImage('res/icons/eng.png')
    let de = newImage('res/icons/de.png')
    data = [
        [
            {lable: '', text:`• Gute Kenntnisse und Erfahrung in der Programmierung, deren Konzepte, Terminologie und einiger Programmiersprachen`},
            {lable: '', text:`• Programmierung und Entwicklung von Anwendungen, Spielen, Websites und GUI`},
            {lable: '', text:`• Die Fähigkeit, systematisch zu lernen und zu arbeiten`},
            {lable: '', text:`• Problem-Analyse und finden der besten logischen Lösungen`},
        ],
        [
            {
                lable:'', text:`• Geburtsdatum / Ort
    28.05.1986 / Syrian in Deir Alzor`,
            },
            {
                lable:'', text:`• Familien stand 
                verheiratet`,
            },
            {
                lable:'', text:`• Staatsangehörigkeit
                syrisch`,
            },
        ],
    
        [
            {
                lable:'', text:`• Arabisch (Muttersprache)`,
                imageIcon: ar,
            },
    
            {
                lable:'', text:`• Deutsch (B2-Zertifikat)`,
                imageIcon: de,
            },
    
            {
                lable:'', text:`• Englisch (Grundlagen Kenntnisse)`,
                imageIcon: en,
            },
    
        ],
    
    
        [
            {
                lable:'', text:`• Java script - p5 library (gut)`,
                imageIcon:newImage('res/icons/js.png'),
                imageColor:[255]
                
            },
            {
                lable:'', text:`• Html / Css (Grundlagen Kenntnisse)`,
                imageIcon:newImage('res/icons/html.png'),
                imageColor:[255]
            },
            {
                lable:'', text:`• Lua script (gut)`,
                imageIcon:newImage('res/icons/lua.png'),
                imageColor:[255]
            },
    
            {
                lable:'', text:`• Sqlite und Mysql (gut)`,
                imageIcon:newImage('res/icons/sql.png'),
                // imageColor:[255]
            },
    
            {
                lable:'', text:`• Java (Grundlagen Kenntnisse)`,
                imageIcon:newImage('res/icons/java.png'),
                imageColor:[255]
            },
    
            {
                lable:'', text:`• Python (Grundlagen Kenntnisse)`,
                imageIcon:newImage('res/icons/python.png'),
                imageColor:[255]
            },
            {
                lable:'', text:`• Php (Grundlagen Kenntnisse)`,
                imageIcon:newImage('res/icons/php.png'),
                imageColor:[255]
            },
        ],
    
        [
            {
                lable:'', text:`• MS-Office (Word - Excel - PowerPoint) (gut)`,
            },
    
            {
                lable:'', text:`• Photoshop (gut)`,
            },
            {
                lable:'', text:`• Allgemeine Kenntnisse der meisten Windows Systemprogramme (Grundlagen Kenntnisse)`,
            },
        ],
    
        [
            {
                lable:'', text:`• Programmierung und ihre Sprachen sowie Vergleich zwischen ihnen.`,
            },
    
            {
                lable:'', text:`• Mathematik, Rechnen und Physik`,
            },
        ],
    
    
        [
            {
                lable:'', text:`• 2006 - 2011 
                Jura an der Universität in Syrian mit Abschluss (aber ich habe sie nicht erhalten)`,
            },
    
            {
                lable:'', text:`• 2004 - 2005 
                Allgemeinbildender Schulabschluss (Wissenschaftlich) Der Schulabschluss ist vergleichbaren mit der allgemeinen Hochschulreife in Deutschland (2.2)`,
            },
        ],
    
        [
            {
                lable:'', text:`• 03.2024 - 08.2024 
                Deutsche Angestellten-Akademie, Kiel Vorbereitungskurs zur betrieblichen Umschulung`,
            },
            {
                lable:'', text:`• Allgemeine Wirtschaftslehre • Deutsch und Rechtschreibung • Mathematik und Rechnungswesen • IT- und Medienkompetenz`,
            },
            {
                lable:'', text:`• 02.2023 - 08.2023 
                Deutsch (B2 - Zertifikat)`,
            },
    
            {
                lable:'', text:`• 02.2019 - 07.2019 
                Deutsch (B1 - Zertifikat)`,
            },
            {
                lable:'', text:`• 10.2015 - 11.2018 
                Aufenthaltstitel-Phase`,
            },
    
            {
                lable:'', text:`• 09.2014 - 06.2015 Syrische Flüchtlingsschule (Türkei)
    Mathematik lehrer für die fünfte und sechste Klasse`,
            },
        ],
    
        [
            {
                lable:'', text:`• Adresse: 
                Elisabethstr 18A 24143 Kiel, DE`,
                imageIcon:adresse,
            },
    
            {
                lable:'', text:`• Mobile: 
                +4917621215043`,
                imageIcon: tel,
            },
    
            {
                lable:'', text:`• E-mail: 
                ah.ayo.986@gmail.com`,
                imageIcon:mail,
            },
        ],
    
    ]
  this.childs = []
//   this.bg = 'hsl(210, 20%, 15%)'
    style = state?styleDark:styleLight
    this.bg = style.bg
    bg = newImage('res/bg/bdev02.jpg')
    bg1 = newImage('res/bg/bdev07.jpg')
    aboutImage = newImage('res/photo.jpg')
    aboutImage1 = newImage('res/photo2.jpg')
    this.images = []
    this.images.push(bg)
    this.images.push(bg1)
    // this.bgImage = bg
    let iw = width * 0.3 //min(width, height) *0.4
    iw = constrain(iw, 50, 200)
    let con = new moveClip({
        x: 0, y: 0, width: width, height: iw + 50,
        bg: style.Button.bg,
        bgImage: state ? bg: bg1,
        // hasBg: false,
        // clip:false,
        bgColorImage: state ? color(100) : color(255)
    })
    this.con = con
    this.pack(con)
    
    
    stars_field = new starsField({
        x:con.width/2, y: con.height/2, width: width, height: con.height,
        total: 100,
        fg: style.lineColor,
        maxOpacity: 50,
    })
    con.pack(stars_field)
    let im = new imPictur(
        {
            shape: 2,
            x: (iw)/2 + 10, y: iw/2+10, width: iw, height: iw,
            corner:[10],
            image: state ?aboutImage1 : aboutImage,
            opacity: state?60:70,
            // shadowBlur: 10,
        }
    )
    con.pack(im)

    //
    let rw = con.width - iw
    let rx = rw/2 + iw
    let txt = new Text({
        textAlign: [CENTER, CENTER],
        origin: CENTER_CENTER,
        hasBg: false,
        text:'Fachinformatiker',
        x: cx, y: iw/2 - 15,
        width: width,
        height: 60,
        fontSize:26,
        // outLineColor: 'hsl(17, 47.20%, 42.40%)',
        // fg:'hsl(43, 93.30%, 29.20%)',
        weight: 3,
        // fg:style.lineColor,
        fg: 'hsl(30, 85.20%, 34.50%)',
        clip:false,
    })
    con.pack(txt)

    let txt2 = new Text({
        origin: CENTER_CENTER,
        textAlign: [CENTER, CENTER],
        hasBg: false,
        text:'Anwendungsentwicklung',
        x: txt.x, y: txt.y + 24,
        width: width,
        height: 30,
        fontSize:16,
        weight: 2,
        clip:false,
        // fg:'hsl(117, 82.70%, 33.90%)',
        // fg: style.lineColor,
        // fg:style.lineColor,
        // fg: style.fg
    })
    con.pack(txt2)
    let txtname = new Text({
        origin: CENTER_CENTER,
        hasBg: false,
        textAlign: [CENTER, CENTER],
        text:'Ahmed, Alissa Alyounis',
        x: txt.x, y: txt.y + 46,
        width: width,
        height: 30,
        fontSize: 14,
        clip:false,
        fg: style.lineColor,
        // fg: 'hsl(213, 99.10%, 53.90%)'
        
    })
    con.pack(txtname)




    

    let w = min(cx, cy)

    
    // this.pack(list)
    let txtView = new Text({
        origin: CENTER_CENTER,
        hasBg: false,
        textAlign: [CENTER, CENTER],
        text:'',
        x: cx, y: con.y + con.height - 30 ,
        width: width,
        height: 40,
        fontSize: 20,
        clip:false,
        corner:[],
        // fg: style.lineColor,
        // fg: 'hsl(127, 87.50%, 31.40%)'
        // fg:style.lineColor
        fg: 'hsl(165, 58.40%, 34.90%)',
        // fg: style.lineColor,
        // fg: [200]
    })
    this.pack(txtView)

    let mbg = new moveClip({
        origin: CENTER_CENTER,
        x: cx,
        y: con.y + con.height + 25,
        width: width, height: 50,
        // hasBg: false,
        clip:false,
        // bg:[200],
        // bg: 'hsl(211, 21.90%, 36.70%)'

    })
    this.pack(mbg)


    menubar = new menuBar({
        origin: CENTER_CENTER,
        width: con.width - iw,
        height: 40,
        hasBg:false,
        x: 0,
        y: 0,

        // ylen: 10,
        // scaling: false,
        // bg: 'hsl(220, 64.10%, 28.40%)',
        // bg: 'hsl(328, 44.60%, 29.00%)',
        noRect: false,
        update: function () {
            let p = this.Parent()
            this.width = p.width < 300 ? p.width : 300
        },
    })
    mbg.pack(menubar)
    
    
    for (let i in items_txt) {
        let m = new moveClip({
            bg: style.Button.bg,
            hasBg: false,
        })
        let txt = String.fromCharCode(icons[i]) 
        let b = new Button({
            x: 0, y: 0,
            id: i,
            textAlign:[CENTER, CENTER],
            // shape: 2,
            // width: 40, height:40,
            text: txt,
            lable: items_txt[i],
            hasBg: false,
            font: materialFont,
            font2: 'arial',
            fontSize: 30,
            fontSize2: 14,
            iconSize: 0,
            fg: style.lineColor,
            // bg: 'hsl(210, 57.50%, 52.90%)',
            corner: [],
        })
        b.mousepressed = function (x, y, b) {
            if (b == 1) {
                let p = this.Parent()
                onChange(p.index)
            }

        }
        menubar.pack(b)
    }
    

    let hh = con.height + mbg.height

    pview = new thumbListView({
        origin: TOP_LEFT,
        width: width * 0.96,
        height: 240,
        x: cx - (width*0.96)/2, 
        y: cy + hh/2 - 60/2 - 240/2,
        // y: hh + (height - hh - 60)/2 - 240/2,
        align: 'right',
        showLine: false,
        scaling: false,
        // hasBg: true,
        hasBg: false,
        // clip: false,
        space: 8,
        bg : [100],
        ncols: 1,
    })

    this.pack(pview)

    ////////////////////////////////////
    function onChange(index){
        let setting = [
        {
            ncols: 1, total: 4,
        },
        {
            ncols: 1, total: 5,
        },
        {
            ncols: 1, total: 6,
        },
        {
            ncols: 3, total: 3,
        },
        {
            ncols: 1, total: 5,
        },
        {
            ncols: 1, total: 6,
        },
        {
            ncols: 1, total: 3,
        },

        {
            ncols: 2, total: 3,
        },

        {
            ncols: 1, total: 5,
        },
    ]
        let sec = data[index]
        txtView.text = items_txt[index]
        pview.items = []
        pview.childs = []
        pview.direction = 'v'
        pview.ncols = setting[index] ? setting[index].ncols : 2

        if (sec) {
            pview.displayItems = setting[index] ? setting[index].total : floor((sec.length+1)/2)
            let dta = []

            for (let i in sec) {
                let item = sec[i]
                let nc = floor(map(i, 0, sec.length, 0, 360))

                let b = new Button({
                    origin:CENTER_CENTER,
                    textAlign: [LEFT, TOP],
                    text: item.lable + ' '+ item.text,
                    corner:[],
                    fontSize: 13,
                    iconSize: item.imageIcon ? 24 : 4,
                    imageIcon: item.imageIcon,
                    imageColor: item.imageColor ? item.imageColor: style.lineColor,
                    alignIcon: TOP_LEFT,
                    // hasBg:false,
                })
                dta.push(b)
                // pview.addItem(b)
                // pview.pack(b)
            }

            pview.data = dta
            pview.setData(dta)
        }
    }
    onChange(0)

    let sw = new Switch({
        x: width - 60, y: 30,
        // lineColor: 'hsl(100, 50%, 50%)',
        state: state,
        angle:180,

        onChange:function() {
            let p = this.Parent()
            state = !state
            p.setup()
        }
      })
    
      


      let tdk = new Text({
        text: 'Dunkel',
        x: width - 70,
        y: sw.y,
        hasBg: false,
        clip: false,
        fg:style.lineColor,
      })

      this.pack(tdk, sw)
      ////////////////////////////////////////////

      let flh = 60
      let fl = new moveClip({
        origin: CENTER_CENTER,
        x: cx, y: height - flh/2,
        width: width,
        height: flh,
        corner: [],
        // bg:[200],
        enabled: false,
      })

      this.pack(fl)


      let flv = new listMenuView({
        origin: CENTER_CENTER,
        x: 0, y:0,
        width: width * 0.6,
        height: flh - 20,
        corner: [30],
        bg:style.bg,
        displayItems: 4,
        limited: false,
        acc: 1,
        dump: 1,
        hasBg: false,
      })

      fl.pack(flv)

      let mtxt = 'Herzlich willkommen auf meiner Profilseite...'
      let words = mtxt.split(' ')



      for (let i in words) {
        let item = words[i]

        let b = new Button({
            origin:CENTER_CENTER,
            textAlign: [CENTER, CENTER],
            text: item,
            corner:[],
            fontSize: 11,
            iconSize: 0,
            alignIcon: CENTER_LEFT,
            hasBg:false,
            fg: style.lineColor,
        })

        flv.addItem(b)
    }

}
///////////////////////////////////////////
return scene