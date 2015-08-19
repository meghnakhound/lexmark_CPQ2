sap.ui.controller("view.home.homePage", {
	onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();

        var lModel = new sap.ui.model.json.JSONModel('resources/model/productDetails.json');
        lModel.loadData('resources/model/productDetails.json');
        sap.ui.getCore().setModel(lModel); 
        this.productList.setModel(lModel); 
        this.productList.bindItems("/products", this.productItems);
    },

	doNavOnSelect : function (event) {
		this.bus.publish("nav", "to", {
			id : event
		});
	}
});