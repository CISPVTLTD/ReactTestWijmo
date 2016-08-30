import React from 'react';
var fetch = require('node-fetch');
var $ = require('jQuery');


var Grid = React.createClass({
    render:function(){
        return (
          <div className="content-box">
             <h1>Grid...</h1>
           <div className="button-box">
           <input type="button" onClick={() => this.refs.child.leftAlign()} value="Left Align" />
           <input type="button" onClick={() => this.refs.child.centerAlign()} value="Center Align" />
           <input type="button" onClick={() => this.refs.child.rightAlign()} value="Right Align" />
           </div>
           <div id='grid_01'><FlexGrid ref="child"/></div>
                
          </div>
            
       )
           },
    handleThatEvent: function(e){
        console.log(e);
        //update state, etc.
    }
})


var FlexGrid = React.createClass({
    render: function() {
        return (
         <div></div>
        );
    },
    leftAlign:function(){
        
        var c=this.grid.selection.col;
        var r =this.grid.selection.row;
        var rc = this.grid.getCellBoundingRect(r, c);
        var cell = document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);

        // make sure this is a regular cell (not a header)
        if (wijmo.hasClass(cell, 'wj-header')) {
            cell = null;
        }

        // make sure this is not an element within a cell
        while (cell && !wijmo.hasClass(cell, 'wj-cell')) {
            cell = cell.parentElement;
        }
        //cell.innerHTML = "<div style='text-align:left;'>"+cell.+"</div>"
        $(cell).removeClass("right").removeClass("center").addClass("left")
        
    },
    rightAlign:function(){
        
        var c=this.grid.selection.col;
        var r =this.grid.selection.row;
        //console.log(this);
        //console.log(this.grid.getCellData(row, column))

        //var cellData = this.grid.getCellData(row, column);
        //var html = "<div style='text-align:right;'>"+cellData+"</div>"
        //this.grid.setCellData(row,column,html);
        //cell.innerHTML = "<div style='text-align:left;'>"+cell.+"</div>"

        // find the cell from its bounding rectangle
        var rc = this.grid.getCellBoundingRect(r, c);
        var cell = document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);

        // make sure this is a regular cell (not a header)
        if (wijmo.hasClass(cell, 'wj-header')) {
            cell = null;
        }

        // make sure this is not an element within a cell
        while (cell && !wijmo.hasClass(cell, 'wj-cell')) {
            cell = cell.parentElement;
        }
        $(cell).removeClass("left").removeClass("center").addClass("right")

        
    },
    centerAlign:function(){
        
        var c=this.grid.selection.col;
        var r =this.grid.selection.row;
        var rc = this.grid.getCellBoundingRect(r, c);
        var cell = document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2);

        // make sure this is a regular cell (not a header)
        if (wijmo.hasClass(cell, 'wj-header')) {
            cell = null;
        }

        // make sure this is not an element within a cell
        while (cell && !wijmo.hasClass(cell, 'wj-cell')) {
            cell = cell.parentElement;
        }
        //cell.innerHTML = "<div style='text-align:left;'>"+cell.+"</div>"
        $(cell).removeClass("left").removeClass("right").addClass("center")
    },
    getInitialState: function() {
        return {

            // Grid options
            gridOpts: {
                selectionMode: wijmo.grid.SelectionMode.Cell,
                showSort: false,
                autoGenerateColumns: false,
                columns: [
                    {header: "Id", "binding":"id", "width":"*"},
                    {"header": "Title", "binding":"title", "width":"*"},
                    {"header": "Completed", "binding":"completed", "width":"*"}
                ],
                //note here that we are defining the formatter function here note that this calls the formatter in our script to actually apply the styling
                // the getAmountColor is the same funciton being called by both grids
                itemFormatter: function(panel, r, c, cell){
                    // validate CellType and if correct column
                    if (wijmo.grid.CellType.Cell == panel.cellType &&
                      panel.columns[c].binding == 'amount') {

                        // get the cell's data
                        var cellData = panel.getCellData(r, c);
                        console.log(cellData);
                        // set cell's foreground color
                        cell.style.color = getAmountColor(cellData);
                    }
                },
            },

             //Default data
            grid_01_data: []

        };
    },
    componentDidMount: function() 
    {
        
        var self = this;
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(this);
                this.setState({grid_01_data: data});
                this.cv = new wijmo.collections.CollectionView( this.state.grid_01_data );
                this.grid = new wijmo.grid.FlexGrid( '#grid_01', this.state.gridOpts);
                this.grid.itemsSource = this.cv;
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    // Inovolked immediately after the component's updates are flushed to the DOM, this method is not called after initial render.
    // Use this an 
    componentWillUnmount: function() {
        var div = $("#grid_01");
        var grid = wijmo.Control.getControl(div);
        grid.dispose();
    }

  
});
    
    
function getAmountColor(data){
}

export default Grid;

