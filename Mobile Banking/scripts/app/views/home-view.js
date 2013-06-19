define(["kendo", "app/data/data"], function (kendo, data) {
    return {
        viewModel: kendo.observable({
            homeList: data.homeList
        })
    };
});