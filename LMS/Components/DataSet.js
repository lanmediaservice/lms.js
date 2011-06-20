/** 
 * @requires LMS.Component
 */
 
/**
 * @class
 * @augments LMS.Component
 */
LMS.Components.DataSet = Class.create(LMS.Component, {
    // properties
    records : null,
    dataSource: null,
    clear: function() { 
        this.records = null;
        if (this.dataSource) this.dataSource.doRefresh();
    },
    setRecords: function(records) { 
        this.records = records;
        if (this.dataSource) this.dataSource.doRefresh();
    },
    addRecord: function(record) { 
        if (this.records && this.records.push) {
            this.records.push(record);
        } else {
            this.records = [record];
        }
        if (this.dataSource) this.dataSource.doRefresh();
    }
});