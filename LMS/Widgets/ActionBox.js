/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: ActionBox.js 48 2009-07-15 13:58:55Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * Зависимости
 * @requires LMS.Widgets.BlockGeneric
 */
JSAN.require('LMS.Widgets.BlockGeneric');

/**
 * Предствляет собой блок с любыми вложенными объектами 
 * @class
 * @augments LMS.Widgets.BlockGeneric
 */
 
LMS.Widgets.ActionBox = Class.create(LMS.Widgets.BlockGeneric, {
    disabledStyle : null,
    enabledStyle: null,
    initialize: function($super) {
        $super();
        this.disabledStyle = {color: 'gray', 'cursor': ''};
        this.enabledStyle = {color: 'black', 'cursor': 'pointer'};
        this.onShowStyles = {display: 'inline-block'};
        this.onHideStyles = {display: 'none'};
    },
    onCreateElement: function() {
        this.wrapperElement = new Element('DIV', {
            'id': this.DOMId
        });
        
        for (var i=0; i<this._childs.length; i++) {
            this.wrapperElement.appendChild(this._childs[i]);
        }
        var eventNames = Object.keys(this._eventHandlers);
        for (var i=0; i<eventNames.length; i++) {
            var eventName = eventNames[i];
            this.setEventHandler(eventName, this._eventHandlers[eventName])
        }
        this.setTitle(this.title);
        this.setVisible(this.visible);
        this.setEnabled(this.enabled);
        this.setClassName(this.className);
        this.setStyle(this.styles);

        var self = this;
        this.setEventHandler('click', function(){
            if (self.isEnabled()) {
                self.onAction();
            }
        });
        return this.wrapperElement;
    },
    /**
     * Виртуальный метод, вызываемый при изменении нажатии на кнопку
     * @memberOf LMS.Widgets.ButtonBox
     * @event
     * @name onChange
     */
    onAction: function(){
        //virtual
    },
    setEnabled: function($super, enabled) {
        $super(enabled);
        if (this.isEnabled()) {
            this.setStyle(this.enabledStyle);
        } else {
            this.setStyle(this.disabledStyle);
        }
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.ActionBox();
 * myBox.setHTML('click&nbsp;me to disabled');
 * myBox.setDOMId("test");
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * myBox.onAction = function(){myBox.setEnabled(false);};
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
 * @test test3Disable
 * window.myBox.setEnabled(false);
 * assertFalse('Disable Test', window.myBox.isEnabled());
 */
 
/**
 * @test test4Enable
 * window.myBox.setEnabled(true);
 * assertTrue('Enable Test', window.myBox.isEnabled());
 */  
 
/**
 * @test test5RealTimeChangeCaption
 * window.myBox.addText(' +');
 */  
 
 