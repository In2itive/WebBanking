define(["kendo", "app/data/data", "app/utils"], function (kendo, data, utils) {
	var _mapElem,
    	_mapObj,
    	_private,
    	_isOnline = true;    
    
 	//Private methods
	_private = {
		getLocation: function(options) {
			var dfd = new $.Deferred();

			//Default value for options
			if (options === undefined) {
				options = {enableHighAccuracy: true};
			}

			navigator.geolocation.getCurrentPosition(
				function(position) { 
					dfd.resolve(position);
				}, 
				function(error) {
					dfd.reject(error);
				}, 
				options);

			return dfd.promise();
		},
		
		initMap: function(position) {
			//Delcare function variables
			var myOptions,
    			mapObj = _mapObj,
    			mapElem = _mapElem,
    			pin,
    			locations = [],
                latlng,
                count;

			_mapElem = mapElem; //Cache DOM element
                
			// Use Google API to get the location data for the current coordinates
			latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
			myOptions = {
				zoom: 11,
				center: latlng,
				mapTypeControl: false,
				navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			    
			mapObj = new google.maps.Map(mapElem, myOptions);
			_mapObj = mapObj; //Cache at app level
			    
			pin = [
				{
					position: latlng,
					title: "Your Location"
				}
			];

			_private.addMarkers(pin, mapObj);
			
			// Get stores nearby
            
            /*
			_appData.getStarbucksLocations(position.coords.latitude, position.coords.longitude)
			.done(function(result) {
				var len = result.length,
				    pinImage = new google.maps.MarkerImage(
                                    "images/bcu-sprite.png",
                                    new google.maps.Size(49, 49),
                                    new google.maps.Point(0, 202)
                                    );

				for (var i = 0; i < len; i++) {
					locations.push({
						title: result[i].name + " : " + result[i].address1 + ", " + result[i].address2,
						position: new google.maps.LatLng(result[i].latitude, result[i].longitude),
                        icon: pinImage,
						animation: google.maps.Animation.DROP
					});
				}

				_private.addMarkers(locations, mapObj);
			})
			.fail(function() {
				alert("Error loading locations.");
			});*/
            
            app.views.branches.viewModel.branchList.fetch(function() {
            
                var result = app.views.branches.viewModel.branchList.data();
                count = result.length,
                console.log("branch-view.js initmap branchlist", app.views.branches.viewModel.branchList.data(), count,  app.views.home.viewModel.homeList.data());
    			pinImage = new google.maps.MarkerImage(
                                    "images/bcu-sprite.png",
                                    new google.maps.Size(49, 49),
                                    new google.maps.Point(0, 202)
                                    );
    
    			for (var i = 0; i < count; i++) {
    				locations.push({
    					title: result[i].name + " : " + result[i].address1 + ", " + result[i].address2,
    					position: new google.maps.LatLng(result[i].latitude, result[i].longitude),
                        icon: pinImage,
    					animation: google.maps.Animation.DROP
    				});
    			}
    
    			_private.addMarkers(locations, mapObj);
                
                })
            
		},
        
        
        
		addMarkers: function(locations, mapObj) {
			var marker,
			    currentMarkerIndex = 0;
            
            function createMarker(index) {
				if (index < locations.length) {
					var tmpLocation = locations[index];

					marker = new google.maps.Marker({
						position:tmpLocation.position,
						map:mapObj,
						title:tmpLocation.title,
						icon: tmpLocation.icon,
						shadow: tmpLocation.shadow,
						animation: tmpLocation.animation
					});

					oneMarkerAtTime();
				}
			}
            
			function oneMarkerAtTime() {
				google.maps.event.addListener(marker, "animation_changed", function() {
					if (marker.getAnimation() === null) {
						createMarker(currentMarkerIndex+=1);
					}
                    else{
                        createMarker(currentMarkerIndex+=2-1);
                    }
				});
			}				
            
            createMarker(0);

		},
        
        /*
		initStoreList: function(position) {
			_appData.getStarbucksLocations(position.coords.latitude, position.coords.longitude)
        			.done(function(data) {
        				//TODO: Bind data to listview
                        branchesViewModel.load(data);

        			})
        			.fail();
		}   */
    }
    
    return {
        viewModel: kendo.observable({
            branchList: data.branchList,
            navToBranchesList: function() {
                utils.navigate("views/branchesListView.html");
            },
            navToBranchesMap: function() {
             
                utils.navigate("#branchesmap");
            }
        }),
        
        init: function() {
			_mapElem = document.getElementById("map");
            app.views.branches.viewModel.branchList.fetch();

		},
        
        show: function() {
			//Don't attempt to reload map/sb data if offline
			//console.log("ONLINE", _isOnline);
			if (_isOnline === false) {				
				alert("Please reconnect to the Internet to load locations.");
    
				return;
			}
    
			utils.getMyLocation() 
			.done(function(position) { 
				//_private.initStoreList(position);
				_private.initMap(position); 
			})
			.fail(function(error) { 
				alert(error.message); /*TODO: Better handling*/ 
			});
            
            console.log("ONLINE", _isOnline);
			if (_isOnline === true) {
				$("#stores").show();
				$(".offline").hide();
                google.maps.event.trigger(map, "resize");
			}
			else {
				$("#stores").hide();
				$(".offline").show();
			}
		}
    };
});