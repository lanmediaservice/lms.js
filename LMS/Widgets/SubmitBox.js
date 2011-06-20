/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: SubmitBox.js 48 2009-07-15 13:58:55Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
 /** 
 * Зависимости
 * @requires  LMS.Widgets.Generic
 */
JSAN.require('LMS.Widgets.Generic');

/**
 * Виджет для HTML элемента <INPUT type="submit">.
 * Предствляет собой кнопку с текстом 
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.SubmitBox = Class.create(LMS.Widgets.Generic, {
    initialize: function($super) 
    {
        $super();
        this._decorators['forms'] = this.decoratorInitFormElement;
    },
    decoratorInitFormElement : function()
    {
        var self = this;
        this.wrapperElement.onclick = function () {
            self.emit('action');
        }
    },
    onCreateElement: function() {
        this.wrapperElement = new Element("INPUT", {
            'id': this.DOMId,
            'type': 'submit',
            'value': this.value
        });

        this.applyDecorators();

        return this.wrapperElement;
    },
    setValue: function(value) {
        if (this.value != value) {
            if (this.wrapperElement){
                this.wrapperElement.value = value;
                value = this.wrapperElement.value;
            }        
            this.value = value;
            this.emit('valueChanged', this.value);
        }
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.SubmitBox();
 * myBox.setValue('click <me> to disabled');
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
 * window.myBox.setValue('new button text');
 */  
 
 