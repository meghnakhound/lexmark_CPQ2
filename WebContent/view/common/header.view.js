sap.ui.jsview("view.common.header", {
	getControllerName : function() {
		return "view.common.header";
	},
	createContent : function(oController) {
		var header=new sap.ui.layout.HorizontalLayout({
			content:[ 

			new sap.m.Image({
				src: "resources/images/Lexmark_logo.png",
				alt: "test image",
				decorative: false,
				densityAware: false
			}).addStyleClass("lexmarkIcon"),
			new sap.ui.layout.HorizontalLayout({
				content:[
					new sap.m.Label({
						text: "Welcome John Doe" 
					}).addStyleClass("welcomeMsg"),
			
					new sap.m.Label( {  
						text : "Logout",
					}).addStyleClass( "logout" )
				]
			}).addStyleClass("rightHeader")
		]

		}).addStyleClass("header");
		return header;
	}
});