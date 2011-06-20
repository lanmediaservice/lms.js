/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: DateTimeBox.js 56 2009-10-30 10:50:13Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.EditBox, LMS.Widgets.LayerBox, LMS.Widgets.Generic, Calendar Lang RU-WIN, Calendar Setup, Calendar
 */
JSAN.require('LMS.Widgets.Generic');
JSAN.require('LMS.Widgets.Factory');

/**
 * Simple datetime box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.DateTimeBox = Class.create(LMS.Widgets.Generic, {
    // properties
    calendar : null,
    calendarCreated : false,
    editBox : null,
    value: '1999-01-01',
    onCreateElement: function() { 
        var self = this;
        if (this.calendar==null) {
            this.requireCalendar();
            this.calendar = new Dynarch.Calendar({
                dateFormat: '%Y-%m-%d %H:%M:%S',
                showTime: true,
                onSelect: function(cal) {
                    var date = Dynarch.Calendar.intToDate(cal.selection.get());
                    date = Dynarch.Calendar.printDate(date, '%Y-%m-%d %H:%M:%S');
                    self.setValue(date);
                    cal.hide();
                }
            });
        }
        var wrapper = new LMS.Widgets.Factory('LayerBox');
        wrapper.setDOMId(this.DOMId);
        this.setClassName('datetimebox');

        this.editBox = LMS.Widgets.Factory('EditBox');
        this.editBox.setValue(this.value);
        this.editBox.onChange = function () {
            self.setValue(this.value);
        }        
        
        var buttonElement = new Element("BUTTON").update('...');
        /*
        buttonElement.onclick = function () {
            self.calendar.create();
            self.calendarCreated = true;
            self.calendar.showAtElement(this);
        } */
        
        wrapper.addWidget(this.editBox);
        wrapper.addText('\xA0');
        wrapper.addElement(buttonElement);

        this.calendar.manageFields(buttonElement, this.editBox.getWrapperElement(), '%Y-%m-%d %H:%M:%S');

        this.wrapperElement = wrapper.createElement();
        this.applyDecorators();

        return this.wrapperElement;
    },
    setValue: function(value) { 
        if (this.value != value) {
            this.value = value;
            if (this.editBox) {
                this.editBox.setValue(value);
            }
/*            if (this.calendar) {
                this.calendar.parseDate(value);
            }*/
            this.emit('valueChanged', this.value, this);
        }
    },
    requireCalendar: function()
    {
        JSAN.require('Dynarch.Calendar');
        Dynarch.Calendar.LANG("ru", "русский", {

                fdow: 1,                // first day of week for this locale; 0 = Sunday, 1 = Monday, etc.

                goToday: "Сегодня",

                today: "Сегодня",         // appears in bottom bar

                wk: "нед",

                weekend: "0,6",         // 0 = Sunday, 1 = Monday, etc.

                AM: "am",

                PM: "pm",

                mn : [ "январь",
                       "февраль",
                       "март",
                       "апрель",
                       "май",
                       "июнь",
                       "июль",
                       "август",
                       "сентябрь",
                       "октябрь",
                       "ноябрь",
                       "декабрь" ],

                smn : [ "янв",
                        "фев",
                        "мар",
                        "апр",
                        "май",
                        "июн",
                        "июл",
                        "авг",
                        "сен",
                        "окт",
                        "ноя",
                        "дек" ],

                dn : [ "воскресенье",
                       "понедельник",
                       "вторник",
                       "среда",
                       "четверг",
                       "пятница",
                       "суббота",
                       "воскресенье" ],

                sdn : [ "вск",
                        "пон",
                        "втр",
                        "срд",
                        "чет",
                        "пят",
                        "суб",
                        "вск" ]

        });
    }
});

/**
 * @test test1Setup
 * window.myBox = new LMS.Widgets.DateTimeBox('myBox');
 * window.myBox.DOMId = "test";
 */

/**
 * @test test2Paint
 * window.myBox.setValue("2001-02-03");
 * assertTrue('Painting', window.myBox.paint());
 * assertEquals("check DOMId", window.myBox.DOMId, "test");
 * assertEquals("check value", window.myBox.getValue(), "2001-02-03");
 */

/**
 * @test test2AlertChanges
 * window.alertObject = function(value) {
 *     alert(value);
 * }
 * LMS.Connector.connect(window.myBox, 'valueChanged', window, 'alertObject');
 *
 */

/**
 * @test test3SetValue
 * window.myBox.setValue('2009-10-10 10:10');
 */
