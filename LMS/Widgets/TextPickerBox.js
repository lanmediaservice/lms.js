/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: TextPickerBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires  LMS.Widgets.ReferenceTextBox, LMS.Widgets.ListBox, LMS.Widgets.TableBox, LMS.Widgets.Generic, LMS.Components.DataSource, LMS.Components.DataSet
 */
JSAN.require('LMS.Widgets.LayerBox');
JSAN.require('LMS.Widgets.TextBox');
JSAN.require('LMS.Widgets.ListBox');
JSAN.require('LMS.Widgets.Generic');

/**
 * Text Picker Box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.TextPickerBox = Class.create(LMS.Widgets.Generic, {
    data: null,
    listBox: null,
    textBox: null,
    buttonBox: null,
    menuWidthInPixels : 150,
    menuHeightInPixels : 150,
    initialize: function($super) {
        $super();
        this.data = {};
    },
    onCreateElement: function() {
        var wrapper = new LMS.Widgets.LayerBox();
        wrapper.setDOMId(this.DOMId)
        wrapper.onShowStyles = {display: 'inline-block'};
        wrapper.setStyle(this.styles);
        wrapper.setStyle({
            'cursor': 'pointer'
        });
        wrapper.setClassName(this.className);
        var self = this;

        wrapper.setEventHandler('click', function(){
            self.onShowPicker();
        });

        this.textBox = new LMS.Widgets.TextBox();
        this.textBox.setValue(this.getTextByValue(this.value));
        wrapper.addWidget(this.textBox);

        this.buttonBox = new LMS.Widgets.LayerBox();
        this.buttonBox.onShowStyles = {display: 'inline-block'};
        this.buttonBox.setHTML('&#9660;');
        wrapper.addWidget(this.buttonBox);
        this.wrapperElement = wrapper.createElement();
        return this.wrapperElement
    },
    setData: function(data) {
        this.data = data;
    },
    addItem: function(text, value) {
        this.data[value] = text;
    },
    setValue: function(value) { 
        if (this.value != value) {
            if (this.textBox){
                this.textBox.setValue(this.getTextByValue(value));
            }
            this.value = value;
            this.onChange();
        }
    },
    getTextByValue: function(value) {
        return (this.data[value]!=undefined)? this.data[value] : value;
    },
    onShowPicker: function(){
        if (!this.listBox) {
            this.listBox = new LMS.Widgets.ListBox();
            this.listBox.setClassName('text-picker-listbox');
            this.wrapperElement.setStyle({
                'border': '1px solid silver'
            });
            var offset = this.wrapperElement.cumulativeOffset();
            var left = offset[0];
            var top = offset[1] + this.wrapperElement.getHeight();
            this.listBox.setStyle({
                position: 'absolute',
                left: left+'px',
                top: top+'px',
                height: this.menuHeightInPixels+'px',
                width: this.menuWidthInPixels+'px',
                zIndex : 1000,
                backgroundColor: 'white',
                border: '1px solid silver'
            });
            this.listBox.setItemsValues(this.data);
            this.listBox.setValue(this.value);
            var self = this;
            this.listBox.onChange = function (){
                var value = self.listBox.getValue();
                self.setValue(value);
                self.removePicker();
            }
            var listBoxElement = this.listBox.createElement();
            document.body.appendChild(listBoxElement);
            this.onExit = function(event) {
                var element = Event.element(event);
                if ((listBoxElement != element) && (self.wrapperElement.childElements().indexOf(element) == -1)) {
                    self.onShowPicker();
                }
            }
            Event.observe(document.body, 'click', this.onExit);

        } else {
            this.removePicker();
        }
    },
    removePicker: function(){
        $(this.listBox.DOMId).remove();
        this.listBox = null;
        Event.stopObserving(document.body, 'click', this.onExit);
        this.onExit = null;
        this.wrapperElement.setStyle({
            'border': 'none'
        });
    },
    onExit : null
});

/**
 * @test testPaint
 * var languages = {'rus' : 'Русский', 'eng' : 'Английский', 'und' :'Неопределен'};
 * var myBox = new LMS.Widgets.TextPickerBox('myBox');
 * myBox.setData(languages);
 * myBox.DOMId = "test";
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * myBox.setValue("rus1");
 * assertEquals("check value", myBox.getValue(), "rus");
 */
