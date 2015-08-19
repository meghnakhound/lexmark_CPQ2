sap.ui.jsview("lexmark.cpq.poc.view.App", {

    getControllerName : function() {
        return "lexmark.cpq.poc.view.App";
    },

    createContent : function(oController) {
        
        var controls = [];
         // to avoid scrollbars on desktop the root view must be set to block display
        this.setDisplayBlock(true);

        this.app = new sap.m.SplitApp({});
	    this.app.addDetailPage(sap.ui.jsview("home", "view.home.homePage"));
       
        var header =  new sap.ui.jsview("lexmarkHeader", "view.common.header");
        controls.push(header);
        controls.push(this.app);

        return controls;
    }

});