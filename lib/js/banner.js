function Banner (opt) {
    var util = {
        getCtx: id => document.getElementById(id),
        qS: (ctx, style) => ctx.querySelector(style),
        qSA: (ctx, style) => ctx.querySelectorAll(style)
    }

    var cfg = {
        ctx: 'banner',
        components: {
            tabHeader: '.banner-nav',
            tabHeaderItem: '.banner-nav-item',
            tabBody: '.banner-body',
            tabBodyItem: '.banner-body-item',
            btn: {
                box: '.btn-box',
                leftBtn: '.btn-left',
                rightBtn: '.btn-right'
            }
        },
        active: 0,
        tabHeaderActive: 'hidden',
        tabBodyActive: 'active',
        speed: 300,
        ...opt
    }

    // 寄生tab 继承的属性有
    // this.cfg
    // this.util
    // this.components
    // this.tab
    // this.tabHeader
    // this.tabHeaderItem
    // this.tabBody
    // this.tabBodyItem
    // this.active   
    // this.headerActiveStyle
    // this.bodyActiveStyle
    Tab.call(this, cfg)


    // get components
    var btnBox = this.btnBox = util.qS(this.tab, cfg.components.btn.box)
    this.leftBtn = util.qS(btnBox, cfg.components.btn.leftBtn)
    this.rightBtn = util.qS(btnBox, cfg.components.btn.rightBtn)

    // get speed
    this.speed = cfg.speed

    // set timer
    this.timer = null

    // hide btn
    this.btnTrigger()

    // play
    this.play()

    // bind banner events
    this.bindBannerEvent()

}

// inherit from tab 继承的方法有
// this.hideBody()
// this.activeBody()
// this.bindEvent()
inherit(Banner, Tab)

// btn show/hide trigger
Banner.prototype.btnTrigger = function () {
    var btnBoxClassList = this.btnBox.classList
    var activeStyle = this.bodyActiveStyle

    if (btnBoxClassList.contains(activeStyle)) {
        btnBoxClassList.remove(activeStyle)
    } else {
        btnBoxClassList.add(activeStyle)
    }
}

// bind btn click event
Banner.prototype.bindBtnEvent = function () {
    var self = this

    self.btnBox.addEventListener('click', function (e) {
        var target = e.target

        if (target === self.leftBtn) {
            self.active = (self.active - 1 < 0) ? 2 : (self.active - 1) % 3
            
        } else {
            self.active = (self.active + 1) % 3
        }

        self.activeBody()
    })
}

// play
Banner.prototype.play = function () {
    var self = this

    if (!self.timer) {
        self.timer = window.setInterval(function () {
            self.rightBtn.click()
        }, self.speed)
    }
}

// stop
Banner.prototype.stop = function () {
    var self = this

    if (self.timer) {
        window.clearInterval(self.timer)
        self.timer = null
    }
}

// bind event
Banner.prototype.bindBannerEvent = function () {
    var self = this

    self.tab.addEventListener('mouseover', function (e) {
        var target = e.target

        self.stop()
        self.btnTrigger()
    })

    self.tab.addEventListener('mouseout', function (e) {
        var target = e.target

        self.play()
        self.btnTrigger()
    })

    self.bindBtnEvent()
}
