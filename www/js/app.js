var Login_service = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }
	
    this.login_member = function(form_data) {
		var request = url + "login/login_member";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.edit_member_contact = function(form_data) {
		var request = url + "login/edit_member_contact";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.get_member_details = function(member_no){
    	var request = url + "login/get_member_information/" + member_no;
        return $.ajax({url: request});
    }
    this.getProfileDetails = function(member_no) {
     
		var request = url + "login/get_client_profile/"+member_no;
		return $.ajax({url: request});
		// return $.ajax({url: request, data: {applicationRefId: applicationRefId1, memberRefId: memberRefId1}, type: 'POST', processData: false,contentType: false});
		
   }
    this.get_event_user = function() {
		var request = url + "login/get_logged_in_member" ;
		// alert(url);
        return $.ajax({url: request});
    }
     this.post_cpd_query = function(form_data) {
		var request = url + "login/post_cpd_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.getEventsBookings = function(post_id,booking_refid) {
		var request = url + "events/get_accomodations" ;
        return $.ajax({url: url + "events/get_accomodations/"+post_id+ "/"+booking_refid});
    }
    this.getAccommodationAccount = function(booking_refid,accomodation_refid,post_id,hotel,fee,member_no) {
		var request = url + "events/getaccount" ;
		return $.ajax({url: request, data: {booking_refid: booking_refid,accomodation_refid: accomodation_refid,post_id: post_id, hotel: hotel, fee: fee, member_no: member_no}, type: 'POST', processData: false,contentType: false});
    }
    this.book_member = function(post_id,booking_refid,member_no,hotel,accomodation_refid,fee) {
    
		var request = url + "events/book_member_to_event";
		console.log({booking_refid: booking_refid, accomodation_refid: accomodation_refid, post_id: post_id, hotel: hotel, fee: fee, member_no: member_no});
		return $.ajax({url: request, data: {booking_refid: booking_refid, accomodation_refid: accomodation_refid, post_id: post_id, hotel: hotel, fee: fee, member_no: member_no}, type: 'POST'});
    }
    this.nonmemberbooking = function(form_data) {
		var request = url + "events/book_non_member_to_event";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

}


/* Function to check for network connectivity */
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() 
{
    
    cordova.plugins.backgroundMode.setDefaults({ title:'ICPAK LIVE', text:'ICPAK LIVE', silent: true});
    
    //check if background action is enabled
    var enabled = cordova.plugins.backgroundMode.isEnabled();
    if(enabled === false)
    {
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
    }

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        
        //clear other timeouts
        //clearTimeout(all_message_timeout);
        //clearTimeout(single_message_timeout);
        
    };
    
    cordova.plugins.backgroundMode.onfailure = function(errorCode) {
        cordova.plugins.backgroundMode.configure({
                        text:errorCode
                    });        
    };
}

$(document).ready(function(){
    // window.localStorage.clear();
    var member_no = window.localStorage.getItem('member_no');

    if(member_no != null)   
    {

        $( "#login_icon" ).html( '<a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a>' );
        $( "#profile_icon" ).html( '<li><a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" onClick="get_profile_details()"/><span>Profile</span></a></li>' );

    }
    else
    {


    }
    
    
    // automatic_login();
});


//Login member
$(document).on("submit","form#login_member",function(e)
{
    var mainView = myApp.addView('.view-main');

    e.preventDefault();
    //get form values
    var form_data = new FormData(this);

    //check if there is a network connection
    var connection = true;//is_connected();
    
    if(connection === true)
    {
        var service = new Login_service();
        service.initialize().done(function () {
            console.log("Service initialized");
        });
        service.login_member(form_data).done(function (employees) {
                var data = jQuery.parseJSON(employees);
                
                if(data.message == "success")
                {
                    var member_no = data['result']['member_number'];

                    window.localStorage.setItem("member_no", member_no);
                    window.localStorage.setItem("logged_in", 'yes');
                    window.localStorage.setItem("member_email", data['result']['member_email']);
                    window.localStorage.setItem("member_id", data['result']['member_id']);
                    window.localStorage.setItem("member_first_name", data['result']['member_first_name']);
                    window.localStorage.setItem("member_code", data['result']['member_code']);
					
                    var member_first_name = window.localStorage.getItem('member_first_name');

                    myApp.alert('Welcome back '+member_first_name+' Press OK to proceed');
                    // location.reload()
                    /*mainView.showNavbar();
                    mainView.router.loadPage('profile.html');
                    mainView.showNavbar();*/
					
					myApp.showIndicator();
					
					var mainView = myApp.addView('.view-main');
					mainView.router.back();
					//mainView.router.refreshPage();
					get_messages();
					// get_contacts();
                }
                else
                {
                     window.localStorage.setItem("logged_in", 'no');
                     myApp.alert(''+data.result+' Press OK to proceed');
                }
            });
    }
    
    else
    {
        myApp.alert('No internet connection - please check your internet connection then try again');
        
    }
    return false;
});

function get_profile_details()
{
    
    var service = new Login_service();
    service.initialize().done(function () {
        console.log("Service initialized");
    });
    
    var member_no = window.localStorage.getItem('member_no');

    var profile_details = window.localStorage.getItem('profile_details');

    // please show if there is somethis to show
    myApp.showIndicator();
        setTimeout(function () {

        service.getProfileDetails(member_no).done(function (employees) {
            var data = jQuery.parseJSON(employees);
            
            if(data.message == "success")
            {
                window.localStorage.setItem("my_profile",data.result);
                window.localStorage.setItem("cpd_questions",data.cpd_questions);

                $( "#my_profile" ).html( data.result );
                $( "#cpd_questions" ).html( data.cpd_questions );
            }
         
        });
        myApp.hideIndicator();
    }, 2000);
        
    var my_profile = window.localStorage.getItem('my_profile');
    var cpd_questions = window.localStorage.getItem('cpd_questions');

    $( "#my_profile" ).html( my_profile );
    $( "#cpd_questions" ).html( cpd_questions );
}
