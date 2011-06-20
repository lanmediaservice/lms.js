/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: LabelBox.js 49 2009-07-17 08:10:15Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
JSAN.require('LMS.Widgets.Generic');
JSAN.require('LMS.Widgets.Factory');

/**
 * Виджет для HTML элемента &lt;LABEL&gt; 
 * @class
 * @augments LMS.Widgets.BlockGeneric
 */
LMS.Widgets.ConditionBox = Class.create(LMS.Widgets.Generic, {
    fieldBox: null,
    operatorBox: null,
    argumentBox: null,
    fields: null,
    operators: null,
    controls: null,
    _allowRemove: null,
    operatorNames: {
        equal: '=',
        notequal: '\u2260',
        gt: '>',
        egt: '\u2265',
        lt: '<',
        elt: '\u2264',
        contain: 'Содержит',
        notcontain: 'Не содержит'
    },
    initialize: function($super) 
    {
        $super();
        if (!this.fields) {
            this.fields = {};
        }
        if (!this.operators) {
            this.operators = {};
        }
        if (!this.controls) {
            this.controls = {};
        }
        this.value = {
            field: null,
            operator: null,
            argument: null
        }
    },
    allowRemove: function(allow)
    {
        this._allowRemove = allow;
        return this;
    },
    setValue: function(value)
    {
        if (this.value != value) {
            this.setField(value.field, true);
            this.setOperator(value.operator, true);
            this.setArgument(value.argument, true);
            this.emit('valueChanged', this.value, this);
        }
    },
    setFields: function(fields)
    {
        this.fields = fields;
    },
    addField: function(fieldName, textName, operators, control)
    {
        this.fields[fieldName] = textName;
        if (operators) {
            this.operators[fieldName] = operators;
        }
        if (control) {
            this.controls[fieldName] = control;
        }
        return this;
    },
    setFieldOperators: function(fieldName, operators)
    {
        this.operators[fieldName] = operators;
    },
    onCreateElement: function()
    {
        var wrapper = LMS.Widgets.Factory('LayerBox');
        wrapper.setDOMId(this.DOMId);

        this.fieldBox = LMS.Widgets.Factory('SelectBox');
        this.fieldBox.setClassName('filter-field-box');
        this.fieldBox.addItem('Выберите поле...', 0);
        this.fieldBox.addItems(this.fields);
        LMS.Connector.connect(this.fieldBox, 'valueChanged', this, 'onChangeField')

        this.operatorBox = LMS.Widgets.Factory('SelectBox');
        this.operatorBox.setClassName('filter-operator-box');
        this.operatorBox.setVisible(false);
        LMS.Connector.connect(this.operatorBox, 'valueChanged', this, 'onChangeOperator')

        var control = this.controls[this.value.field]? this.controls[this.value.field] : 'EditBox';
        this.argumentBox = LMS.Widgets.Factory(control);
        this.argumentBox.setClassName('filter-argument-box');
        this.argumentBox.setVisible(false);
        LMS.Connector.connect(this.argumentBox, 'valueChanged', this, 'onChangeArgument')

        if (this.value.field) {
            this.fieldBox.setValue(this.value.field);
        }
        if (this.value.operator) {
            this.operatorBox.setValue(this.value.operator);
        }
        if (this.value.argument) {
            this.argumentBox.setValue(this.value.argument);
        }

        wrapper.addWidget(this.fieldBox);
        wrapper.addText('\xA0');
        wrapper.addWidget(this.operatorBox);
        wrapper.addText('\xA0');
        wrapper.addWidget(this.argumentBox);

        if (this._allowRemove) {
            var btnRemove = LMS.Widgets.Factory('ButtonBox');
            btnRemove.setClassName('filter-remove-box');
            btnRemove.addHTML('&ndash;')
            wrapper.addText('\xA0');
            wrapper.addWidget(btnRemove);
            LMS.Connector.connect(btnRemove, 'action', this, 'onRemove')
        }

        this.wrapperElement = wrapper.createElement();

        this.applyDecorators();
        
        return this.wrapperElement;
    },
    setField: function(fieldName, notEmitSignal)
    {
        if (this.value.field != fieldName) {
            this.value.field = fieldName;
            if (this.fieldBox && this.fieldBox.getValue()!=fieldName) {
                this.fieldBox.setValue(fieldName)
            }
            if (!notEmitSignal) {
                this.emit('valueChanged', this.value, this);
            }
        }
    },
    setOperator: function(operator, notEmitSignal)
    {
        if (this.value.operator != operator) {
            this.value.operator = operator;
            if (this.operatorBox && this.operatorBox.getValue()!=operator) {
                this.operatorBox.setValue(operator)
            }
            if (!notEmitSignal) {
                this.emit('valueChanged', this.value, this);
            }
        }
    },
    setArgument: function(argument, notEmitSignal)
    {
        if (this.value.argument != argument) {
            this.value.argument = argument;
            if (this.argumentBox && this.argumentBox.getValue()!=argument) {
                this.argumentBox.setValue(argument)
            }
            if (!notEmitSignal) {
                this.emit('valueChanged', this.value, this);
            }
        }
    },
    onChangeField: function(fieldName)
    {
        if (fieldName!=0) {
            var oldOperator = this.value.operator;

            var oldContol = this.controls[this.value.field]? this.controls[this.value.field] : 'EditBox';
            var newContol = this.controls[fieldName]? this.controls[fieldName] : 'EditBox';
            if (oldContol!=newContol) {
                var argumentDOMId = this.argumentBox.getDOMId();
                var argumentVisible = this.argumentBox.isVisible();
                this.argumentBox = LMS.Widgets.Factory(newContol);
                this.argumentBox.setDOMId(argumentDOMId);
                this.argumentBox.setClassName('filter-argument-box');
                this.argumentBox.setVisible(argumentVisible);
                this.argumentBox.setValue(null);
                this.argumentBox.paint();
                LMS.Connector.connect(this.argumentBox, 'valueChanged', this, 'onChangeArgument')
            }

            this.operatorBox.cleanItems();
            this.operatorBox.addItem('...', 0);
            var operators = {};
            this.operators[fieldName].each(function(operator){
                if (Object.isUndefined(this.operatorNames[operator])) {
                    operators[operator] = operator;
                } else {
                    operators[operator] = this.operatorNames[operator];
                }
            }, this);
            this.operatorBox.addItems(operators);
            this.operatorBox.setVisible(true);
            if (operators[oldOperator]) {
                this.operatorBox.setValue(oldOperator);
            } else {
                this.operatorBox.setValue(0);
            }
        } else {
            this.operatorBox.setValue(0);
            this.operatorBox.cleanItems();
            this.operatorBox.setVisible(false);
        }
        this.setField(fieldName);
    },
    onChangeOperator: function(operator)
    {
        if (operator!=0) {
            this.argumentBox.setVisible(true);
        } else {
            this.argumentBox.setVisible(false);
        }
        this.setOperator(operator);
    },
    onChangeArgument: function(argument)
    {
        this.setArgument(argument);
    },
    onRemove: function()
    {
        this.emit('remove', this);
    }

});

