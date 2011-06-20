/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: AdvancedListBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.LayerBox, LMS.Widgets.Generic
 */
JSAN.require('LMS.Widgets.Generic');
JSAN.require('LMS.Widgets.LayerBox');

/**
 * Table-based list box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.AdvancedListBox = Class.create(LMS.Widgets.Generic, {
    itemsValues: {},
    value: null,
    currentRowElement: null,
    noWrap : true,
    styles : {backgroundColor:'#fafafa'},
    tableStyles : {backgroundColor:'#fafafa', width:'100%'},
    colsWidth : [],
    headerCaptions : [],
    defaultHeaderCellStyles: {
        all: {color:'black', backgroundColor:'#f0f0f0', border: '1px solid silver'},
        left: {},
        right: {}
    },
    defaultCellStyles: {
        all: {color:'black', backgroundColor:'#fafafa', border: '1px solid #fafafa'},
        left: {},
        right: {}
    },
    defaultHotCellStyles: {
        all: {backgroundColor:'#fafafa',border: '1px solid white', borderTop: '1px dashed gray', borderBottom: '1px dashed gray'},
        left: {borderLeft: '1px dashed gray'},
        right: {borderRight: '1px dashed gray'}
    },
    defaultSelectedCellStyles: {
        all: {color:'white', backgroundColor:'darkblue',border: '1px solid white', borderTop: '1px dashed gray', borderBottom: '1px dashed gray'},
        left: {borderLeft: '1px dashed gray'},
        right: {borderRight: '1px dashed gray'}
    },
    rowElements:{},
    onCreateElement: function() { 
        var wrapper = new LMS.Widgets.LayerBox(null, this.DOMId);
        if (this.styles) {
            wrapper.setStyle(this.styles);
        }
        
        var table = new Element("TABLE", {
              'cellspacing': 0
        })
        table.setStyle({borderCollapse:'separate'});
        if (this.tableStyles) {
            table.setStyle(this.tableStyles);
        }
        var tableBody = new Element("TBODY");
        
        if (this.headerCaptions.length) {
            var tableHead = new Element("THEAD");
            var row = new Element('TR');
            for(var j=0; j<this.headerCaptions.length;j++){
                var cell = new Element('TH');
                cell.innerHTML = this.headerCaptions[j];
                if (this.colsWidth[j]) cell.setStyle({width: this.colsWidth[j]+'px'});
                row.appendChild(cell);
            }
            this.setStyleToRow(this.defaultHeaderCellStyles, row);
            tableHead.appendChild(row);
            table.appendChild(tableHead);
        }

        var itemsKeys = Object.keys(this.itemsValues);
        for (var i=0; i<itemsKeys.length; i++){
            var itemKey = itemsKeys[i];
            var row = new Element('TR');
            this.rowElements[itemKey] = row;
            row.setStyle({
                cursor : 'pointer'
            });
            var self = this;
            row.onclick = this._getSelectEventHandler(this, itemKey);
            row.onmouseover = this._getSetHotEventHandler(this, itemKey);
            row.onmouseout = this._getUnsetHotEventHandler(this, itemKey);
            
            if (Object.isArray(this.itemsValues[itemKey])) {
                for(var j=0; j<this.itemsValues[itemKey].length;j++){
                    var cell = new Element('TD');
                    if (this.colsWidth[j]) cell.setStyle({width: this.colsWidth[j]+'px'});
                    cell.innerHTML = this.itemsValues[itemKey][j];
                    row.appendChild(cell);
                }
            } else {
                var cell = new Element('TD');
                cell.innerHTML = this.itemsValues[itemKey];
                row.appendChild(cell);
            }
            this.setStyleToRow((itemKey==this.value)? this.defaultSelectedCellStyles : this.defaultCellStyles, row);
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);

        wrapper.addElement(table);
        return wrapper.createElement();            
    },
    setItemsValues: function(itemsValues) {
        this.itemsValues = itemsValues;
        this.paint();
    },
    selectRow: function(itemKey) {
        var row = this.rowElements[itemKey];
        this.setStyleToRow(this.defaultSelectedCellStyles, row)
    },
    deselectRow: function(itemKey) {
        var row = this.rowElements[itemKey];
        this.setStyleToRow(this.defaultCellStyles, row)
    },
    select: function(value) {
        if (this.value != value) {
            if (this.value) this.deselectRow(this.value);
            this.selectRow(value);
            this.value = value;
            this.onChange();
        }
    },
    setStyleToRow: function(cellStyles, row){
        var cells = row.descendants();
        for (var i=0;i<cells.length;i++){
           var style = {};
           cells[i].setStyle(cellStyles.all);
           if (0==i) {
               cells[i].setStyle(cellStyles.left);
           }
           if ((cells.length-1)==i){
               cells[i].setStyle(cellStyles.right);
           }
        }
    },
    setHot: function(itemKey) {
        var row = this.rowElements[itemKey];
        this.setStyleToRow((itemKey==this.value)? this.defaultSelectedCellStyles : this.defaultHotCellStyles, row)
    },
    unsetHot: function(itemKey) {
        var row = this.rowElements[itemKey];
        this.setStyleToRow((itemKey==this.value)? this.defaultSelectedCellStyles : this.defaultCellStyles, row)
    },
    _getSelectEventHandler: function(listBox, itemKey) { 
        return function () {
            listBox.select(itemKey);
        }            
    },
    _getSetHotEventHandler: function(listBox, itemKey) { 
        return function () {
            listBox.setHot(itemKey);
        }            
    },
    _getUnsetHotEventHandler: function(listBox, itemKey) { 
        return function () {
            listBox.unsetHot(itemKey);
        }            
    }
});

/**
 * @test testPaint
 * var myBox = new LMS.Widgets.AdvancedListBox('myBox');
 * myBox.DOMId = "test";
 * //myBox.noWrap = true;
 * myBox.headerCaptions = ['������','�����','������'];
 * myBox.colsWidth = [150,150,200];
 * //myBox.defaultAllCellStyle = {borderRight: '1px solid silver', textAlign:'right',padding:'0px',paddingRight:'3px'};
 * myBox.itemsValues = {1: ['111','112','113'],2:['221','222','223'], 3:['331','332','333']};
 * //myBox.itemsValues = {1: '111',2:'221', 3:'331', 53:'441',11: '111',12:'221', 13:'331', 153:'441'};
 * assertTrue('Painting', myBox.paint());
 */