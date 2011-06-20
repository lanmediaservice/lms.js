/** 
 * @requires LMS.Component
 */
 
/**
 * @class
 * @augments LMS.Component
 */
 
LMS.Components.DataSource = Class.create(LMS.Component, {
    // properties
    dataSet: null,
    subscribers: [],
    subscribe: function(subscriber) { 
        this.subscribers.push(subscriber);
    },
    setDataSet: function(dataSet) { 
        this.dataSet = dataSet;
        this.dataSet.dataSource = this;
    },
    doRefresh: function(records) { 
        for (var i in this.subscribers) {
            var subscriber = this.subscribers[i];
            if (subscriber && subscriber.paint) subscriber.paint();
        }
    }
});