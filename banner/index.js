(function () {
    var banner = new Banner({
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
        speed: 500,
        tabHeaderActive: 'active',
        tabBodyActive: 'hidden'
    })
})()
