// var myApp = new Framework7();
var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    // ... other parameters
});
var $$ = Dom7;

var EventService = function() {
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

    this.getallEvents = function() {
		var request = url + "events/get_events" ;
        return $.ajax({url: request});
    }

    this.getEventDetail = function(id) {
		var request = url + "events/get_event_detail/"+id ;
        return $.ajax({url: request});
    }
    
}

$(document).ready(function(e){

	// get_events();
	mainView.hideToolbar();
	mainView.hideNavbar();
	myApp.showIndicator();

    setTimeout(function () {
        myApp.hideIndicator();
        var mainView = myApp.addView('.view-main');
		mainView.router.loadPage('events.html');

        mainView.showToolbar();
		mainView.showNavbar();

	
	}, 2000);

	
});




$$(document).on('pageInit', '.page[data-page="resources"]', function (e) 
{
	$( "#resources-button" ).addClass( "active" );
	$( "#profile-button" ).removeClass( "active" );
	$( "#events-button" ).removeClass( "active" );
	
})
$$(document).on('pageInit', '.page[data-page="events"]', function (e) 
{
	
	get_events();
	
	$( "#resources-button" ).removeClass( "active" );
	$( "#profile-button" ).removeClass( "active" );
	$( "#events-button" ).addClass( "active" );
})
$$(document).on('pageInit', '.page[data-page="profile"]', function (e) 
{
	$( "#resources-button" ).removeClass( "active" );
	$( "#profile-button" ).addClass( "active" );
	$( "#events-button" ).removeClass( "active" );

})

$$(document).on('navbarReinit', function (e) {
		alert("here");
  var navbar = e.detail.navbar;
  var page = e.detail.page;

});




function get_events()
{
	var service = new EventService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	var event_history = window.localStorage.getItem("events_history");
	
	$( "#events_list" ).html( event_history );
	//get client's credentials
	myApp.showIndicator();
    setTimeout(function () {
        
			service.getallEvents().done(function (employees) {
				var data = jQuery.parseJSON(employees);
				
				if(data.message == "success")
				{
					$( "#events_list" ).html( data.result );
					window.localStorage.setItem("events_history", data.result);
				}
				
				else
				{

				}
				myApp.hideIndicator();
			});
	}, 1000);
	// location.reload();
		
}
function get_in_events()
{

	var mainView = myApp.addView('.view-main');
	
	mainView.router.loadPage('events.html');
	

}
function get_event_detail(id)
{
	var service = new EventService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});

	
	//get client's credentials
	myApp.showIndicator();
    setTimeout(function () {
        
			service.getEventDetail(id).done(function (employees) {
				var data = jQuery.parseJSON(employees);
				myApp.hideIndicator();
				if(data.message == "success")
				{
					// alert(data.result );
					$( "#event_single" ).html( data.result );
					window.localStorage.setItem("events_single_history", data.result);
				}
				
				else
				{

				}

			});
	}, 2000);

}
