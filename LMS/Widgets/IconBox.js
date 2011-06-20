/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: IconBox.js 43 2008-12-18 15:29:03Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.Generic, LMS.Widgets.ImageBox
 */
JSAN.require('LMS.Widgets.Generic');
JSAN.require('LMS.Widgets.ImageBox');

/**
 * Simple icon box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.IconBox = Class.create(LMS.Widgets.Generic, {
    icons: {
        16: {
            folder: 'images/dir.png',
            imdb: 'http://lms.local/lms2.0/imdb.gif',
            imdb_disabled: 'http://lms.local/lms2.0/imdb_disabled.gif',
            ozon: 'http://lms.local/lms2.0/ozon.gif',
            ozon_disabled: 'http://lms.local/lms2.0/ozon_disabled.gif',
            kinopoisk: 'http://lms.local/lms2.0/kinopoisk.gif',
            kinopoisk_disabled: 'http://lms.local/lms2.0/kinopoisk_disabled.gif',
            plus: 'images/tree_plus.bmp',
            minus: 'images/tree_minus.bmp',
            unknown: 'images/unknown.png'
        }
    },
    type: null,
    size: 16,
    align: true,
    base: '',
    onCreateElement: function() {
        var imageBox = new LMS.Widgets.ImageBox();
        imageBox.setSrc(this.base + this.icons[this.size][this.type]);
        if (this.align) {
            imageBox.setStyle({
               position: 'relative',
               'top': '3px'
            });
        }
        imageBox.setDOMId(this.DOMId);
        return imageBox.createElement();
    },
    setType: function(type, size) {
        this.type = type? type : 'unknown';
        this.size = size? size : 16;
        if ($(this.DOMId)) {
            this.paint();
        }
    },
    setBase: function(base) {
        this.base = base;
    }
});

/**
 * @test testPaint
 * var myBox = new LMS.Widgets.IconBox('myBox');
 * myBox.setType('folder', 16);
 * myBox.DOMId = "test";
 * assertTrue('Painting', myBox.paint());
 */
