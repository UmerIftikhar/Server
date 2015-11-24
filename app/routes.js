// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
	
	
	
///////////////////////////SAVE_______HISTORY
app.post('/saveuserhistory', function (req, res, next) {
        var bodyParser = require("body-parser");
	
		var Record            = require('../app/models/record');
		var newRecord            = new Record();
		newRecord.localrecord.email = req.body.loggedinUser;
		newRecord.localrecord.commands = req.body.commandEntered;
		newRecord.localrecord.sampledata1 = "sample1_test";
		newRecord.localrecord.sampledata2 = "sample2_test";
		
  Record.create(newRecord, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
///////////////////////////SAVE_______HISTORY


///////////////////////////GET_______HISTORY
app.post('/getuserhistory', function (req, res, next) {
        var bodyParser = require("body-parser");
	
		var Record            = require('../app/models/record');
		var email = req.body.loggedinUser;
			
		        Record.find({ 'localrecord.email' :  email }, function(err, record) {
            // if there are any errors, return the error
            if (err){
                console.log(err);
				return done(err);
					}
            // check to see if theres already a user with that email
            if (record) {
				console.log('Found:', record);
                res.json(record);
				//return record;
            } else {

			console.log('No document(s) found with defined "find" criteria!');
			
            }

        });

			
			
			
});
///////////////////////////GET_______HISTORY

	
	
	//sendemail
app.post('/sendemail', isLoggedIn, function(request,response){
	
	/*
	response.render('svg.ejs', {
          user: request.loggedinUser
        });
	*/

    //csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);


	//var send_to = request.body.loggedinUser;  //Could be used later.
    var obj = JSON.parse(request.body.userDetails);
	var mailer = require("nodemailer");
    var csvData = generateUserFile(obj);    
        
    var send_to = request.body.loggedinUser;  
    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
		//host: 'smtp.yourprovider.org',		//yourprovider = > gmail
        auth: {
            user: "uiftikhar1@gmail.com",
            pass: "Xyz#12345"
        }
    });
	
	    var mail = {
        from: "uiftikhar1@gmail",
        //to: "soccer_fan23@hotmail.com",
        to: send_to,
		subject: "Fastory Command History",
        text: "Please find attached your recent command history",
        html: "<b>Please find attached your recent command history</b>",
        attachments: [{
                fileName: 'Requested_User_History.csv', 
                filePath: csvData
                
            }
            ]
    }
	
    smtpTransport.sendMail(mail, function(error, response){
        if(error){
			//response.send('Username: ' + request.body.loggedinUser);
            console.log(error);
        }else{
                //response.send('Username: ' + request.query['username']);

            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });
	
	//response.send({message sent successfully});
        //response.render('sendemail.ejs'); // load the index.ejs file
	
	
});





    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
	
	// process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('svg.ejs', {
            user : req.user.local.email // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	
	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function generateUserFile(userCommands) {
    
    
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
        
        line.slice(0, line.Length - 1);
        
        str += line + '\r\n';
    }


    //var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(str);
    var csvData = "data:text/csv;charset=utf-8," + escape(str);
    return csvData;
}