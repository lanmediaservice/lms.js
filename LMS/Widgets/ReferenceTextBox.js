/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: ReferenceTextBox.js 28 2008-10-31 12:09:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.Generic, LMS.Components.DataSource, LMS.Components.DataSet
 */
JSAN.require('LMS.Widgets.Generic');

/**
 * Simple text box
 * @class
 * @augments LMS.Widgets.Generic
 */
	
LMS.Widgets.ReferenceTextBox = Class.create(LMS.Widgets.Generic, {
    dataSource : null,
    keyField : null,
    textField : null,
    onCreateElement: function() {
        var element = new Element("SPAN", {
              'id': this.DOMId
        }).update(this.getTextByKey(this.value));
        element.style.display = this.visible? "" : "none";
        element.setStyle(this.styles);
        return element;   
    },
    getTextByKey: function(key){
        if (this.dataSource && this.dataSource.dataSet && this.dataSource.dataSet.records){
            for (var i=0; i<this.dataSource.dataSet.records.length; i++) {
                var record = this.dataSource.dataSet.records[i];
                if (record[this.keyField]==key) {
                    return record[this.textField];
                }
            }
        }
        return key;
    },
    setDataSource: function (dataSource){
       this.dataSource = dataSource;
       this.dataSource.subscribe(this);
    },
    setValue: function(value) { 
        if (this.value != value) {
            if ($(this.DOMId)){
                $(this.DOMId).innerHTML = this.getTextByKey(value);
            }        
            this.value = value;
            this.onChange();
        }
    }
});

/**
 * @test testPaint
 * 
 * var dataSet = new LMS.Components.DataSet('dataSet');
 * var dataSource = new LMS.Components.DataSource('dataSource');
 * dataSource.setDataSet(dataSet);
 * dataSet.setRecords([{key:'1', value:'value 1'}, {key:'2', value:'value 2'}, {key:'3', value:'value 3'}])
 * var myBox = new LMS.Widgets.ReferenceTextBox('myBox');
 * myBox.dataSource = dataSource;
 * myBox.DOMId = "test";
 * myBox.keyField = 'key';
 * myBox.textField = 'value';
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 * myBox.setValue('1');
 * assertEquals("check value", myBox.getValue(), 1);
 */