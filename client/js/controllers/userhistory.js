function  getUserRecords() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
		userCommands = JSON.parse(xhttp.responseText);
		myCreateFunction();
    }
  };
  xhttp.open('POST', '/getuserhistory', true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("loggedinUser=" + loggedinUser);
  
}