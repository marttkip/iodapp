/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}

var StreamingService = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }
    this.get_recordings = function() {
		var request = url + "streaming/get_recording_event" ;
        return $.ajax({url: request});
    }

}

function get_streaming_event()
{
	var service = new StreamingService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});

	service.get_recordings().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#streaming_now" ).html( data.result );
			window.localStorage.setItem("streaming_now",data.result);
		}
		
		else
		{

		}
	});
}