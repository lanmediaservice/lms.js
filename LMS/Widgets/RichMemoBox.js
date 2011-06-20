/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: RichMemoBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.LayerBox, LMS.Widgets.MemoBox, LMS.Widgets.Generic, tinyMCE
 */
JSAN.require('LMS.Widgets.LayerBox');
JSAN.require('LMS.Widgets.MemoBox');
JSAN.require('LMS.Widgets.Generic');

/**
 * Simple memo box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.RichMemoBox = Class.create(LMS.Widgets.Generic, {
    // properties
    value : '',
    width : 100,
    height : 15,
    rteEnabled : false,
    rteTooglerBox : null,
    textBox : null,
    onCreateElement: function() { 
        var wrapper = new LMS.Widgets.LayerBox();
        wrapper.setDOMId(this.DOMId);
        wrapper.inlineStyle = true;
        this.rteTooglerBox = new LMS.Widgets.LayerBox();
        this.rteTooglerBox.inlineStyle = true;
        this.rteTooglerBox.setHTML('Enable RTE');
        this.rteTooglerBox.setStyle({
            'cursor': 'pointer'
        });
        var self = this;
        this.rteTooglerBox.setEventHandler('click', function(){
            self.rteEnabled = self.textBox.toogleRichTextEditor();
            self.rteTooglerBox.setHTML(self.rteEnabled? 'Disable RTE': 'Enable RTE');
        });
        wrapper.addWidget(this.rteTooglerBox);
        wrapper.addElement(new Element('BR'));

        this.textBox = new LMS.Widgets.MemoBox();
        this.textBox.width = this.width;
        this.textBox.height = this.height;
        this.textBox.setValue(this.value);
        this.textBox.onChange = this.onChange;

        wrapper.addWidget(this.textBox);
        
        return wrapper.createElement();

    },
    setValue: function(value) { 
        if (this.value != value) {
            if (value==null) value = '';
            if (this.textBox){
                this.textBox.setValue(value);
            }        
            this.value = value;
            this.onChange(this);
        }
    }
});

/**
 * @test testPaint

 * var myBox = new LMS.Widgets.RichMemoBox('myBox');
 * myBox.DOMId = "test";
 * myBox.setValue("my <b>value</b>");
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check value", myBox.getValue(), "my <b>value</b>");
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * myBox.setValue("new <b>value</b>");
 * assertEquals("check value", myBox.getValue(), "new <b>value</b>");
 */