/**
 * @test setUp
 * JSAN.require('LMS.Widgets.SelectBox');
 * LMS.Widgets.TypeSelectBox = Class.create(LMS.Widgets.SelectBox, {
 *     initialize: function($super) {
 *         $super();
 *         this.addItem('Фильмы', 'movies');
 *         this.addItem('Аниме', 'anime');
 *         this.addItem('Сериалы', 'series');
 *     }
 * });
 * window.myBox = new LMS.Widgets.ConditionBox();
 * myBox.setDOMId("test");
 * myBox.addField('name', 'Название', ['equal', 'contain', 'notcontain']);
 * myBox.addField('year', 'Год', ['equal', 'notequal', 'gt', 'lt', 'egt', 'elt']);
 * myBox.addField('type', 'Тип', ['equal', 'notequal'], 'TypeSelectBox');
 */
 
/**
 * @test test1Paint
 * assertTrue('Painting', myBox.paint());
 * assertEquals("check DOMId", myBox.DOMId, "test");
 */

/**
 * @test test2AlertChanges
 * window.alertObject = function(value) {
 *     alert(Object.inspect($H(value)));
 * }
 * LMS.Connector.connect(window.myBox, 'valueChanged', window, 'alertObject');
 *
 */


/**
 * @test test3SetValue
 * myBox.setValue({field: 'year', operator: 'notequal', argument: 2000});
 *
 */