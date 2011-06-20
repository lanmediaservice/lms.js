/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: TableBox.js 49 2009-07-17 08:10:15Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * Зависимости
 * @requires LMS.Widgets.BlockGeneric
 */
JSAN.require('LMS.Component');
JSAN.require('LMS.Widgets.BlockGeneric');

/**
 * Ячейка таблицы на базе HTML-элемента &lt;TD&gt;
 * @class
 * @name LMS.Widgets.TableCell
 * @augments LMS.Widgets.BlockGeneric
 */
 
LMS.Widgets.TableCell = Class.create(LMS.Widgets.BlockGeneric, {
    width : null,
    align : null,
    vAlign : null,
    rowSpan : null,
    colSpan : null,
    _attributes: ['width', 'align', 'vAlign', 'rowSpan', 'colSpan'],
    onCreateElement: function() {
        this.wrapperElement = new Element("TD", {
            'id': this.DOMId
        });
        
        this.applyDecorators();

        return this.wrapperElement;
    },
    /**
     * Устанавливает ширину ячейки
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.setWidth
     * @param {integer/string} width
     * @return void
     */
    setWidth: function(value){
         this._setAttribute('width', value);
    },
    /**
     * Возвращает текущую ширину ячейки
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.getWidth
     * @return {mixed}
     */
    getWidth: function(){
        return this.width;
    },
    /**
     * Устанавливает тип горизонтального выравнивания ячейки
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.setAlign
     * @param {string} align left|right|center
     * @return void
     */
    setAlign: function(value){
         this._setAttribute('align', value, LMS.Widgets.IS_STRING);
    },
    /**
     * Возвращает текущий тип горизонтального выравнивания ячейки
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.getAlign
     * @return {mixed}
     */
    getAlign: function(){
        return this.align;
    },
    /**
     * Устанавливает тип вертикального выравнивания ячейки
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.setVerticalAlign
     * @param {string} top|middle|bottom|baseline
     * @return void
     */
    setVAlign: function(value){
         this._setAttribute('vAlign', value, LMS.Widgets.IS_STRING);
    },
    /**
     * Возвращает текущий тип вертикального выравнивания ячейки
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.getVerticalAlign
     * @return {mixed}
     */
    getVAlign: function(){
        return this.vAlign;
    },
    /**
     * Устанавливает число объединяемых влево ячеек
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.setRowSpan
     * @param {integer/string}
     * @return void
     */
    setRowSpan: function(value){
         this._setAttribute('rowSpan', value);
    },
    /**
     * Возвращает текущее число объединяемых влево ячеек
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.getRowSpan
     * @return {mixed}
     */
    getRowSpan: function(){
        return this.rowSpan;
    },
    /**
     * Устанавливает число объединяемых вниз ячеек
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.setColSpan
     * @param {integer/string}
     * @return void
     */
    setColSpan: function(value){
         this._setAttribute('colSpan', value);
    },
    /**
     * Возвращает текущее число объединяемых влево ячеек
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.getColSpan
     * @return {mixed}
     */
    getColSpan: function(){
        return this.colSpan;
    }
});

/**
 * Строка таблицы на базе HTML-элемента &lt;TR&gt;
 * @class
 * @name LMS.Widgets.TableRow
 * @augments LMS.Widgets.BlockGeneric
 */
 
