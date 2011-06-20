/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: BaseTemplate.js 44 2009-06-21 08:24:45Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
 /** 
 * @requires LMS.Widgets.Generic
 */

JSAN.require('LMS.Widgets.Templates');
JSAN.require('LMS.Widgets.Generic');

/**
 * @class
 * @augments LMS.Widgets.Generic
 */
LMS.Widgets.Templates.BaseTemplate = Class.create(LMS.Widgets.Generic, {
    /**
     * @name addWidget
     * @function
     * @memberOf LMS.Widgets.Templates.BaseTemplate
     * @return void
     */
    addWidget: function(widget, placeName) { 
        var element = this.getElement(placeName);
        element.addWidget(widget);
    },
    addText: function(text, placeName) { 
        var element = this.getElement(placeName);
        element.addText(text);
    },
    addHTML: function(htmlText, placeName) { 
        var element = this.getElement(placeName);
        element.addHTML(htmlText);
    },
    setHTML: function(htmlText, placeName) { 
        var element = this.getElement(placeName);
        element.setHTML(htmlText);
    },
    addElement: function(element, placeName) { 
        var element = this.getElement(placeName);
        element.addElement(element);
    },
    getElement: function(placeName) {
        alert('Method LMS.Widgets.Templates.BaseTemplate.getElement must be defined in derived class');
    }
});