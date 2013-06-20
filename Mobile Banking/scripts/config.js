define([], function () {
    var domain = "www.kendouimusicstore.com",
        serverUrl = "http://" + domain,
        serviceUrl = serverUrl + "/Services/MusicStore.svc",
        staticUrl = "./scripts/app/data";
    
    return {
        domain: domain,
        serverUrl: serverUrl,
        serviceUrl: serviceUrl,
        staticURL: staticUrl,
        homeUrl: staticUrl + "/homeData.json",
        branchesUrl: staticUrl + "/branches.json",
        accountsUrl: staticUrl + "/accountData.json",
        genresUrl: serviceUrl + "/Genres",
        artistsUrl: serviceUrl + "/Artists",
        albumsUrl: serviceUrl + "/Albums",
        loginUrl: serverUrl + "/Api/AccountApi",
        cartSubmitUrl: serverUrl + "/Api/CheckoutApi",
        orderHistoryUrl: serverUrl + "/OrderHistory"
    };
});