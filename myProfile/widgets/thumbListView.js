class thumbListView extends listMenuView{
    direction = 'v'
    ncols = 3
    space = 4
    limited = true
    data = []
    align = 'right'
    width = 300
    height = 200
    constructor(...args){
        super()
        this.items = []
        this.data = []
        this.set(...args)
        this.updateData()
    }

    setData(t){
        this.direction = 'v'
        this.data = t
        this.updateData()
    }

    createItem(){
        let item = new Container({
            num : this.ncols,
            space : this.space,
            align : this.align == 'left' ? 'right' : 'left',
        })
        this.addItem(item)
        return item 
    }

    updateData(){
        this.items = []
        let childs = this.data 
        let n = 0
        if (this.data.length > 0) {
            let item = this.createItem()
            for (let i in childs) {
                n++
                let c = childs[i]
                item.pack(c)
                if (n == this.ncols && i < this.data.length - 1) {
                    n = 0
                    item = this.createItem()
                }
            }
        }
    }
}