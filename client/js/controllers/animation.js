// application is here

/* 
first part is configuration data.
It is always good to separate data from algorithms
In the end it is good to load it from separate file to keep
your application clean...
*/
var config = {
	pallet : {
		size : 25
	},
	positions : [
		{
			x:423,
			y:208
		},
		{
			x:150,
			y:125
		},
		{
			x:465,
			y:208
		},
		{
			x:225,
			y:15
		},
		{
			x:640,
			y:208
		},
		{
			x:658,
			y:238
		}
	]
}
/* 
Some global variables. Globals are undesired but will go for now
pallets - an array of bites defining where exist a pallet
pallet - a d3 svg object which we can move. consider to have an array instead to have multiple pallets

*/
var pallets = [1,1,1,1,1];
var myPallets = new Array(3);
var count = 0;
var pallet;
var loadPallet = false;
var palletZone3 = false;
var palletZone5 = false;
var check3 = true;
var x = new XMLHttpRequest();
x.onreadystatechange = function(){
    if( x.status === 200 && x.readyState === 4) {
      // Optional callback for when request completes
	  //userCommands = x.responseText;
      console.log(x.responseText);
    }
  }



/**function to add a pallet. 
*/
function add_pallet1(){
	if(!loadPallet){
	var svg = d3.select('svg'); // get root svg object to add pallets in it
	pallet = svg.append('rect') // create a pallet and assign to the pallet 
		.attr("x" , config.positions[0].x) 		// NB! as you can see prev line does not have semicolon
		.attr("y" , config.positions[0].y) 		// NB! and in current lines you are using .attr()
		.attr("width" , config.pallet.size) 	// NB! which means that the operatiosn will be done on
		.attr("height" , config.pallet.size); 	// NB! the same object.
		
		changeColor("WS7_Sensor2","Presence_Sensor_ON");
		//document.getElementById("WS7_Sensor2").className = "circle.Presence_Sensor_ON";
		//document.getElementById(id).className.animVal;
		loadPallet = true;
		myPallets[0] = pallet;
		
		
		x.open('POST', '/saveuserhistory', true);
		x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		x.send("loggedinUser=" + loggedinUser + "&commandEntered=" + "Load_Pallet");		
		
	}
	
};

/**funciton to animate the movement
*/
function move_pallet13(){
	pallet.transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[2].x) 	//assigning new values
		.attr("y",config.positions[2].y)
		.duration(1000);					//defining how long the duration will take
};


function move_pallet23(){
	
	if(loadPallet && !palletZone3){
		loadPallet = false;
		palletZone3 = true;
		myPallets[1] = myPallets[0];
	myPallets[1].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[2].x) 	//assigning new values
		.attr("y",config.positions[2].y)
		.duration(1000);					//defining how long the duration will take
			
	changeColor("WS7_Sensor2","Presence_Sensor_OFF");
	changeColor("WS7_Sensor3","Presence_Sensor_ON");	
	
	
		x.open('POST', '/saveuserhistory', true);
		x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		x.send("loggedinUser=" + loggedinUser + "&commandEntered=" + "Pallet_Moved_From_2_to_3");
	}
	
};



function move_pallet35(){
	if(check3 && palletZone3 && !palletZone5){
		check3 = false;
		myPallets[2] = myPallets[1];
	myPallets[2].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[4].x) 	//assigning new values
		.attr("y",config.positions[4].y)
		.duration(2500);					//defining how long the duration will take
		
		
		var myVar = setTimeout(move_pallet35_curve, 2500);
		//clearTimeout(myVar);
		
			
	changeColor("WS7_Sensor3","Presence_Sensor_OFF");
	}
			
		
};


function move_pallet35_curve(){

		palletZone3 = false;
		palletZone5	= true;
	myPallets[2].transition() // movement is to be done on the d3 object created in add_pallet1(). You will need to use .transitions().
		.attr("x",config.positions[5].x) 	//assigning new values
		.attr("y",config.positions[5].y)
		.duration(1000);					//defining how long the duration will take
		
	var myVar = setTimeout(changeColor, 1000,"WS8_Sensor1","Presence_Sensor_ON");
	check3 = true;
	//changeColor("WS8_Sensor1","Presence_Sensor_ON");	
	
		x.open('POST', '/saveuserhistory', true);
		x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		x.send("loggedinUser=" + loggedinUser + "&commandEntered=" + "Pallet_Moved_From_3_to_5");
		
};


function storepallet(){
	if(palletZone5){
	myPallets[2].remove();
	changeColor("WS8_Sensor1","Presence_Sensor_OFF");
	palletZone5 = false;
	
		x.open('POST', '/saveuserhistory', true);
		x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		x.send("loggedinUser=" + loggedinUser + "&commandEntered=" + "Pallet_Stored");
	}
	
}

function changeColor(id, newclass){

	//document.getElementById(id).className = newclass;
	//document.getElementById(id).className+=newclass;
	//var oldClass = document.getElementById(id).className;
	//var oldClassName = oldClass.animVal;
	//var assignClassName = oldClassName + " " + newclass;
	//document.getElementById(id).className = assignClassName;
	//document.getElementById(id).className = "Presence_Sensor_OFF Presence_Sensor_ON";
	//document.getElementById(id).className.baseVal = "Presence_Sensor_ON"
	document.getElementById(id).className.baseVal = newclass;
	
}









