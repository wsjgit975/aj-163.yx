class HeaderNav {
    constructor() {
        this.$o_notic = $('.notic');
        this.$o_navTop = $('.nav-top');
        this.$o_headNav = $('.head-nav');
        this.$o_publicNav = $('.public-nav');
        this.init();
        this.addEve();

    }
    init() {
        let that = this;
        $.get('./header.json', function(data) {
            //完善顶部的导航栏
            data = data || [];
            that.$o_notic.append(`<a href="${data[0].href}" class='notic'>${data[0].notic}</a>`);
            $.each(data[1], function(key, value) {
                that.$o_navTop.append(`<a href="#">${key}</a>`)
            })
        });
        //完善头部的nav导航栏
        $.get('./search.json', function(data) {
            data = data || [];
            $.each(data, function(key, value) {
                that.$o_headNav.append(
                    `<a href="${value.href}" class='nav'>${value.name}</a>`);
            })
        })
    }
    addEve() {
        let that = this;
        this.$o_publicNav = $('.public-nav')
            // 使用父元素给每个子元素添加事件（事件代理）
        this.$o_headNav.hover(
            function() {
                setTimeout(() => {
                    $('.public-nav').css({
                        opacity: 1,
                        "z-index": 10
                    });
                }, 500);
            },
            function() {
                setTimeout(() => {
                    $('.public-nav').css({
                        opacity: 1,
                        "z-index": -10
                    });
                }, 500);
            });
        this.$o_headNav.on('mouseenter', '.nav', function() {
            that.$o_publicNav.empty();
            let $n_index = $(this).index() - 1;
            let arr = [];
            $.get('./search.json', function(data) {

                let str = "";
                console.log(data[$n_index].name);
                $.each(data[$n_index].good, function(index, value) {
                    $.each(value.goodList, function(index, value) {
                        str +=
                            `<li><img src="#" alt="${value.name}"><span>${value.name}</span></li>`
                    });
                    $('.public-nav').append(`<div class="public-nav-title"><h3>${value.titleName}</h3>  <div class="public-nav-good"><ul>${str}</ul></div></div>`);
                });

            });
        });
        this.$o_headNav.on('mouseleave', '.nav', function() {
            setTimeout(() => {

            }, 500)

        })
    }

}
new HeaderNav();