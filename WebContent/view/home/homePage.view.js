sap.ui.jsview("view.home.homePage", {

    getControllerName : function() {
        return "view.home.homePage";
    },

    createContent : function(oController) {
        
        var productTabs= new sap.ui.commons.SegmentedButton({
            buttons:[
                     new sap.ui.commons.Button({id:"tab1",text:"Keyword",styled: false}).addStyleClass("productTabs"),
                     new sap.ui.commons.Button({id:"tab2",text:"4 Level",styled: false}).addStyleClass("productTabs"),
                     new sap.ui.commons.Button({id:"tab3",text:"Guided",styled: false}).addStyleClass("productTabs")
                     ]
                     }).addStyleClass("productTabs");

        var productListItemDetail = new sap.m.VBox({
            items :[
                new sap.m.HBox({
                    items :[ new sap.m.VBox({ items:[new sap.m.Text({ text: "{PRODUCT_DESC}"}).addStyleClass("productName"),
                             new sap.m.Text({ text: "{PRODUCT_ID}"}).addStyleClass("productDesc")]})
                             //new sap.m.Button({ icon: "sap-icon://favorite"}).addStyleClass("btnFavorites")
                             ]
            })
                
            ]
        }).addStyleClass("productListItemDetail");

        oController.productItems=new sap.m.CustomListItem("productListItem",{ 
                        content : productListItemDetail,
                        type: sap.m.ListType.Active
            
        }).addStyleClass("productItems");

        oController.productList = new sap.m.List({items: []}).addStyleClass("productList");

        

        var listContainer= new sap.m.VBox({
            items : [oController.productList]
        }).addStyleClass("listContainer");

        var productSearch =new sap.m.SearchField("productSearchField",{
            placeholder: "Enter a name, part number or description",
            search: function(event){
                oController.searchProduct(event, this);
            }
        }).addStyleClass("productSearch");

        var productForm=  new sap.ui.layout.form.Form("F1",{
            title: new sap.ui.core.Title({text: "Customer Information"}),
            editable: true,
            layout:  new sap.ui.layout.form.ResponsiveLayout(),
            formContainers: [
            new sap.ui.layout.form.FormContainer({
                   // title: "contact",
                    expandable: true,
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "Quotation ID",
                            fields: [new sap.ui.commons.TextField({layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})})],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Description",
                            fields: [new sap.ui.commons.TextField({layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})})],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Sold to Party",
                            fields: [new sap.ui.commons.TextField({layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})})],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "PO Number",
                            fields: [new sap.ui.commons.TextField({layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})})],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: "Date of Issue",
                            fields: [new sap.ui.commons.TextField({layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})})],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
                        }),
                        new sap.ui.layout.form.FormElement("recentOrders",{
                            fields: [new sap.ui.commons.Button({
                                text : "Recent Orders",
                                styled:false,
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4})                                
                            }).addStyleClass("btnRecentOrders")],
                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
                        }),
                        
                    ],
                    layoutData: new sap.ui.core.VariantLayoutData({
                        multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                     new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                                                                             new sap.ui.layout.GridData({linebreakL: false})]
                        })
                })
            ]
        }).addStyleClass("productForm");

        var leftContainer=new sap.ui.layout.VerticalLayout({
            content:[productTabs,productSearch,listContainer]
        }).addStyleClass("leftContainer");
        var rightContainer=new sap.ui.layout.VerticalLayout({
            content:[productForm]
        }).addStyleClass("rightContainer");

        var container = new sap.ui.layout.HorizontalLayout({
            content:[leftContainer,rightContainer]
        }).addStyleClass("homeContainer");
        return container;
    }

});