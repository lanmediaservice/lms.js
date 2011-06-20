/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: ProgressBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
JSAN.require('LMS.Widgets.Generic');
JSAN.require('LMS.Widgets.Factory');

/**
 * Виджет для отображения прогресса.
 * Свойство value должно принимать значения от 0 до 1
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.ProgressBox = Class.create(LMS.Widgets.Generic, {
    width : null,
    height : null,
    className : 'progress',
    onCreateElement: function() { 
        this.allBox = LMS.Widgets.Factory('LayerBox');
        this.allBox.setDOMId(this.DOMId);
        
        this.donedBox = LMS.Widgets.Factory('LayerBox');
        this.allBox.addWidget(this.donedBox);

        this.setWidth(this.width);
        this.setHeight(this.height);
        this.setValue(this.value);
        this.setPercentText();

        this.setTitle(this.title);
        this.setVisible(this.visible);
        this.setEnabled(this.enabled);
        this.setStyle(this.styles);

        this.wrapperElement = this.allBox.createElement();
        
        this.applyDecorators();

        return this.wrapperElement;
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
    setWidth: function(width){
        if (Object.isNumber(width) || Object.isString(width)) {
            this.width = parseInt(width);
            if (this.allBox){
                this.allBox.setStyle({width : this.width + 'px'});
            }
            if (this.donedBox){
                this.donedBox.setStyle({width : Math.round(this.width * this.value) + 'px'});
            }
        } else {
            this.width = null;
        }
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
    setHeight: function(height){
        if (Object.isNumber(height) || Object.isString(height)) {
            this.height = parseInt(height);
            if (this.allBox){
                this.allBox.setStyle({height : this.height + 'px'});
            }
            if (this.donedBox){
                this.donedBox.setStyle({height : this.height + 'px'});
            }
        } else {
            this.height = null;
        }
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
    },
    setValue: function(value) { 
        if (this.value != value) {
            this.value = value;
            if (this.donedBox) {
                this.setWidth(this.width);
                this.setPercentText();
            }
            this.emit('valueChanged', this.value, this);
        }
    },
    setPercentText: function() { 
        if (this.donedBox) {
            this.donedBox.setHTML(Math.round(this.value*100)+'%')
        }
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.ProgressBox('myBox');
 * myBox.DOMId = "test";
 * myBox.setWidth(200);
 * myBox.setHeight(20);
 * myBox.setValue(0.65);
 * assertTrue('Painting', myBox.paint());
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

/**
 * @test test7SetValue08
 * window.myBox.setValue(0.8);
 * assertEquals('Value Test', window.myBox.getValue(), 0.8);
 */

/**
 * @test test8SetValue01
 * window.myBox.setValue(0.1);
 * assertEquals('Value Test', window.myBox.getValue(), 0.1);
 */
 