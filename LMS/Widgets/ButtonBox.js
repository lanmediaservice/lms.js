/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: ButtonBox.js 51 2009-09-19 09:45:54Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
 /** 
 * Зависимости
 * @requires  LMS.Widgets.BlockGeneric
 */
JSAN.require('LMS.Widgets.BlockGeneric');

/**
 * Виджет для HTML элемента &lt;BUTTON&gt;.
 * Предствляет собой кнопку с любыми вложенными объектами 
 * @class
 * @augments LMS.Widgets.BlockGeneric
 */
 
LMS.Widgets.ButtonBox = Class.create(LMS.Widgets.BlockGeneric, {
    onCreateElement: function() {
        this.wrapperElement = new Element('BUTTON', {
            'id': this.DOMId
        });
        
        this.applyDecorators();
        
        var self = this;
        this.wrapperElement.onclick = function () {
            self.emit('action', self.getValue());
        };
        return this.wrapperElement;
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.ButtonBox();
 * myBox.setHTML('click&nbsp;me to disabled');
 * myBox.setDOMId("test");
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * window.myBoxAction = function()
 * {
 *     myBox.setEnabled(false);
 * }
 * LMS.Connector.connect(myBox, 'action', window, 'myBoxAction');
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
 
 