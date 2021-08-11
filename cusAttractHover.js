/*
    require cusAnimation
*/
$.cusAttractHover = function (selector, hover) {
    var circle = {
        el: selector,
        hover: hover,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        mouseX: 0,
        mouseY: 0,
        init: function () {
            this.x = this.mouseX = this.hover.outerWidth() / 2;
            this.y = this.mouseY = this.hover.outerHeight() / 2;
            this.w = this.hover.outerWidth();
            this.h = this.hover.outerHeight();
        },
        update: function () {
            l = this.x - this.w / 2;
            t = this.y - this.h / 2;
            this.el.css({
                'transform':
                    'translate3d(' + l + 'px,' + t + 'px, 0)'
            });
        }
    };
    circle.init();
    move();

    $(document).mousemove(function (e) {
        var newPosX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            newPosY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        circle.mouseX = e.clientX - (circle.hover.offset().left - newPosX);
        circle.mouseY = e.clientY - (circle.hover.offset().top - newPosY);
    });

    function move() {
        if (circle.mouseX < 0 || circle.mouseX > circle.hover.outerWidth() || circle.mouseY < 0 || circle.mouseY > circle.hover.outerHeight()) {
            circle.mouseX = circle.hover.outerWidth() / 2,
                circle.mouseY = circle.hover.outerHeight() / 2;
        }
        circle.x = lerp(circle.x, circle.mouseX, 0.1);
        circle.y = lerp(circle.y, circle.mouseY, 0.1);
        circle.update();
        window.requestAnimationFrame(move);
    }

    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
};