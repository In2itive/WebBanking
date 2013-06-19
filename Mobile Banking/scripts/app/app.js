define(["jQuery", "kendo", "app/utils", "app/views/home-view", "app/views/branch-view"], 
    function ($,   kendo,   utils,       homeView,              branchView) {
    var _kendoApplication;
 
     var _onError = function (error, url, line) {
        utils.showError(error);
    };
    
    return {
        init: function () {
            window.onerror = _onError;
            _kendoApplication = new kendo.mobile.Application(document.body, { 
                transition: "slide", 
                layout: "page-default",
                initial: "home-view",
                loading: '<h1 class="loading-message">Loading...</h1>'
            });
            utils.init(_kendoApplication);
        },
        views: {
            home: homeView,
            branches : branchView
        }
    }
});
