/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: ImageBox.js 47 2009-07-15 09:27:31Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * Зависимости
 * @requires LMS.Widgets.Generic
 */
JSAN.require('LMS.Widgets.Generic');

/**
 * Виджет для HTML элемента &lt;IMG&gt;.
 * Предствляет собой изображение 
 * @class
 * @augments LMS.Widgets.Generic
 */
 
 LMS.Widgets.ImageBox = Class.create(LMS.Widgets.Generic, {
    width : null,
    height : null,
    src: null,
    alt: null,
    border : null,
    _attributes: ['width', 'height', 'src', 'alt', 'border'],
    onCreateElement: function() { 
        this.wrapperElement = new Element("IMG", {
            'id': this.DOMId
        });

        this.applyDecorators();

        return this.wrapperElement;
    },
    /**
     * Устанавливает альтернативный текст
     * На входе должна быть строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.setAlt
     * @param {string} alt
     * @return void
     */
    setAlt: function(value) { 
         this._setAttribute('alt', value, LMS.Widgets.IS_STRING);
    },
    /**
     * Возвращает текущий альтернативный текст
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.getAlt
     * @return {integer}
     */
    getAlt: function() { 
        return this.alt;
    },
    /**
     * Устанавливает URL изображения
     * На входе должна быть строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.setSrc
     * @param {string} src
     * @return void
     */
    setSrc: function(value) { 
         this._setAttribute('src', value, LMS.Widgets.IS_STRING);
    },
    /**
     * Возвращает текущую URL изображения
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.getBorder
     * @return {integer}
     */
    getSrc: function() { 
        return this.src;
    },
    /**
     * Устанавливает толщину границы в пикселах
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.setBorder
     * @param {integer/string} border
     * @return void
     */
    setBorder: function(value){
         this._setAttribute('border', value);
    },
    /**
     * Возвращает текущую толщину границы в пикселах
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.getBorder
     * @return {integer}
     */
    getBorder: function(){
        return this.border;
    },
    /**
     * Устанавливает ширину изображения в пикселах
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.setWidth
     * @param {integer/string} width
     * @return void
     */
    setWidth: function(value){
         this._setAttribute('width', value);
    },
    /**
     * Возвращает текущую ширину изображения в пикселах
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.getWitdh
     * @return {integer}
     */
    getWidth: function(){
        return this.width;
    },
    /**
     * Устанавливает высоту текстового поля в символах
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.MemoBox.setHeight
     * @param {integer/string} height
     * @return void
     */
    setHeight: function(value){
         this._setAttribute('height', value);
    },
    /**
     * Возвращает текущую высоту текстового поля в символах
     * @memberOf LMS.Widgets.ImageBox
     * @function
     * @name LMS.Widgets.ImageBox.getHeight
     * @return {integer}
     */
    getHeight: function(){
        return this.height;
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.ImageBox('myBox');
 * myBox.DOMId = "test";
 * myBox.setAlt('Google Logo');
 * assertTrue('Painting', myBox.paint());
 * myBox.setSrc('http://www.google.com.by/intl/en_com/images/logo_plain.png');
 * assertEquals('Src Test', window.myBox.getSrc(), 'http://www.google.com.by/intl/en_com/images/logo_plain.png');
 * assertEquals('Alt Test', window.myBox.getAlt(), 'Google Logo');
 */

/**
 * @test test1Hide
 * window.myBox.setVisible(false);
 * assertFalse('Hide Test', window.myBox.isVisible());
 */
 
/**
 * @test test2Show
 * window.myBox.setVisible(true);
 * assertTrue('Show Test', window.myBox.isVisible());
 */
 
/**
 * @test test3SetWidth100
 * window.myBox.setWidth(100);
 * assertEquals('Width Test', window.myBox.getWidth(), 100);
 */
 
/**
 * @test test4SetWidthNull
 * window.myBox.setWidth(null);
 * assertNull('Width Test', window.myBox.getWidth());
 */  
 
/**
 * @test test5SetHeigth100
 * window.myBox.setHeight(100);
 * assertEquals('Height Test', window.myBox.getHeight(), 100);
 */
 
/**
 * @test test6SetHeigthNull
 * window.myBox.setHeight(null);
 * assertNull('Height Test', window.myBox.getHeight());
 */  

 