/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: GroupFilterBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * Зависимости
 * @requires LMS.Widgets.CheckBox, LMS.Widgets.LabelBox, LMS.Widgets.CompositeGeneric, LMS.Widgets.TextBox
 */
JSAN.require('LMS.Widgets.BlockGeneric');

/**
 * Simple lable box (for checkbox)
 * @class
 * @augments LMS.Widgets.Generic
 */
 LMS.Widgets.GroupFilterBox = Class.create(LMS.Widgets.BlockGeneric, {
    // properties
   onCreateElement: function() { 
        var wrapper = LMS.Widgets.Factory('LayerBox');

        this.check = LMS.Widgets.Factory('SelectBox');
        this.check.addItem('И', 'and');
        this.check.addItem('ИЛИ', 'or');
        for (var i=0; i<this._childs.length; i++) {
            wrapper.addElement(this._childs[i]);
            wrapper.addHTML('<BR>');
            
        }
        wrapper.addWidget(this.check);
        this.goButton = LMS.Widgets.Factory('ButtonBox');
        this.goButton.addHTML('Фильтровать');
        wrapper.addWidget(this.goButton);
        
        this.wrapperElement = wrapper.createElement();

        this.setVisible(this.visible);
        this.setClassName(this.className);
        this.setStyle(this.styles);
        return this.wrapperElement;
        
    },
    addFilterItem: function(filter)
    {
        this._appendChild(filter.createElement());
    }
    
    
});

/**
 * @test setUp
 * window.myBox = new LMS.Widgets.GroupFilterBox();
 * myBox.setDOMId("test");
 * myBox.paint();
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