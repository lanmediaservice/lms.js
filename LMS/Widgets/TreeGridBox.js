/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: TreeGridBox.js 48 2009-07-15 13:58:55Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * Зависимости
 * @requires LMS.Widgets.Generic
 */
JSAN.require('LMS.Widgets.Generic');
JSAN.require('LMS.Widgets.Factory');

LMS.Widgets.TreeGridBox = Class.create(LMS.Widgets.Generic, {
    tableBox: null,
    nodes: null,
    currentRow: 0,
    treeCol: 0,
    currentLevel: 0, 
    defaultCellStyle: null,
    initialize: function($super) {
        $super();
        this.nodes = [];
    },
    onCreateElement: function() {
        this.tableBox = LMS.Widgets.Factory('TableBox');
        if (this.nodes) {
            this.tableBox.selectCell(this.nodes[0].attributes.length-1,0);
            this.fillNodes(this.nodes);
        } else {
            this.tableBox.cell(0,0).addHTML("Нет данных");
        }
        
        this.wrapperElement = this.tableBox.createElement();

        this.setVisible(this.visible);
        this.setClassName(this.className);
        this.setStyle(this.styles);

        return this.wrapperElement;
    },
    fillNodes: function(nodes, hidden, parentNode) {
        if (parentNode) {
            this.currentLevel = parentNode.level + 1;
        }
        if (Object.isArray(nodes)) {
            var keys = $A($R(0, nodes.length-1));
        } else {
            var keys = Object.keys(nodes);
        }
        for (var i=0; i<keys.length; i++) {
            var key = keys[i];
            var node = nodes[key];
            var cells = [[]];
            var cell = LMS.Widgets.Factory('TableCell');
            cells[0][this.treeCol] = cell;
            cell.setStyle(this.defaultCellStyle);
            cell.setStyle({paddingLeft: (parseInt(this.currentLevel)*16 + (node.expandable? 0 : 16)) + 'px'});
            if (node.expandable) {
                var nodeButtonBox = LMS.Widgets.Factory('ActionBox');
                nodeButtonBox.onShowStyles = {display:'inline', zoom: 1, _overflow:'hidden'};
               /* nodeButtonBox.setStyle({display:'inline-block'});
                nodeButtonBox.setStyle({display:'-moz-inline-stack'});*/
                var expanderIconBox = LMS.Widgets.Factory('IconBox');
                expanderIconBox.setBase('/');
                expanderIconBox.setType(node.expand? 'minus' : 'plus', 16);
                nodeButtonBox.addWidget(expanderIconBox);
                nodeButtonBox.onAction = this._getToggleNodeHandler(node);
                cell.addWidget(nodeButtonBox);
                node.expanderIcon = expanderIconBox;
            }
            var col = 0;
            var attributes = Object.isArray(node.attributes)? node.attributes : Object.values(node.attributes);
            for (var j=0; j<attributes.length; j++) {
                if (!cells[0][col]) {
                    cells[0][col] = LMS.Widgets.Factory('TableCell');
                    cells[0][col].setStyle(this.defaultCellStyle);
                }
                var cell = cells[0][col];
                if (attributes[j] instanceof LMS.Widgets.Generic) {
                    cell.addWidget(attributes[j]);
                } else {
                    cell.addHTML(attributes[j]);
                }
                col++;
            }
            node.level = this.currentLevel;
            if (parentNode) {
                var rows = this.tableBox.insertCells(cells, null, parentNode.row);
            } else {
                var rows = this.tableBox.insertCells(cells);
            }
            node.row = rows[0];
            if (hidden) {
                rows[0].setVisible(false);
            }
            if (node.expandable) {
                this.currentLevel++;
                if (node.childNodes && node.childNodes.length) {
                    this.fillNodes(node.childNodes, !node.expand, node);
                }
                this.currentLevel--;
            }
        }
    },
    hideChildNodes: function(node) {
        if (node.childNodes && node.childNodes.length) {
            for (var i=0; i<node.childNodes.length; i++) {
                node.childNodes[i].row.setVisible(false);
                this.hideChildNodes(node.childNodes[i]);
            }
        }
    },
    showChildNodes: function(node) {
        if (node.childNodes && node.childNodes.length) {
            for (var i=0; i<node.childNodes.length; i++) {
                node.childNodes[i].row.setVisible(true);
                if (node.childNodes[i].expand) {
                    this.showChildNodes(node.childNodes[i]);
                }
            }
        }
    },
    setNodes: function(nodes) {
        this.nodes = nodes;
    },
    toggleNode: function(node) {
        if (node.expand) {
            if (node.onCollapse) {
                node.onCollapse();
            }
            this.hideChildNodes(node);
            node.expand = false;
        } else {
            if (node.onExpand) {
                node.onExpand();
            }
            if (node.load && !node.loaded) {
                var self = this;
                node.onLoad = function() {
                    self.fillNodes(node.childNodes, false, node);
                };
                node.load();
            } else {
                this.showChildNodes(node);
            }
            node.expand = true;
        }
        node.expanderIcon.setType(node.expand? 'minus' : 'plus', 16);
    },
    setTreeCol: function(treeCol) {
        this.treeCol = treeCol;
    },
    setDefaultCellStyle: function(styles) {
        this.defaultCellStyle = styles;
    },
    setWidth: function(width){
        this.tableBox.setWidth(width);
    },
    getWidth: function(){
        return this.tableBox.getWidth();
    },
    _getToggleNodeHandler: function(node) {
        var self = this;
        return function(){self.toggleNode(node)};
    }
});

 
/**
 * @test setUp
 * window.myBox = new LMS.Widgets.TreeGridBox();
 * window.myBox.setStyle({borderCollapse:'collapse'});
 * window.myBox.setDefaultCellStyle({border:'1px solid silver'});
 * window.myBox.setTreeCol(1);
 * var subnodes = [
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'a',2,3]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'b',3,4]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'c',4,5]}
 * ]; 
 * var subnodes2 = [
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'d',2,3]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'e',3,4]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'f',4,5]}
 * ]; 
 * var widget = LMS.Widgets.Factory('ImageBox');
 * widget.setSrc('http://www.google.com.by/intl/en_com/images/logo_plain.png');
 * var subnodes3 = [
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'g',2,3]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'h',3,widget]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'i',4,5]}
 * ]; 
 * var subnodes4 = [
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'g',2,3]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'h',3,4], childNodes:subnodes3, expandable:true, expand: false},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),'i',4,5]}
 * ]; 
 * var nodes = [
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),1,2,3]},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),2,3,4], expandable:true, expand: false, load:function(){alert(1);this.childNodes = subnodes4;this.loaded=true;this.onLoad()}},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),3,3,4], childNodes:subnodes, expandable:true, expand: true, onExpand:function(){alert('expand ' + this.userdefinedVar)}, onCollapse:function(){alert('collapse ' + this.userdefinedVar)}, userdefinedVar:'ok'},
 *   {attributes:[LMS.Widgets.Factory('CheckBox'),4,4,5], childNodes:subnodes2, expandable:true, expand: false}
 * ]; 
 * myBox.setNodes(nodes);
 * myBox.DOMId = "test";
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
 
 