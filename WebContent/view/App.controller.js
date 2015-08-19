sap.ui.controller("lexmark.cpq.poc.view.App", {
	
	onInit : function () {

		// subscribe to event bus
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navHandler, this);
		bus.subscribe("nav", "backToPage", this.navHandler, this);
		bus.subscribe("nav", "back", this.navHandler, this);
		bus.subscribe("nav", "virtual", this.navHandler, this);		
	},
	
	navHandler: function (channelId, eventId, data) {
		var app = this.getView().app;
		if (eventId === "to") {
			this.navTo(data.id, data.data, true);
		} else if (eventId === "backToPage" && data && data.id) {
			app.backToPage(data.id);
		} else if (eventId === "back") {
			if(data && data.id){
				this.navBack(data.id);
			} else {
				jQuery.sap.history.back();				
			}
		} else if (eventId === "virtual") {
			jQuery.sap.history.addVirtualHistory();
		} else {
			jQuery.sap.log.error("'nav' event cannot be processed. There's no handler registered for event with id: " + eventId);
		}
	},
	
	navTo : function (id, data, writeHistory) {
		if (id === undefined) {
			
			// invalid parameter
			jQuery.sap.log.error("navTo failed due to missing id");
		
		} else {

			var app = this.getView().app;
			// navigate in the app control
			app.to(id, "slide", data);
			
		}
	},
	
	navBack : function (id) {
		
		if (!id) {
			
			// invalid parameter
			jQuery.sap.log.error("navBack - parameters id must be given");
		
		} else {
			// ... and navigate back
			var app = this.getView().app;
			var currentId = (app.getCurrentPage()) ? app.getCurrentPage().getId() : null;
			if (currentId !== id) {
				app.backToPage(id);
				jQuery.sap.log.info("navBack - back to page: " + id);
			}
		}
	}
});