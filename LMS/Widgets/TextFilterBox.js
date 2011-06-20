/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: TextFilterBox.js 48 2009-07-15 13:58:55Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * Зависимости
 * @requires LMS.Widgets.CheckBox, LMS.Widgets.LabelBox, LMS.Widgets.CompositeGeneric, LMS.Widgets.TextBox
 */
JSAN.require('LMS.Widgets.CompositeGeneric');
JSAN.require('LMS.Widgets.LabelBox');
JSAN.require('LMS.Widgets.EditBox');
JSAN.require('LMS.Widgets.TextBox');
JSAN.require('LMS.Widgets.ButtonBox');
 

/**
 * Simple lable box (for checkbox)
 * @class
 * @augments LMS.Widgets.Generic
 */
 LMS.Widgets.TextFilterBox = Class.create(LMS.Widgets.CompositeGeneric, {
    // properties
    labelTextBox : null,
    labelValue: 'Filter',
    onCreateElement: function() { 
        var wrapperWidget = new LMS.Widgets.LabelBox();
        wrapperWidget.setDOMId(this.DOMId);
        
        this.editBox = new LMS.Widgets.EditBox();
        this.editBox.setValue(this.value);
        this.editBox.onChange = this.onChange;
        
        this.labelTextBox = new LMS.Widgets.TextBox();
        this.labelTextBox.setValue(this.labelValue);
        
        this.goButton = new LMS.Widgets.ButtonBox();
        this.goButton.setHTML('Фильтровать');
        var self = this;
        this.goButton.onAction = function(){
            self.setValue(self.editBox.value);
        };
        
        wrapperWidget.addWidget(this.labelTextBox);
        wrapperWidget.addText('\xA0');
        wrapperWidget.addWidget(this.editBox);
        wrapperWidget.addWidget(this.goButton);
            
        this._childWidgets.push(wrapperWidget);
        this._childWidgets.push(this.editBox);
        this._childWidgets.push(this.labelTextBox);
        
        this.wrapperElement = wrapperWidget.createElement();
        
        this.setTitle(this.title);
        this.setVisible(this.visible);
        this.setReadOnly(this.readOnly);
        this.setEnabled(this.enabled);
        this.setClassName(this.className);
        this.setStyle(this.styles);
        
        return this.wrapperElement;
    },
     setValue: function(value) { 
        if (this.value != value) {
            if (this.wrapperElement){
                this.wrapperElement.value = value;
                value = this.wrapperElement.value;
            }        
            this.value = value;
            this.onChange();
        }
    },
    /**
     * Уcтанавливает label
     * @memberOf LMS.Widgets.LabeledCheckBox
     * @function
     * @name setLabel
     * @param {string} value
     * @return void
     */
    setLabel: function(labelValue) { 
        this.labelValue = labelValue.toString();
        if (this.labelTextBox) {
            alert(this.labelTextBox)
            this.labelTextBox.setValue(this.labelValue);
        }
    },
    /**
     * Возвращает значение главной переменной виджета 
     * @memberOf LMS.Widgets.LabeledCheckBox
     * @function
     * @name getValue
     * @return {string}
     */
    getLabel: function() { 
        return this.value;
    }
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.LabeledCheckBox();
 * myBox.setDOMId("test");
 * myBox.paint();
 */

/**
 * @test test1Paint
 * window.myBox = new LMS.Widgets.LabeledCheckBox();
 * myBox.setDOMId("test");
 * var onChangePassed = false;
 * myBox.onChange = function(){onChangePassed = true;};
 * myBox.setLabel('My check box');
 * 
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * 
 * myBox.setTitle('Title title title');
 * 
 * myBox.setValue(0);
 * assertFalse("check value", myBox.getValue());
 * myBox.setValue(1);
 * assertTrue("check value", myBox.getValue());
 * 
 * myBox.setValue(false);
 * assertFalse("check value", myBox.getValue());
 * myBox.setValue(true);
 * assertTrue("check value", myBox.getValue());
 * 
 * myBox.setValue('0');
 * assertFalse("check value", myBox.getValue());
 * myBox.setValue('1');
 * assertTrue("check value", myBox.getValue());
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