LMS.Widgets.TableRow = Class.create(LMS.Widgets.BlockGeneric, {
    align : null,
    vAlign : null,
    _attributes: ['align', 'vAlign'],
    onCreateElement: function() {
        this.wrapperElement = new Element("TR", {
            'id': this.DOMId
        });
        
        this.applyDecorators();

        return this.wrapperElement;
    },
    /**
     * Устанавливает тип горизонтального выравнивания строки
     * @memberOf LMS.Widgets.TableRow
     * @function
     * @name LMS.Widgets.TableRow.setAlign
     * @param {string} align left|center|right|justify|char
     * @return void
     */
    setAlign: function(value){
         this._setAttribute('align', value, LMS.Widgets.IS_STRING);
    },
    /**
     * Возвращает текущий тип горизонтального выравнивания строки
     * @memberOf LMS.Widgets.TableRow
     * @function
     * @name LMS.Widgets.TableRow.getAlign
     * @return {mixed}
     */
    getAlign: function(){
        return this.align;
    },
    /**
     * Устанавливает тип вертикального выравнивания строки
     * @memberOf LMS.Widgets.TableRow
     * @function
     * @name LMS.Widgets.TableRow.setVerticalAlign
     * @param {string} top|bottom|middle|baseline
     * @return void
     */
    setVAlign: function(value){
         this._setAttribute('vAlign', value, LMS.Widgets.IS_STRING);
    },
    /**
     * Возвращает текущий тип вертикального выравнивания строки
     * @memberOf LMS.Widgets.TableCell
     * @function
     * @name LMS.Widgets.TableCell.getVerticalAlign
     * @return {mixed}
     */
    getVAlign: function(){
        return this.vAlign;
    }
});

/**
 * Диапазон ячеек для массовых операций над ячейками
 * @class
 * @augments LMS.Widgets.Component
 * @property {LMS.Widgets.TableBox} Ссылка на таблицу
 * @property {int} leftX
 * @property {int} topY
 * @property {int} rightX
 * @property {int} bottomY
 */

LMS.Widgets.CellRange = Class.create(LMS.Component, {
    tableBox : null,
    leftX: null,
    topY: null,
    rightX: null,
    bottomY: null,
    /**
     * Объединение диапазона ячеек. 
     * @memberOf LMS.Widgets.CellRange
     * @function
     * @name LMS.Widgets.CellRange.merge
     * @return void
     */
    merge: function() {
        this.tableBox.merge(this.leftX, this.topY, this.rightX, this.bottomY);
    }, 
    /**
     * Установка стиля для диапазона ячеек.
     * @memberOf LMS.Widgets.CellRange
     * @function
     * @name setStyle
     * @param {object} styles CSS-стили в виде объекта
     * @return void
     */
    setStyle: function(styles) {
        this.tableBox.setStyleToRange(styles, this.leftX, this.topY, this.rightX, this.bottomY);
    },
    /**
     * Установка ссылки на таблицу, в которой выбран диапазон
     * @memberOf LMS.Widgets.CellRange
     * @function
     * @name setTable
     * @param {LMS.Widgets.TableBox}
     * @return void
     */
    setTable: function(tableBox) {
        this.tableBox = tableBox;
    },
    /**
     * Установка диапазона
     * @memberOf LMS.Widgets.CellRange
     * @function
     * @name setRange
     * @param {int} leftX
     * @param {int} topY
     * @param {int} rightX
     * @param {int} bottomY
     * @return void
     */
    setRange: function(leftX, topY, rightX, bottomY) {
        this.leftX = leftX;
        this.topY = topY;
        this.rightX = rightX;
        this.bottomY = bottomY;
    }
});

/**
 * Таблица на базе HTML-элемента &lt;TABLE&gt;
 * @class
 * @augments LMS.Widgets.BlockGeneric
 * @property {object} defaultCellStyles Reference to parent object
 */
