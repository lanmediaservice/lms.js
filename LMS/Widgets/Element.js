JSAN.require('LMS.Widgets.Generic');

LMS.Widgets.Element =  Class.create(LMS.Widgets.Generic, {
    mixedVar: null,
    initialize: function($super, mixedVar) 
    {
        $super();
        this.setMix(mixedVar);
    },
    
    setMix: function(mixedVar)
    {
        if (!this.isSingleObject(mixedVar)) {
            throw 'Fatal error: LMS.Widgets.Element constructor expect object with 1 key';
        }
        this.mixedVar = mixedVar;
    },
    
    onCreateElement: function() 
    {
        var tagName = Object.keys(this.mixedVar).shift();
        var tagValue = this.mixedVar[tagName];
        var matches, attributeString;
        if (matches = tagName.match(/^([^\s]+)\s*(.*?)$/)) {
            tagName = matches[1];
            attributeString = matches[2];
        }
        this.wrapperElement = new Element(tagName);
        
        if (attributeString) {
            var rx = /\b([^\s]+)\s*=\s*("[^"]*"|'[^']*'|[^\s]+)/g;
            while (matches = rx.exec(attributeString)) {
                var attributeName = matches[1];
                var attributeValue = matches[2].strip().replace(/^"(.*?)"$/, "$1").replace(/^'(.*?)'$/, "$1");
                this.__setAttribute(attributeName, attributeValue);
            }
        }
        
        if (Object.isArray(tagValue)) {
            for (var i=0; i<tagValue.length; i++) {
                var result = {};
                if (this.isAttribute(tagValue[i], result)) {
                    this.__setAttribute(result.attributeName, result.attributeValue)
                } else {
                    this.wrapperElement.appendChild(this.any2Element(tagValue[i]));
                }
            }
        } else {
            this.wrapperElement.appendChild(this.any2Element(tagValue));
        }
        
        this.wrapperElement.id = this.DOMId;        
        
        this.applyDecorators();
        
        return this.wrapperElement;
    },
    
    any2Element: function(mixedVar) 
    {
        switch (true) {
            case mixedVar instanceof LMS.Widgets.Generic:
                var newElement = mixedVar.createElement();
                break;
            case Object.isElement(mixedVar):
                var newElement = mixedVar;
                break;
            case mixedVar instanceof Object:
                var newElementWidget = new LMS.Widgets.Element(mixedVar);
                var newElement = newElementWidget.createElement();
                break;
            case Object.isNumber(mixedVar) || Object.isString(mixedVar):
                var newElement = document.createTextNode(mixedVar);
                break;
            default: 
                throw 'Fatal error: Node type is unknown in LMS.Widgets.Element.any2Element';
        }
        return newElement;
    },
    
    isAttribute: function(mixedVar, result) 
    {
        if (!this.isSingleObject(mixedVar)) {
            return false;
        }
        var attributeName = Object.keys(mixedVar).shift();
        if (attributeName.charAt(0) != '@') {
            return false;
        }
        result.attributeName = attributeName.substring(1);
        result.attributeValue = mixedVar[attributeName];
        return true;
    },
    
    isSingleObject: function(mixedVar)
    {
        if (Object.isArray(mixedVar)) {
            return false;
        }
        if ((mixedVar === null) || (typeof(mixedVar) != 'object')) {
            return false;
        }
        if (Object.keys(mixedVar).length != 1) {
            return false;
        }
        return true;
    },
    
    __setAttribute: function(attributeName, attributeValue)
    {
        switch (attributeName) {
            case 'id':
                this.setDOMId(attributeValue);
                break;
            case 'style':
                this.setStyle(attributeValue);
                break;
            case 'title':
                this.setTitle(attributeValue);
                break;
            case 'class':
                this.setClassName(attributeValue);
                break;
            default:
                this.wrapperElement[attributeName] = attributeValue;
        }
    }
});
