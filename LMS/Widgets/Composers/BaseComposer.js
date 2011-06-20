/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: BaseComposer.js 27 2008-10-30 08:34:06Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 /** 
 * @requires LMS.Widgets.Generic
 */

/**
 * @namespace Base namespace for Composers Widgets classes
 */
LMS.Widgets.Composers = {};
/**
 * @class
 * @augments LMS.Widgets.Generic
 */
LMS.Widgets.Composers.BaseComposer = Class.create(LMS.Widgets.Generic, {
    parts: null,
    initialize: function() {
        this.parts = {};
    },
    setPart: function(key, part) { 
        this.parts[key] = part;
    },
    getCompilation: function() {
        alert('Method LMS.Widgets.Composers.BaseComposer.getCompilation must be defined in derived class');
    }
});