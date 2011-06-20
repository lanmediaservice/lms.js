/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: MemoBox.js 54 2009-10-21 06:35:41Z macondos $
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
 * Виджет для редактирования простого текста (plain/text) на базе 
 * HTML-элемента &lt;TEXTAREA&gt;
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.MemoBox = Class.create(LMS.Widgets.Generic, {
    value : '',
    cols : null,
    rows : null,
    _attributes: ['cols', 'rows'],
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
    onCreateElement: function() { 
        this.wrapperElement = new Element("TEXTAREA", {
              'id'    : this.DOMId
        });
        this.wrapperElement.value = this.value;
        
        this.applyDecorators();
        
        return this.wrapperElement;
    },
    setValue: function(value) {
        if (Object.isUndefined(value) || value==null) {
            value = '';
        }
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
     * Устанавливает ширину текстового поля в символах
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @name LMS.Widgets.MemoBox.setCols
     * @function
     * @memberOf LMS.Widgets.MemoBox
     * @param {integer/string} cols
     * @return void
     */
    setCols: function(value){
         this._setAttribute('cols', value);
    },
    /**
     * Возвращает текущую ширину текстового поля в символах
     * @name LMS.Widgets.MemoBox.getCols
     * @function
     * @memberOf LMS.Widgets.MemoBox
     * @return {integer}
     */
    getCols: function(){
        return this.cols;
    },
    /**
     * Устанавливает высоту текстового поля в символах
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @name LMS.Widgets.MemoBox.setRows
     * @function
     * @memberOf LMS.Widgets.MemoBox
     * @param {integer/string} rows
     * @return void
     */
    setRows: function(value){
         this._setAttribute('rows', value);
    },
    /**
     * Возвращает текущую высоту текстового поля в символах
     * @name LMS.Widgets.MemoBox.getRows
     * @function
     * @memberOf LMS.Widgets.MemoBox
     * @return {integer}
     */
    getRows: function(){
        return this.rows;
    },
    
    setCaretPosition: function(position){
        if (this.wrapperElement) {
            setCaretPosition(this.wrapperElement, position);
        }
        return this;        
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.MemoBox();
 * myBox.setDOMId("test");
 * myBox.paint();
 */
 
/**
 * @test test1Paint
 * window.myBox = new LMS.Widgets.MemoBox();
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
 * myBox.setRows(20);
 * assertEquals("check rows", myBox.getRows(), 20);
 * 
 * myBox.setCols(30);
 * assertEquals("check cols", myBox.getCols(), 30);
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
 