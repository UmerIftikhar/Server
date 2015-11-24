function myCreateFunction() {
    var table = document.getElementById("myTable");
    
	for(var j=0;j<userCommands.length;j++){
	
		var tbl = document.getElementById('myTable'); // table reference
        row = tbl.insertRow(tbl.rows.length);      // append table row

//document.getElementById('myTable').rows[0].cells[0].innerHTML == "commands";
//userCommands[0].localrecord.sampledata1;		
// insert table cells to the new row
		for (var i = 0; i < tbl.rows[0].cells.length; i++) {
			createCell(row.insertCell(i), userCommands[j].localrecord[tbl.rows[0].cells[i].innerHTML], 'row');
		}
	
	}
	
         
        pager.init(); 
        pager.showPageNav('pager', 'pageNavPosition'); 
        pager.showPage(1);

	
}


function createCell(cell, text, style) {
    var div = document.createElement('div'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell
}