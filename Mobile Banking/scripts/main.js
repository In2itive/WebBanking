var app;

require.config({
	paths: {
	    jQuery: "../scripts/lib/jquery.min",
		kendo: "../scripts/lib/kendo.mobile.min",
        kendoIndexedListView: "../scripts/lib/kendo.indexedlistview"
	},
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        kendo: {
            exports: "kendo"
        }
    }
});

require(["jQuery", "app/app"], function($, application) {
    $(function() {
        app = application
        application.init();
    });
});