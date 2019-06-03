(function () {
    var tab = new SupperTab({
        ctx: 'tab',
        components: {
            tabHeader: '.tab-header',
            tabHeaderItem: '.tab-header-item',
            tabBody: '.tab-body',
            tabBodyItem: '.tab-body-item'
        },
        active: 0,
        tabHeaderActive: 'active',
        tabBodyActive: 'hidden'
    })

    window.tab = tab
})()

function addItem () {
    tab.addItem()
}

function reduceItem () {
    tab.reduceItem()
}