define(["kendo", "app/data/data"], 
function (kendo,  data) {
    return {
        viewModel: kendo.observable({
            accountsList: data.accountsList
        }),
        
        initAccounts: function() {

        }
        
    };
});