LMS.Widgets.TableBox = Class.create(LMS.Widgets.BlockGeneric, {
    //properties
    width : null,
    defaultCellStyles : null,
    _attributes: ['width'],
    //private
    currentCellWidget: null,
    currentCellCoordX: null,
    currentCellCoordY: null,
    tableRows: null,
    cells: null,
    skippedCells: null,
    maxCol: -1,
    maxRow: -1,
    initialize: function($super) {
        $super();
        this.defaultCellStyles = {};
        this.cells = [];
        this.tableRows = [];
        this.skippedCells = [];
    },
    onCreateElement: function() {
        this.wrapperElement = new Element("TABLE", {
            'id': this.DOMId
        });

        this.applyDecorators();

        var tableBody = this.wrapperElement.appendChild(new Element("TBODY"));
        
        for (var y = 0; y<=this.maxRow; y++){
            var tableRow = this._initRowWidget(y);
            this._appendNewRow(tableRow, tableBody);
        }
        return this.wrapperElement;
    },
    clean: function()
    {
        this.cells = [];
        this.tableRows = [];
        this.skippedCells = [];
        this.currentCellWidget = null;
        this.currentCellCoordX = null;
        this.currentCellCoordY = null;
        this.maxCol = -1;
        this.maxRow = -1;
        if ($(this.DOMId)) {
            this.paint();
        }
    },
    _initCellWidget: function(x, y) {
        if (Object.isUndefined(this.cells[y][x])){
            this.cells[y][x] = new LMS.Widgets.TableCell();
            this.cells[y][x].setStyle(this.defaultCellStyles);
        }
        if (x>this.maxCol) this.maxCol = x;
        if (y>this.maxRow) this.maxRow = y;
    },
    _initRowWidget: function(y) {
        var tableRow = this.row(y);
        tableRow.reset();
        for (var x=0; x<=this.maxCol; x++){
            if (!this.isSkippedCell(x, y)){
                this._initCellWidget(x, y);
                tableRow.addWidget(this.cells[y][x]);
            }
        }
        return tableRow;
    },
    _insertNewRow: function(tableRow, beforeTableRow) {
        if (beforeTableRow.wrapperElement) {
            var beforeNode = beforeTableRow.wrapperElement;
            var parentNode  = beforeNode.parentNode;
            parentNode.insertBefore(tableRow.createElement(), beforeNode);
        }
    },
    _appendNewRow: function(tableRow, tableBody) {
        if (!tableBody && this.wrapperElement) {
            tableBody = this.wrapperElement.getElementsByTagName("TBODY")[0];
        }
        if (tableBody) {
            tableBody.appendChild(tableRow.createElement());
        }
    },
    _appendChild: function(element) {
        this.currentCellWidget.addElement(element);
    },
    reset: function() {
        this.currentCellWidget.reset();
    },
    /**
     * Устанавливает ширину таблицы
     * На входе должны быть число или строка. Иначе свойство сбрасывается в null
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.setWidth
     * @param {integer/string} width
     * @return void
     */
    setWidth: function(value){
         this._setAttribute('width', value, LMS.Widgets.IS_STRING);
    },
    /**
     * Возвращает текущую ширину ячейки
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.getWidth
     * @return {mixed}
     */
    getWidth: function(){
        return this.width;
    },
    /**
     * Устанавливает "курсор" на ячейку с координатами x, y (верхняя, левая
     * ячейка имеет координаты 0, 0). Возвращает ссылку на виджет выбранной ячейки
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name selectCell
     * @param {int} x
     * @param {int} y
     * @return {LMS.Widgets.TableCell} Виджет текущей выбранной ячейки
     */
    selectCell: function(x, y) {
        this.currentCellWidget = this.cell(x, y);
        this.currentCellCoordX = x;
        this.currentCellCoordY = y;
        return this.currentCellWidget;
    },
    /**
     * Возвращает ссылку на виджет ячейки c координатами x, y.
     * Положение "курсора" не изменяется.
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name cell
     * @param {int} x
     * @param {int} y
     * @return {LMS.Widgets.TableCell} Виджет ячейки
     */
    cell: function(x, y) {
        this.row(y);//init row
        this._initCellWidget(x, y)
        return this.cells[y][x];
    },
    /**
     * Возвращает ссылку  на строку Y (верхняя строка имеет координату 0)
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name row
     * @param {int} y
     * @return {LMS.Widgets.TableRow} Виджет строки
     */
    row: function(y) {
        if (Object.isUndefined(this.tableRows[y])) {
            this.tableRows[y] = new LMS.Widgets.TableRow();
        }
        if (!this.cells[y]) this.cells[y] = [];//init cells
        if (!this.skippedCells[y]) this.skippedCells[y] = [];//init skipped cells
        return this.tableRows[y];
    },
    /**
     * Возвращает ссылку диапазон ячеек для удобного легкозапоминающегося 
     * выполнения массовых операций
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name range
     * @param {int} leftX
     * @param {int} topY
     * @param {int} rightX
     * @param {int} bottomY
     * @return {LMS.Widgets.CellRange} Виджет диапазона
     */
    range: function(leftX, topY, rightX, bottomY) {
        var cellRange = new LMS.Widgets.CellRange();
        cellRange.setRange(leftX, topY, rightX, bottomY);
        cellRange.setTable(this);
        return cellRange;
    },
    /**
     * Объединение ячеек по диапазону. Рекомендуется пользоваться  вызовом
     * LMS.Widgets.TableBox.range(leftX, topY, rightX, bottomY).merge() 
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.merge
     * @param {int} leftX
     * @param {int} topY
     * @param {int} rightX
     * @param {int} bottomY
     * @return void
     */
    merge: function(leftX, topY, rightX, bottomY) { 
        if ((rightX-leftX)>0) this.cell(leftX, topY).setColSpan(rightX-leftX+1);
        if ((bottomY-topY)>0) this.cell(leftX, topY).setRowSpan(bottomY-topY+1);
        for (var x = leftX; x<=rightX; x++) {
            for (var y = topY; y<=bottomY; y++) {
                if (!((x==leftX) && (y==topY))) {
                    this.setSkippedCell(x, y);
                }
            }
        }
    },
    /**
     * Установка стиля для диапазона ячеек. Рекомендуется пользоваться  вызовом
     * LMS.Widgets.TableBox.range(leftX, topY, rightX, bottomY).setStyle(styles) 
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name setStyleToRange
     * @param {object} styles CSS-стили в виде объекта
     * @param {int} leftX
     * @param {int} topY
     * @param {int} rightX
     * @param {int} bottomY
     * @return void
     */
    setStyleToRange: function(styles, leftX, topY, rightX, bottomY) { 
        for (var x = leftX; x<=rightX; x++){
            for (var y = topY; y<=bottomY;y++){
                if (!this.isSkippedCell(x, y)){
                    this.cell(x, y).setStyle(styles)
                }
            }
        }
    },
    /**
     * Удаление строки таблицы
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name removeRow
     * @param {int} y
     * @return void
     */
    removeRow: function(y) {
        this.row(y).remove();
        this.cells.splice(y, 1);
        this.skippedCells.splice(y, 1);
        this.tableRows.splice(y, 1);
        this.maxRow--;
        
    },
    /**
     * Вставка готовой таблицы в конец текущей таблицы или в определенное место
     * Ячейки строки переносятся из вставляемого виджета таблицы (она может быть
     * отрисована или нет). После переноса остатки вставлямой таблицы удаляются из 
     * DOM-дерева документа
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.insertTable
     * @param {LMS.Widgets.TableBox} tableBox 
     * @param {int} y Координата, начиная с которой будет вставлятся таблица (опционально)
     * @return void
     */
    insertTable: function(tableBox, y, afterTableRow) {
        if ('object'==typeof(afterTableRow)) {
            for (var i=0; i<this.maxRow; i++){
                if (afterTableRow==this.tableRows[i]) {
                    y = i + 1;
                    break;
                }
            }
        } 
        if (y==null) y = this.maxRow+1;
        if (tableBox.getMaxCol()>this.maxCol) this.maxCol = tableBox.getMaxCol();
        
        var newRowCount = tableBox.getRowCount();
        
        //сдвиг
        var appendMode = y>this.maxRow;
        for (var i=this.maxRow; i>=y; i--){
            this.cells[i+newRowCount] = this.cells[i] ;
            this.tableRows[i+newRowCount] = this.tableRows[i];
            this.skippedCells[i+newRowCount] = this.skippedCells[i];
        }
        //вставка
        for (var i = newRowCount-1; i>=0; i--){
            this.cells[y+i] = tableBox.cells[i] ;
            this.tableRows[y+i] = tableBox.row(i);
            this.skippedCells[y+i] = tableBox.skippedCells[i];
            this.maxRow++;
        }
        //обновление DOM
        if (appendMode) {
            for (var i = 0; i<newRowCount; i++){
                var tableRow = this._initRowWidget(y+i);
                this._appendNewRow(tableRow);
            }
        } else {
            for (var i = newRowCount-1; i>=0; i--){
                var tableRow = this._initRowWidget(y+i)
                this._insertNewRow(tableRow, this.tableRows[y+i+1]);
            }
        }
        tableBox.remove();
    },
    /**
     * Вставка строки
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.insertTable
     * @param {LMS.Widgets.TableBox} tableBox 
     * @param {int} y Координата, начиная с которой будет вставлятся таблица (опционально)
     * @return void
     */
    insertCells: function(cells, y, afterTableRow) {
        if ('object'==typeof(afterTableRow)) {
            for (var i=0; i<this.maxRow; i++){
                if (afterTableRow==this.tableRows[i]) {
                    y = i + 1;
                    break;
                }
            }
        } 
        if (y==null) y = this.maxRow+1;
        var newRowCount = cells.length;
        
        //сдвиг
        var appendMode = y>this.maxRow;
        for (var i=this.maxRow; i>=y; i--){
            this.cells[i+newRowCount] = this.cells[i] ;
            this.tableRows[i+newRowCount] = this.tableRows[i];
            this.skippedCells[i+newRowCount] = this.skippedCells[i];
        }
        //вставка
        for (var i = newRowCount-1; i>=0; i--){
            this.cells[y+i] = cells[i];
            this.tableRows[y+i] = new LMS.Widgets.TableRow();
            this.maxRow++;
        }
        //обновление DOM
        var insertedRows = []; 
        if (appendMode) {
            for (var i = 0; i<newRowCount; i++){
                var tableRow = this._initRowWidget(y+i);
                this._appendNewRow(tableRow);
                insertedRows.push(tableRow);
            }
        } else {
            for (var i = newRowCount-1; i>=0; i--){
                var tableRow = this._initRowWidget(y+i)
                this._insertNewRow(tableRow, this.tableRows[y+i+1]);
                insertedRows.push(tableRow);
            }
        }
        return insertedRows;
    },
    /**
     * Присоединение готовой таблицы
     * Ячейки строки переносятся из вставляемого виджета таблицы (она может быть
     * отрисована или нет). После переноса остатки вставлямой таблицы удаляются из 
     * DOM-дерева документа
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.joinTable
     * @param {LMS.Widgets.TableBox} tableBox 
     * @return void
     */
    joinTable: function(tableBox) { 
        if (tableBox.getMaxRow()>this.maxRow) this.maxRow = tableBox.getMaxRow();
        var maxCol = this.maxCol;
        for (var y = 0; y<=tableBox.maxRow; y++){
            this.row(y);//init row
            for(var x = 0; x<=tableBox.maxCol; x++){
                 var thisX = maxCol + x + 1;
                 this.cells[y][thisX] = tableBox.cell(x, y);
                 this.skippedCells[y][thisX] = tableBox.isSkippedCell(x, y);
                 if (!this.isSkippedCell(thisX, y)){
                     this.row(y).addWidget(this.cell(thisX, y));
                 }
            }
        }
        for (var y = tableBox.maxRow+1; y<=this.maxRow; y++){
            for(var x = maxCol+1; x<=this.maxCol; x++){
                 if (!this.isSkippedCell(x, y)){
                     this.row(y).addWidget(this.cell(x, y));
                 }
            }
        }
        tableBox.remove();
    },
    /**
     * Установка стиля ячейки по-умолчанию
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name setDefaultCellStyle
     * @param {object} styles CSS-style for apply to default cell
     * @return void
     */
    setDefaultCellStyle: function(styles) {
        this.defaultCellStyles = styles;
    },
     /**
     * Установить, что при рендеринге нужно пропустить ячейку с координатами x, y
     * @memberOf LMS.Widgets.TableBox
     * @private
     * @function
     * @name setSkippedCell
     * return void
     */
    setSkippedCell: function(x, y) { 
        if (!this.skippedCells[y]) this.skippedCells[y] = [];
        this.skippedCells[y][x] = 1;
    },
   /**
     * Возвращает статус ячейки x, y: нужно ли ее пропускать при рендеринге
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.isSkippedCell
     * return {bool}
     */
    isSkippedCell: function(x, y) { 
        if (!this.skippedCells[y]) return false;
        if (this.skippedCells[y][x]) return true;
        return false;
    },
   /**
     * Возвращает количество строк матрицы ячеек
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.getRowCount
     * return {integer}
     */
    getRowCount: function() {
        return this.maxRow + 1;
    },
   /**
     * Возвращает количество столюцов матрицы ячеек
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.getColCount
     * return {integer}
     */
    getColCount: function() {
        return this.maxCol + 1;
    },
   /**
     * Возвращает Y-координату самой нижней строки матрицы ячеек
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.getMaxRow
     * return {integer}
     */
    getMaxRow: function() {
        return this.maxRow;
    },
   /**
     * Возвращает X-координату самого правого столбца матрицы ячеек
     * @memberOf LMS.Widgets.TableBox
     * @function
     * @name LMS.Widgets.TableBox.getMaxRow
     * return {integer}
     */
    getMaxCol: function() {
        return this.maxCol;
    }
});

 
/**
 * @test setUp
 * window.myBox = new LMS.Widgets.TableBox();
 * myBox.DOMId = "test";
 * myBox.setStyle({'border':'1px solid black', 'borderCollapse':'collapse'});
 * myBox.setDefaultCellStyle({'border':'1px solid black'});
 * myBox.cell(3,3).addText('444');
 * myBox.cell(2,2).addText('3<3>3');
 * myBox.cell(1,1).addHTML('2<b>2</b>2');
 * myBox.cell(0,0).addText('111');
 * myBox.cell(1,0).addText('1');
 * myBox.range(0,3,1,3).merge();
 * myBox.range(2,0,3,1).merge();
 * myBox.range(0,0,3,0).setStyle({backgroundColor:'#aaaaaa'});
 * assertTrue('Painting', myBox.paint());
 */
 
 /**
 * @test test2Hide
 * window.myBox.setVisible(false);
 * assertFalse('Hide Test', window.myBox.isVisible());
 */
 
