/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: ListBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.LayerBox, LMS.Widgets.Generic
 */

/**
 * Simple memo box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.ListBox = Class.create(LMS.Widgets.Generic, {
    itemsValues: null,
    value: null,
    currentRowElement: null,
    noWrap : true,
    sortOrder: null,
    onCreateElement: function() { 
        var element = new LMS.Widgets.LayerBox();
        element.setDOMId(this.DOMId);
        element.setClassName(this.className);
        if (this.styles) {
            element.setStyle(this.styles);
        }
        if (!this.sortOrder) {
            this.sortOrder = Object.keys(this.itemsValues);
        }
        for (var i=0; i<this.sortOrder.length; i++){
            var id = this.sortOrder[i];
            var rowWidget = new LMS.Widgets.LayerBox();
            rowWidget.setClassName('listbox-item');
            rowWidget.setValue(id);
            rowWidget.setStyle({
                whiteSpace : this.noWrap ? 'nowrap' : 'normal',
                border: '1px dashed transparent',
                cursor : 'pointer',
                padding: '2px'
            });
            rowWidget.setHTML(this.itemsValues[id]);
            var self = this;
            rowWidget.setEventHandler('click', this._getSelectEventHandler(self, rowWidget));
            rowWidget.setEventHandler('mouseover', function(){this.setStyle({borderColor:'gray'})});
            rowWidget.setEventHandler('mouseout', function(){this.setStyle({borderColor:'transparent'})});
            element.addWidget(rowWidget);
        }
        return element.createElement();            
    },
    setItemsValues: function(itemsValues) {
        this.itemsValues = itemsValues;
        this.sortOrder = null;
        this.paint();
    },
    setSortOrder: function(sortOrder) {
        this.sortOrder = sortOrder;
    },
    selectItem: function(rowWidget) {
        rowWidget.setStyle({
            color : 'white',
            backgroundColor : 'darkblue'
        });
    },
    deselectItem: function(rowWidget) {
        rowWidget.setStyle({
            color : '',
            backgroundColor : ''
        });
    },
    select: function(rowWidget) {
        value = rowWidget.getValue();
        if (this.value != value) {
            if (this.currentRowElement) this.deselectItem(this.currentRowElement);
            this.selectItem(rowWidget);
            this.currentRowElement = rowWidget;
            this.value = value;
            this.onChange();
        }
    },
    _getSelectEventHandler: function(listBox, rowWidget) { 
        return function () {
            listBox.select(rowWidget);
        }            
    }
});

/**
 * @test testPaint
 * var myBox = new LMS.Widgets.ListBox('myBox');
 * myBox.DOMId = "test";
 * myBox.itemsValues = {1: '111',2:'222', 3:'333'};
 * assertTrue('Painting', myBox.paint());
 */