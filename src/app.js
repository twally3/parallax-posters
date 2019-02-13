"use strict";

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = window.jQuery = _jquery2.default;

$('.poster').on("mousemove", function (e) {
    var $poster = $(this),
        $shine = $poster.find('.shine'),
        $layer = $poster.find('div[class*="layer-"]'),
        w = $poster.width(),
        h = $poster.height(),
        $offset = $poster.offset(),
        relX = e.pageX - $offset.left,
        relY = e.pageY - $offset.top;

    var offsetX = 0.5 - relX / w,
        offsetY = 0.5 - relY / h,
        offsetPoster = $poster.data('offset'),

    // transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg) scale(1.05)'
    transformPoster = 'rotateX(' + -offsetY * offsetPoster + 'deg) rotateY(' + offsetX * (offsetPoster * 2) + 'deg) scale(1.05)';

    var dy = relY - h / 2,
        dx = relX - w / 2,
        theta = Math.atan2(dy, dx),
        angle = theta * 180 / Math.PI;

    if (angle < 0) {
        angle = angle + 360;
    }
    $shine.css('background', 'linear-gradient(' + (angle - 90) + 'deg, rgba(255,255,255,' + 0.9 * (relY / h) + ') 0%,rgba(255,255,255,0) 80%)');
    $shine.css('opacity', '0.6');

    $poster.css('transform', transformPoster);
    $poster.css('box-shadow', "0 5px 15px rgba(0,0,0,0.3)");

    $layer.each(function () {
        var $this = $(this),
            offsetLayer = $this.data('offset') || 0,
            transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

        $this.css('transform', transformLayer);
    });
});

$('.poster').on("mouseout", function () {
    var $poster = $(this),
        $shine = $poster.find('.shine'),
        $layer = $poster.find('div[class*="layer-"]').addBack($poster);

    $poster.css('box-shadow', "0 1px 2px rgba(0,0,0,0.15)");

    $shine.css('opacity', '0');

    $layer.each(function () {
        $(this).css('transform', 'translateX(0px) translateY(0px)');
    });
});