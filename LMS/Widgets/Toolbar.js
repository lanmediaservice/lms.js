/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: TabsBox.js 27 2008-10-30 08:34:06Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
JSAN.require('LMS.Widgets.Generic');
JSAN.require('LMS.Widgets.Factory');

/**
 * Page box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.Toolbar = Class.create(LMS.Widgets.Generic, {
    items: null,
    className: 'toolbar',
    initialize: function($super)
    {
        $super();
        this.items = [];
    },
    onCreateElement: function()
    {
        var wrapper = LMS.Widgets.Factory('LayerBox');
        var list = LMS.Widgets.Factory('UnorderedListBox');
        this.trim();
        for (var i=0; i<this.items.length; i++) {
            var listItem = LMS.Widgets.Factory('ListItemBox');
            var item = this.items[i];
            if ('-' == item) {
                var separator = LMS.Widgets.Factory('LayerBox');
                separator.setClassName('separator');
                listItem.addWidget(separator);
            } else {
                listItem.addWidget(item);
            }
            list.addWidget(listItem);
        }
        wrapper.addWidget(list);
        wrapper.addHTML('<BR class="break">');
        this.wrapperElement = wrapper.createElement();
        this.applyDecorators();
        return this.wrapperElement;
    },
    add: function(item)
    {
        if (item instanceof LMS.Widgets.Generic) {
            this.items.push(item);
        } else if ('-' == item) {
            this.items.push(item);
        } else {
            throw new Error('Unknown type of object: ' + typeof(item));
        }
        return this;
    },
    trim: function()
    {
        while (this.items[this.items.length-1] == '-') {
            this.items.pop();
        }
        while (this.items[0] == '-') {
            this.items.shift();
        }
    }
});

/**
 * @test testPaint
 * var myBox = new LMS.Widgets.Toolbar();
 * var btn1 = LMS.Widgets.Factory('ButtonBox');
 * btn1.setHTML('button 1');
 * var btn2 = LMS.Widgets.Factory('ButtonBox');
 * btn2.setHTML('button 2');
 * var btn3 = LMS.Widgets.Factory('ButtonBox');
 * btn3.setHTML('button 3');
 * myBox.add(btn1)
 *      .add(btn2)
 *      .add('-')
 *      .add(btn3);
 * myBox.setDOMId('test');
 * assertTrue('Painting', myBox.paint());
 */