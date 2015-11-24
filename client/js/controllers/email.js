function sendEmailToUser() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
  
    }
  };
  xhttp.open('POST', '/sendemail', true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //xhttp.send("loggedinUser=" + loggedinUser + "&commandEntered=" + "Load_Pallet");
  xhttp.send("loggedinUser=" + loggedinUser + "&userDetails=" + JSON.stringify(userCommands));
 
}