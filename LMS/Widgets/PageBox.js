/** 
 * LMS JavaScript Framework
 * 
 * @version $Id: PageBox.js 54 2009-10-21 06:35:41Z macondos $
 * @copyright 2008
 * @author Ilya Spesivtsev <macondos@gmail.com>
 * 
 */
 
/** 
 * @requires LMS.Widgets.LayerBox, LMS.Widgets.Generic
 */

/**
 * Page box
 * @class
 * @augments LMS.Widgets.Generic
 */
 
LMS.Widgets.PageBox = Class.create(LMS.Widgets.Generic, {
    pages: null,
    headerBox: null,
    bodyBox: null,
    currentPageNum: null,
    _pageIndex: 0,
    headerHeight: '16px',
    onCreateElement: function() { 
        var wrapper = new LMS.Widgets.LayerBox();
        wrapper.setDOMId(this.DOMId);
        
        this.headerBox = this._createHeaderBox();
        wrapper.addWidget(this.headerBox);

        this.bodyBox = this._createBodyBox();
        wrapper.addWidget(this.bodyBox);
        return wrapper.createElement();            
    },
    _createHeaderBox: function() { 
        var wrapper = new LMS.Widgets.LayerBox();
        wrapper.setStyle({
            'margin-bottom':'-2px',
            verticalAlign: 'bottom'
        });
        var self = this;
        for (var i in this.pages) {
            var page = this.pages[i];
            if (!page.removed) {
                var headerBoxItem = new LMS.Widgets.LayerBox();
                //headerBoxItem.inlineStyle = true;
                headerBoxItem.setStyle({'float':'left'});
                if (page.enabled) {
                    headerBoxItem.setHTML(page.caption.enabled);
                    if (i==this.currentPageNum) {
                        this._applySelectedStyle(headerBoxItem);
                    } else {
                        this._applyDefaultStyle(headerBoxItem);
                        headerBoxItem.setEventHandler('click', this._getSelectEventHandler(i));
                    }
                } else {
                    headerBoxItem.setHTML(page.caption.disabled);
                    this._applyDisabledStyle(headerBoxItem);
                }
                wrapper.addWidget(headerBoxItem);
            }
        }
        return wrapper;
    },
    _repaintHeaderBox: function(){
        if (this.painted()) {
            var headerBoxDOMId = this.headerBox.DOMId;
            var newHeaderBox = this._createHeaderBox();
            newHeaderBox.setDOMId(headerBoxDOMId);
            this.headerBox = newHeaderBox;
            this.headerBox.paint();
        }
    },
    _createBodyBox: function() { 
        var wrapper = new LMS.Widgets.LayerBox();
        wrapper.setStyle({marginTop:'-2px'});
        wrapper.setStyle({
            backgroundColor: 'white',
            border: '1px solid silver',
            clear: 'both'
        })
        for (var i in this.pages) {
            var page = this.pages[i];
            if (!page.removed) {
                if (page.content) {
                    page.content.setVisible((i==this.currentPageNum)? true: false);
                    wrapper.addWidget(page.content);
                }
            }
        }
        return wrapper;
    },
    _applySelectedStyle: function(headerBoxItem) {
        headerBoxItem.setStyle({
            height: this.headerHeight,
            marginRight: '2px',
            paddingLeft: '4px',
            paddingRight: '4px',
            paddingBottom: '2px',
            marginBottom: '-1px',
            backgroundColor: 'white',
            border: '1px solid silver',
            borderBottom: 'none'
        })
    },
    _applyDefaultStyle: function(headerBoxItem) {
        headerBoxItem.setStyle({
            height: this.headerHeight,
            marginRight: '2px',
            paddingLeft: '4px',
            paddingRight: '4px',
            paddingBottom: '1px',
            marginBottom: '-1px',
            backgroundColor: '#f5f5f5',
            border: '1px solid silver',
            cursor: 'pointer'
        })
    },
    _applyDisabledStyle: function(headerBoxItem) {
        headerBoxItem.setStyle({
            height: this.headerHeight,
            marginRight: '2px',
            paddingLeft: '4px',
            paddingRight: '4px',
            paddingBottom: '1px',
            marginBottom: '-1px',
            backgroundColor: '#f5f5f5',
            color: 'gray',
            border: '1px solid silver'
        })
    },
    _addContentToBody: function(contentWidget) {
        contentWidget.setVisible(false);
        $(this.bodyBox.DOMId).appendChild(contentWidget.createElement());
    },
    addPage: function(enabledCaption, disabledCaption, enabled, content) {
        if (this.pages===null) this.pages = {};
        this.pages[this._pageIndex] = {
            caption: {
                enabled: enabledCaption,
                disabled: disabledCaption
            },
            enabled: enabled,
            content: content
        };
        this._pageIndex++;
        if (this.painted()) {
            this._addContentToBody(content);
            this._repaintHeaderBox();
            //this.paint();
        }
        return this._pageIndex - 1;
    },
    _removeContentFromBody: function(contentWidget) {
        $(this.bodyBox.DOMId).removeChild($(contentWidget.DOMId));
    },
    removePage: function(pageNum) {
        this.pages[pageNum].removed = true;
        if (this.painted()) {
            this._removeContentFromBody(this.pages[pageNum].content);
            this._repaintHeaderBox();
            //this.paint();
        }
    },
    selectPage: function(pageNum) {
        if ((pageNum!=this.currentPageNum)
            && (this.pages[pageNum].enabled)) {
            if (this.currentPageNum!==null) {
                this.pages[this.currentPageNum].content.setVisible(false);
            }
            this.pages[pageNum].content.setVisible(true);
            
            this.currentPageNum = pageNum;
            this._repaintHeaderBox();
        }
    },
    _getSelectEventHandler: function(pageNum) { 
        var self = this;
        return function () {
            self.selectPage(pageNum);
        }            
    },
    setCaption: function(pageNum, enabledCaption, disabledCaption) {
        this.pages[pageNum].caption = {
            enabled: enabledCaption,
            disabled: disabledCaption
        };
        this._repaintHeaderBox();
    },
    _replaceContent: function(pageNum, contentWidget, oldContentWidget) {
        if (this.currentPageNum!=pageNum) {
            contentWidget.setVisible(false);
        }
        $(this.bodyBox.DOMId).replaceChild(contentWidget.createElement(), $(oldContentWidget.DOMId));
    },
    setContent: function(pageNum, content) {
        this._replaceContent(pageNum, content, this.pages[pageNum].content);
        this.pages[pageNum].content = content;
    },
    enablePage: function(pageNum) {
        this.pages[pageNum].enabled = true;
        this._repaintHeaderBox();
    },
    disablePage: function(pageNum) {
        this.pages[pageNum].enabled = false;
        this._repaintHeaderBox();
    },
    painted: function() {
        return Object.isElement($(this.DOMId));
    }
});

/**
 * @test testPaint
 * var myBox = new LMS.Widgets.PageBox();
 * var content1 = new LMS.Widgets.LayerBox();
 * content1.setHTML('content 1');
 * var content2 = new LMS.Widgets.LayerBox();
 * content2.setHTML('content 2');
 * var content3 = new LMS.Widgets.LayerBox();
 * content3.setHTML('content 3');
 * var page1Num = myBox.addPage('Page1','page1', true, content1);
 * var page2Num = myBox.addPage('Page2','page2', false, content2);
 * var page3Num = myBox.addPage('Page3','page3', true, content3);
 * myBox.setDOMId('test');
 * assertTrue('Painting', myBox.paint());
 * myBox.selectPage(page1Num);
 * myBox.setCaption(page2Num, ' - Page2',' - page2');
 * myBox.enablePage(page2Num);
 * //myBox.disablePage(page1Num);
 * var content4 = new LMS.Widgets.LayerBox();
 * content4.setHTML('content 4');
 * var page4Num = myBox.addPage('Page4','page4', false, content4);
 */