/**
 * @test test3Show
 * window.myBox.setVisible(true);
 * assertTrue('Show Test', window.myBox.isVisible());
 */
 
/**
 * @test test4RealTimeChangeCell_0_2
 * window.myBox.cell(0, 2).addHTML(' <b>+</b>');
 */
 
/**
 * @test test5HideRow_2
 * window.myBox.row(2).setVisible(false);
 */

/**
 * @test test5ShowRow_2
 * window.myBox.row(2).setVisible(true);
 */

/**
 * @test test6DeleteRow_2
 * window.myBox.removeRow(2);
 */
 
/**
 * @test test7InserTable
 * var tableBox = new LMS.Widgets.TableBox();
 * tableBox.cell(0,0).addHTML('new table 0 0');
 * tableBox.cell(1,1).addHTML('new table 1 1');
 * tableBox.range(0,0,1,1).setStyle({backgroundColor:'#dddddd'});
 * tableBox.setDOMId('test2');
 * document.body.appendChild(tableBox.createElement());
 * 
 * window.myBox.insertTable(tableBox);
 */
 
/**
 * @test test8InserCells
 * var c00 = new LMS.Widgets.TableCell();
 * c00.addHTML('new table 0 0');
 * var c11 = new LMS.Widgets.TableCell();
 * c11.addHTML('new table 1 1');
 * var cells = [
 *  [c00, new LMS.Widgets.TableCell()],
 *  [new LMS.Widgets.TableCell(), c11]
 * ];
 * window.myBox.insertCells(cells);
 */
  
/**
 * @test test9JoinTable
 * var tableBox = new LMS.Widgets.TableBox();
 * tableBox.setDefaultCellStyle({backgroundColor:'#eeeeee'});
 * tableBox.cell(0,0).addHTML('new table 0 0');
 * tableBox.cell(1,2).addHTML('new table 1 1');
 * tableBox.setDOMId('test2');
 * document.body.appendChild(tableBox.createElement());
 * 
 * window.myBox.joinTable(tableBox);
 */

/**
 * @test test10SetWidth90p
 * window.myBox.setWidth('90%');
 */
 