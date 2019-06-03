function SupperTab (opt) {
    // 寄生tab 继承的属性有
    // this.util
    // this.cfg
    // this.tab
    // this.components
    // this.tabHeader
    // this.tabHeaderItem
    // this.tabBody
    // this.tabBodyItem
    // this.active   
    // this.headerActiveStyle
    // this.bodyActiveStyle
    Tab.call(this, opt)

    // item len
    this.len = this.tabHeaderItem.length
}

// inherit from tab 继承的方法有
// this.hideBody()
// this.activeBody()
// this.bindEvent()
inherit(SupperTab, Tab)

// create a new tab-header-item
SupperTab.prototype.createTabHeaderItem = function () {
    var tabHeader = this.tabHeader
    var tabHeaderItem = this.cfg.components.tabHeaderItem
    var len = this.len

    // create <a>item{{ seq number }}</a>
    var a = document.createElement('a')
    a.href = 'javascript:void(0)'
    var text = document.createTextNode(`item${len + 1}`)
    a.appendChild(text)

    // create <li></li>
    var li = document.createElement('li')
    // .tab-header-item => tab-header-item
    var itemStyle = tabHeaderItem.slice(1)
    li.classList.add(itemStyle)

    // mix
    li.appendChild(a)

    // appendChild to tabHeader
    tabHeader.appendChild(li)
}

// create a new tab-body-item
SupperTab.prototype.createTabBodyItem = function () {
    var tabBody = this.tabBody
    var tabBodyItem = this.cfg.components.tabBodyItem
    var len = this.len

    // create <div></div>
    var div = document.createElement('div')
    // .tab-body-item => tab-body-item
    var itemStyle = tabBodyItem.slice(1)
    div.classList.add(itemStyle, this.bodyActiveStyle)
    
    // create seq text
    var text = document.createTextNode(`item${len + 1}`)
    
    // mix
    div.appendChild(text)

    // appendChild to tabBody
    tabBody.appendChild(div)
}

// create a new tab item
SupperTab.prototype.addItem = function () {
    this.createTabHeaderItem()
    this.createTabBodyItem()
    this.fresh()

    // tab清空为0，再增加tab时，第一个tab设为active
    if (this.len === 1) {
        this.active = 0
        this.cur = undefined;
        this.activeBody()
    }
}

// reduce tab item
SupperTab.prototype.reduceItem = function () {
    var len = this.len
    if (!len) {
        return
    }

    // 清理到active的tab时，第一个tab转为active
    if (this.tabHeaderItem[len - 1].classList.contains(this.headerActiveStyle)) {
        this.active = 0
        this.activeBody()
    }

    this.tabHeader.removeChild(this.tabHeaderItem[len - 1])
    this.tabBody.removeChild(this.tabBodyItem[len - 1])
    this.fresh()
}

// fresh
SupperTab.prototype.fresh = function () {
    var tab = this.tab
    var components = this.components
    var util = this.util

    // fresh item list
    this.tabHeader = util.qS(tab, components.tabHeader)
    this.tabHeaderItem = util.qSA(tab, components.tabHeaderItem)
    this.tabBody = util.qS(tab, components.tabBody)
    this.tabBodyItem = util.qSA(tab, components.tabBodyItem)
    this.len = this.tabHeaderItem.length
}