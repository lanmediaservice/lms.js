/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: EditableListBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.Generic
 */

/**
 * @class
 * @augments LMS.Widgets.Generic
 */
LMS.Widgets.EditableListBox = Class.create(LMS.Widgets.Generic, {
	// properties
	widgetClass: null,
	inlineStyle: false,
	allowAdd: true,
	onCreateElement: function() {
        var wrapper = new LMS.Widgets.LayerBox();
        if (this.inlineStyle) wrapper.inlineStyle = true;
        if (this.styles) wrapper.setStyle(this.styles);
        if (Object.isArray(this.value)) {
            for (var i=0; i<this.value.length; i++) {
                var itemWidget = new this.widgetClass();
                itemWidget.setValue(this.value[i]);
                wrapper.addWidget(itemWidget);
                if (!this.readOnly) {
                    var deleteItemButtonBox = new LMS.Widgets.ButtonBox();
                    deleteItemButtonBox.setValue('[X]');
                    deleteItemButtonBox.onAction = this._getDeleteItemButtonBoxOnActionHandler(i);
                    wrapper.addWidget(deleteItemButtonBox);
                }
                wrapper.addElement(new Element("BR"));
            }
        }

        if (!this.readOnly && this.allowAdd) {
            var newItemWidget = new this.widgetClass();
            wrapper.addWidget(newItemWidget);
            
            var addItemButtonBox = new LMS.Widgets.ButtonBox();
            addItemButtonBox.setValue('[+]');
            var self = this;
            addItemButtonBox.onAction = function(){
                self.addItem(newItemWidget.getValue());
            };
            wrapper.addWidget(addItemButtonBox);
        }        
        wrapper.setDOMId(this.DOMId);
        return wrapper.createElement();
    },
    setValue: function(value) { 
        if (this.value != value) {
            this.value = value.clone();
            if ($(this.DOMId)){
                this.paint();
            }        
            this.onChange();
        }
    },
    deleteItem: function(index) {
        this.value.splice(index, 1);
        if ($(this.DOMId)){
            this.paint();
        }        
        this.onChange();
    },
    addItem: function(value) {
        if (!Object.isArray(this.value)) this.value = [];
        this.value.push(value);
        if ($(this.DOMId)){
            this.paint();
        }        
        this.onChange();
    },
    _getDeleteItemButtonBoxOnActionHandler: function(index){
        var self = this;
        return function() {
            self.deleteItem(index);
        }
    }
});

LMS.Widgets.CountriesListBox = Class.create(LMS.Widgets.EditableListBox, {
	// properties
	widgetClass: LMS.Widgets.EditBox
});

LMS.Widgets.GenresListBox = Class.create(LMS.Widgets.EditableListBox, {
	// properties
	widgetClass: LMS.Widgets.EditBox
});
LMS.Widgets.CompaniesListBox = Class.create(LMS.Widgets.EditableListBox, {
	// properties
	widgetClass: LMS.Widgets.EditBox
});


LMS.Widgets.NamesListBox = Class.create(LMS.Widgets.EditableListBox, {
	// properties
	widgetClass: LMS.Widgets.EditBox,
	inlineStyle: true
});

LMS.Widgets.PersonBox = Class.create(LMS.Widgets.Generic, {
	// properties
	editMode: false,
	onCreateElement: function() {
        if (this.editMode || !this.value) {
            var wrapper = new LMS.Widgets.LayerBox();
            wrapper.inlineStyle = true;
            //url
            var urlWidget = new LMS.Widgets.EditBox();
            if (this.value) urlWidget.setValue(this.value.url);
            wrapper.addWidget(urlWidget);
            //names
            var namesWidget = new LMS.Widgets.NamesListBox();
            if (this.value) namesWidget.setValue(this.value.names);
            wrapper.addWidget(namesWidget);
            //role
            var roleWidget = new LMS.Widgets.EditBox();
            if (this.value) roleWidget.setValue(this.value.role);
            wrapper.addWidget(roleWidget);
            //character
            var characterWidget = new LMS.Widgets.EditBox();
            if (this.value) characterWidget.setValue(this.value.character);
            wrapper.addWidget(characterWidget);
            wrapper.setDOMId(this.DOMId);
            return wrapper.createElement();
        } else {
            var wrapper = new LMS.Widgets.LayerBox();
            wrapper.inlineStyle = true;
            //url
            var str = '';
            if (this.value){
                str += this.value.names.join("/");
                str += ' (' + this.value.role + (this.value.character? (': '+this.value.character) : '') + ')';
            }
            var textWidget = new LMS.Widgets.TextBox();
            textWidget.setValue(str);
            wrapper.addWidget(textWidget);

            if (this.value && this.value.url) {
                var linkBox = new LMS.Widgets.LinkBox();
                linkBox.setHref(this.value.url);
                linkBox.setTarget('_blank');
                linkBox.setText('<img src="images/external_link.png" border="0">');
                wrapper.addText('\xA0');
                wrapper.addWidget(linkBox);
                wrapper.addText('\xA0');
            }
            
            wrapper.setDOMId(this.DOMId);
            return wrapper.createElement();
        }
    },
    setValue: function(value) { 
        if (this.value != value) {
            this.value = Object.clone(value);
            if ($(this.DOMId)){
                this.paint();
            }        
            this.onChange();
        }
    }
});

LMS.Widgets.PersonesListBox = Class.create(LMS.Widgets.EditableListBox, {
	// properties
	widgetClass: LMS.Widgets.PersonBox,
	styles: {whiteSpace: 'nowrap', overflow: 'auto', width: '295px', height: '200px', border: '1px solid silver'},
	allowAdd: false
});

LMS.Widgets.ReadOnlyPersonesListBox = Class.create(LMS.Widgets.EditableListBox, {
	// properties
	widgetClass: LMS.Widgets.PersonBox,
	readOnly: true
});
