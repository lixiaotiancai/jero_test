function Tab (opt) {
    var util = this.util = {
        getCtx: id => document.getElementById(id),
        qS: (ctx, style) => ctx.querySelector(style),
        qSA: (ctx, style) => ctx.querySelectorAll(style)
    }

    var cfg = this.cfg = {
        ctx: 'tab',
        components: {
            tabHeader: '.tab-header',
            tabHeaderItem: '.tab-header-item',
            tabBody: '.tab-body',
            tabBodyItem: '.tab-body-item'
        },
        active: 0,
        tabHeaderActive: 'hidden',
        tabBodyActive: 'active',
        ...opt
    }
    //get ctx
    var tab = this.tab = util.getCtx(cfg.ctx)

    // get components
    var components = this.components = cfg.components

    this.tabHeader = util.qS(tab, components.tabHeader)
    this.tabHeaderItem = util.qSA(tab, components.tabHeaderItem)
    this.tabBody = util.qS(tab, components.tabBody)
    this.tabBodyItem = util.qSA(tab, components.tabBodyItem)

    // get active item
    this.active = cfg.active

    // get active style
    this.headerActiveStyle = cfg.tabHeaderActive
    this.bodyActiveStyle = cfg.tabBodyActive

    // hide all tabBody
    this.hideBody()

    // active tabBody
    this.activeBody()

    //bindEvent
    this.bindEvent()
}

Tab.prototype.hideBody = function () {
    this.tabBodyItem.forEach(item => {
        item.classList.add(this.bodyActiveStyle)
    })
}

Tab.prototype.activeBody = function () {
    if (this.cur === this.active) {
        return
    }

    // get header&body item
    var headerItem = this.tabHeaderItem
    var bodyItem = this.tabBodyItem

    // get active style
    var headerActiveStyle = this.headerActiveStyle
    var bodyActiveStyle = this.bodyActiveStyle

    // style change
    headerItem[this.active].classList.add(headerActiveStyle)
    bodyItem[this.active].classList.remove(bodyActiveStyle)

    if (this.cur !== undefined) {     
        headerItem[this.cur].classList.remove(headerActiveStyle)
        bodyItem[this.cur].classList.add(bodyActiveStyle)
    }

    // record pre-active item => this.cur
    this.cur = this.active
}

Tab.prototype.bindEvent = function () {
    var self = this
    // event proxy
    self.tabHeader.addEventListener('click', function (e) {
        var path = e.path
        var targetTag = findTag(path, 'LI')

        if (targetTag) {
            self.active = [...self.tabHeaderItem].indexOf(targetTag)
            self.activeBody()
        }

        function findTag (path, tagName) {
            return path.find(tag => tag.tagName && tag.tagName.toUpperCase() === tagName)
        }
    })
}