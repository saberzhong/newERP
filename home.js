layui.define(['element','layer'],function(exports){

    let $ = layui.$, $body = $('body'),
        element = layui.element,
        layer = layui.layer;

    let screen_size = {
        pc : [991, -1],
        pad : [768, 990],
        mobile : [0, 767]
    }

    let getDevice = function(){
        let width = $(window).width();
        for (let i in screen_size) {
            let sizes = screen_size[i],
                min = sizes[0],
                max = sizes[1];
            if(max == -1) max = width;
            if(min <= width && max >= width){
                return i;
            }
        }
        return null;
    }

    let isDevice = function(label){
        return getDevice() == label;
    }

    let isMobile = function(){
        return isDevice('mobile');
    }

    let Tab = function(el){
        this.el = el;
        this.urls = [];
    }

    Tab.prototype.content = function(src) {
        let iframe = document.createElement("iframe");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("src", src);
        iframe.setAttribute("data-id", this.urls.length);
        return iframe.outerHTML;
    };

    Tab.prototype.is = function(url) {
        return (this.urls.indexOf(url) !== -1)
    };

    Tab.prototype.add = function(title, url) {
        if(this.is(url)) return false;
        this.urls.push(url);
        element.tabAdd(this.el, {
            title : title
            ,content : this.content(url)
            ,id : url
        });
        this.change(url);
    };

    Tab.prototype.change = function(url) {
        element.tabChange(this.el, url);
    };

    Tab.prototype.delete = function(url) {
        element.tabDelete(this.el, url);
    };

    Tab.prototype.onChange = function(callback){
        element.on('tab('+this.el+')', callback);
    };

    Tab.prototype.onDelete = function(callback) {
        let self = this;
        element.on('tabDelete('+this.el+')', function(data){
            let i = data.index;
            self.urls.splice(i,1);
            callback && callback(data);
        });
    };

    let Home = function(){

        let tabs = new Tab('tabs'), navItems = [];

        $('#Nav a').on('click',function(event){
            event.preventDefault();
            let $this = $(this), url = $this.attr('href'),
                title = $.trim($this.text());
            if( url && url!=='javascript:;' ){
                if(tabs.is(url)){
                    tabs.change(url);
                } else {
                    navItems.push($this);
                    tabs.add(title, url);
                }
            }
            $this.closest('li.layui-nav-item')
                .addClass('layui-nav-itemed')
                .siblings()
                .removeClass('layui-nav-itemed');
        });

        // 默认触发第一个子菜单的点击事件
        $('#Nav li.layui-nav-item:eq(0) > dl.layui-nav-child > dd > a:eq(0)').trigger('click');

        tabs.onChange(function(data){
            let i = data.index, $this = navItems[i];
            if($this && typeof $this === 'object') {
                $('#Nav dd').removeClass('layui-this');
                $this.parent('dd').addClass('layui-this');
                $this.closest('li.layui-nav-item')
                    .addClass('layui-nav-itemed')
                    .siblings()
                    .removeClass('layui-nav-itemed');
            }
        });

        tabs.onDelete(function(data){
            let i = data.index;
            navItems.splice(i,1);
        });

        this.slideSideBar();
    }

    Home.prototype.slideSideBar = function() {
        let $slideSidebar = $('.slide-sidebar'),
            $pageContainer = $('.layui-body'),
            $mobileMask = $('.mobile-mask');

        let isFold = false;
        $slideSidebar.click(function(e){
            e.preventDefault();
            let $this = $(this), $icon = $this.find('i'),
                $admin = $body.find('.layui-layout-admin');
            let toggleClass = isMobile() ? 'fold-side-bar-xs' : 'fold-side-bar';
            if($icon.hasClass('ai-menufold')){
                $icon.removeClass('ai-menufold').addClass('ai-menuunfold');
                $admin.addClass(toggleClass);
                isFold = true;
                if(isMobile()) $mobileMask.show();
            }else{
                $icon.removeClass('ai-menuunfold').addClass('ai-menufold');
                $admin.removeClass(toggleClass);
                isFold = false;
                if(isMobile()) $mobileMask.hide();
            }
        });

        let tipIndex;
        // 菜单收起后的模块信息小提示
        $('#Nav li > a').hover(function(){
            let $this = $(this);
            if(isFold) {
                tipIndex = layer.tips($this.find('em').text(),$this);
            }
        }, function(){
            if(isFold && tipIndex ){
                layer.close(tipIndex);
                tipIndex = null
            }
        })

        if(isMobile()){
            $mobileMask.click(function(){
                $slideSidebar.trigger('click');
            });
        }
    }

    exports('home',new Home);
});