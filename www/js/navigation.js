// var myApp = new Framework7();
var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    swipePanel: 'right',
    // ... other parameters
});
var $$ = Dom7;



$(document).ready(function(e){
	var mainView = myApp.addView('.view-main');
	// mainView.showNavbar();
	// window.localStorage.clear();
	
	myApp.showIndicator();
	setTimeout(function () {
		myApp.hideIndicator();
		
		var logged_in = window.localStorage.getItem("logged_in");
		// var logged_in = 'yes';
		//if user has logged in
		if(logged_in == "yes")
		{
			
			mainView.router.loadPage('events.html');
			
			// mainView.showToolbar();
		}
		
		//user hasn't logged in. Open login page
		else
		{
			// mainView.router.loadPage('login.html');

			mainView.router.loadPage('events.html');
		}
	 }, 2000);
	
});
$$(document).on('pageInit', '.page[data-page="login"]', function (e) 
{
	$( "#index-logo" ).addClass( "display_none" );
})	
$$(document).on('pageInit', '.page[data-page="icpak-resources"]', function (e) 
{
	var mainView = myApp.addView('.view-main');
	mainView.showNavbar();
	$( "#resources-button" ).addClass( "active" );
	$( "#events-button" ).removeClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );
	$( "#black-login" ).addClass( "cached" );
	
	myApp.closePanel();

	get_publication_items();
	get_resources_items();
})

$$(document).on('pageInit', '.page[data-page="icpak-events"]', function (e) 
{
	var mainView = myApp.addView('.view-main');
	mainView.showNavbar();
	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).addClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );

	myApp.closePanel();

	get_event_items();
})
$$(document).on('pageInit', '.page[data-page="icpak-chat"]', function (e) 
{
	var mainView = myApp.addView('.view-main');
	mainView.showNavbar();

	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).removeClass( "active" );
	$( "#live-button" ).removeClass( "active" );
	$( "#chat-button" ).addClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	myApp.closePanel();
})

$$(document).on('pageInit', '.page[data-page="icpak-live"]', function (e) 
{
	var mainView = myApp.addView('.view-main');
	mainView.showNavbar();
	$( "#black-login" ).addClass( "cached" );
	$( "#resources-button" ).removeClass( "active" );
	$( "#events-button" ).removeClass( "active" );
	$( "#live-button" ).addClass( "active" );
	$( "#profile-button" ).removeClass( "active");
	$( "#chat-button" ).removeClass( "active" );
	myApp.closePanel();
	
	get_streaming_event();
})

$$(document).on('pageInit', '.page[data-page="member-profile"]', function (e) 
{

	var mainView = myApp.addView('.view-main');
	mainView.showNavbar();
	var member_no = window.localStorage.getItem("member_no");
		
	if(member_no != null )
	{
		$( "#black-login" ).addClass( "cached" );
		$( "#resources-button" ).removeClass( "active" );
		$( "#events-button" ).removeClass( "active" );
		$( "#live-button" ).removeClass( "active" );
		$( "#chat-button" ).removeClass( "active" );
		$( "#profile-button" ).addClass( "active");

		myApp.closePanel();
		get_profile_details();
	}
	else
	{
		$( "#black-login" ).removeClass( "cached" );
		mainView.router.loadPage('login.html');
	}
})

$$('#chat-content').on('click', function () {

  myApp.popup('.popup-about');
});



