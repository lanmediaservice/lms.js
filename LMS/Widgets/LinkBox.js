/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: LinkBox.js 27 2008-10-30 08:34:06Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.Generic
 */

/**
 * Simple link box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.LinkBox = Class.create(LMS.Widgets.Generic, {
    text: '',
    href: '',
    subElements: null,
    target: null,
    onCreateElement: function() {
        var element = new Element("A", {
              'id': this.DOMId
        }).update(this.text);
        if (this.subElements) {
            for (var i=0; i<this.subElements.length; i++) {
                element.appendChild(this.subElements[i]);
            }
        }
        if (this.target) element.target = this.target;
        if (this.href) element.href = this.href;
        element.style.display = this.visible? "" : "none";
        element.setStyle(this.styles);
        return element;            
    },
    setWidget:function(widget) { 
        this.subElements = [widget.createElement()];
    },
    addWidget:function(widget) { 
        if (!this.subElements) this.subElements = [];
        this.subElements.push(widget.createElement());
    },
    setValue:function(text) { 
        this.setText(text);
    },
    setText: function(text) { 
        if (this.text != text) {
            if ($(this.DOMId)){
                $(this.DOMId).update(text);
            }        
               this.text = text;
               this.onChange();
        }
    },
    setHref: function(href) { 
        if (this.href != href) {
            if ($(this.DOMId)){
                $(this.DOMId).href = href;
            }        
               this.href = href;
               this.onChange();
        }
    },
    setTarget: function(target) { 
        if (this.target != target) {
            if ($(this.DOMId)){
                $(this.DOMId).target = target;
            }        
               this.target = target;
               this.onChange();
        }
    }
});

/**
 * @test testPaint
 * var myBox = new LMS.Widgets.LinkBox('myBox');
 * myBox.DOMId = "test";
 * myBox.setTarget("_blank");
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * myBox.setHref("http://www.google.com/");
 * myBox.setText("new <b>value</b> (in new window)");
 * assertEquals("check value", myBox.getValue(), "new <b>value</b> (in new window)");
 */
