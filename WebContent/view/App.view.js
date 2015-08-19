sap.ui.jsview("lexmark.cpq.poc.view.App", {

    getControllerName : function() {
        return "lexmark.cpq.poc.view.App";
    },

    createContent : function(oController) {
        var welcomeText= sap.m.Text({text:"Hello!"});
        return welcomeText;
    }

});