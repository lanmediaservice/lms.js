/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: EditBox.js 54 2009-10-21 06:35:41Z macondos $
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
 * Текстовое поле на базе HTML-элемента <INPUT type=text> 
 * @class
 * @augments LMS.Widgets.Generic
 */
LMS.Widgets.EditBox = Class.create(LMS.Widgets.Generic, {
    maxLength: null,
    size: null,
    _attributes: ['maxLength', 'size'],
    initialize: function($super) 
    {
        $super();
        this._decorators['forms'] = this.decoratorInitFormElement;
    },
    decoratorInitFormElement : function()
    {
        var self = this;
        this.wrapperElement.onchange = function () {
            self.setValue(this.value);
        }
    },
    onCreateElement: function() 
    { 
        this.wrapperElement = new Element("INPUT", {
              'id': this.DOMId,
              'type': 'text',
              'value': this.value
        });
        this.applyDecorators();
       
        return this.wrapperElement;
    },
    setValue: function(value)
    { 
        if (this.value != value) {
            if (this.wrapperElement){
                this.wrapperElement.value = value;
                value = this.wrapperElement.value;
            }        
            this.value = value;
            this.emit('valueChanged', this.value, this);
        }
    },
    /**
     * Устанавливает максимально возможное количество вводимых символов
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @name setMaxLength
     * @function
     * @memberOf LMS.Widgets.EditBox
     * @param {integer/string} value
     * @return void
     */
    setMaxLength: function(value)
    {
         this._setAttribute('maxLength', value);
    },
    /**
     * Возвращает текущее максимально возможное количество вводимых символов
     * @name getMaxLength
     * @function
     * @memberOf LMS.Widgets.EditBox
     * @return {integer}
     */
    getMaxLength: function()
    {
        return this.maxLength;
    },
    /**
     * Устанавливает размер текстового поля (в количестве символов)
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @name setSize
     * @function
     * @memberOf LMS.Widgets.EditBox
     * @param {integer/string} value
     * @return void
     */
    setSize: function(value)
    {
        this._setAttribute('size', value);
    },
    /**
     * Возвращает текущей размер текстового поля (в количестве символов)
     * @name getSize
     * @function
     * @memberOf LMS.Widgets.EditBox
     * @return {integer}
     */
    getSize: function()
    {
        return this.size;
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.EditBox();
 * myBox.setDOMId("test");
 * myBox.paint();
 */
 
/**
 * @test test1Paint
 * window.myBox = new LMS.Widgets.EditBox();
 * myBox.DOMId = "test";
 * 
 * window.setChange = function()
 * {
 *     onChangePassed = true;
 * }
 * var onChangePassed = false;
 * LMS.Connector.connect(myBox, 'valueChanged', window, 'setChange');
 * 
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * 
 * myBox.setValue("new <b>value</b>");
 * assertEquals("check value", myBox.getValue(), "new <b>value</b>");
 * 
 * myBox.setMaxLength(20);
 * assertEquals("check MaxLength", myBox.getMaxLength(), 20);
 * 
 * myBox.setSize(30);
 * assertEquals("check Size", myBox.getSize(), 30);
 * 
 * assertTrue('OnChage Test', onChangePassed);
 */

 
/**
 * @test test2Hide
 * window.myBox.setVisible(false);
 * assertFalse('Hide Test', window.myBox.isVisible());
 */
 
/**
 * @test test3Show
 * window.myBox.setVisible(true);
 * assertTrue('Show Test', window.myBox.isVisible());
 */
 
 /**
 * @test test4Disable
 * window.myBox.setEnabled(false);
 * assertFalse('Disable Test', window.myBox.isEnabled());
 */
 
/**
 * @test test5Enable
 * window.myBox.setEnabled(true);
 * assertTrue('Enable Test', window.myBox.isEnabled());
 */  
 
  /**
 * @test test6SetReadOnly
 * window.myBox.setReadOnly(true);
 * assertTrue('Set Read only Test', window.myBox.isReadOnly());
 */
 
/**
 * @test test7UnsetReadOnly
 * window.myBox.setReadOnly(false);
 * assertFalse('Unset Read only Test', window.myBox.isReadOnly());
 */  