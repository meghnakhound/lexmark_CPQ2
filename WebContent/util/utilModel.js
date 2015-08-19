jQuery.sap.declare("lexmark.cpq.poc.util.utilModel");

var utilModel = {
	applicationModelStack: [],

	getCallingModel:function(rootURL){
		if(!this.applicationModelStack[rootURL])
		{
			this.applicationModelStack[rootURL] = new sap.ui.model.odata.ODataModel(rootURL, true, 'vchourasia', 'Jairam12');
		}
		
		return this.applicationModelStack[rootURL];
		
	},

	makeGatewayServiceReadCall: function(rootURL, relPath, urlArgument, successFaultCallBack, context, callbackArguments){
		var callModel = this.getCallingModel(rootURL);
		
		callModel.read(relPath, null, [ urlArgument ], true,	function(response) {
			//Success function
			if(typeof( successFaultCallBack )==="function")
			{
				successFaultCallBack.apply(context,[response, true, callbackArguments]);
			}
		},
		function(response){
			//Error Function
			if(typeof( successFaultCallBack )==="function")
			{
				successFaultCallBack.apply(context,[response, false]);
			}
		});
	},

	makeGatewayServiceCreateCall: function(rootURL, relPath, data, callBack, context, callbackArguments){
		var callModel = this.getCallingModel(rootURL);
		callModel.create(relPath, data, null, function(response) {
		
			callBack.apply(context,[response, true, callbackArguments]);
			
		},
		function(response){

			callBack.apply(context,[response, false, callbackArguments]);

		});
	}
};