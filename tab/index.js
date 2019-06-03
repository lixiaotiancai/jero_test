(function () {
    var tab = new Tab({
        ctx: 'tab',
        components: {
            tabHeader: '.tab-header',
            tabHeaderItem: '.tab-header-item',
            tabBody: '.tab-body',
            tabBodyItem: '.tab-body-item'
        },
        active: 1,
        tabHeaderActive: 'active',
        tabBodyActive: 'hidden'
    })
})()
