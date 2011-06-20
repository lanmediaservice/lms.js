/** 
 * @requires LMS.Component
 */
 
/**
 * @class
 * @augments LMS.Component
 */
LMS.Components.Registry = Class.create(LMS.Component, {
    // properties
    data : {},
    clear: function() { 
        this.data = {};
    },
    set: function(key, value) { 
        if ('object'!=typeof(key)) {
            var arrayOfKey = [key];
        } else {
            var arrayOfKey = key;
        }
        var currentData = this.data;
        for (var i=0; i<(arrayOfKey.length-1); i++) {
            currentKey = arrayOfKey[i];
            if ('undefined'==typeof(currentData[currentKey])) {
                currentData[currentKey] = {};
            }
            currentData = currentData[currentKey];
        }
        lastKey = arrayOfKey[arrayOfKey.length-1];
        currentData[lastKey] = value;
    },
    get: function(key, defaultValue) { 
        if ('object'!=typeof(key)) {
            var arrayOfKey = [key];
        } else {
            var arrayOfKey = key;
        }
        var currentData = this.data;
        for (var i=0; i<(arrayOfKey.length-1); i++) {
            currentKey = arrayOfKey[i];
            if ('undefined'==typeof(currentData[currentKey])) {
                currentData[currentKey] = {};
            }
            currentData = currentData[currentKey];
        }
        lastKey = arrayOfKey[arrayOfKey.length-1];
        if ('undefined'==typeof(currentData[lastKey])) {
            return defaultValue;
        } else {
            return currentData[lastKey];
        }
    },
    setData: function(data) { 
        this.data = data;
    },
    clone: function() { 
        var cloneRegistry = new LMS.Components.Registry();
        cloneRegistry.setData(Object.clone(this.data));
        return cloneRegistry;
    }
});