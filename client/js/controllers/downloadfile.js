
    function DownloadJSON2CSV()
    {
        var array = typeof userCommands != 'object' ? JSON.parse(userCommands) : userCommands;
		
        var str = '';
		
		    for (var index in array[0].localrecord) {
                str += index + ',';
            }
		str += '\r\n';
		str += '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i].localrecord) {
                line += array[i].localrecord[index] + ',';
            }

            // Here is an example where you would wrap the values in double quotes
            // for (var index in array[i]) {
            //    line += '"' + array[i][index] + '",';
            // }

            line.slice(0,line.Length-1); 

            str += line + '\r\n';
        }
       // window.open( "data:text/csv;charset=utf-8," + escape(str))
    
	var link = document.createElement("a");
	//csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);    
    link.href = "data:text/csv;charset=utf-8," + escape(str);
    var fileName = "UserHistory";
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
	
	
	}

