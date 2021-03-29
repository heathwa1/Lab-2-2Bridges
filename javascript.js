<!-- code where we build the map and its functionality -->


var mymap = L.map('map', {
  center:[47.219, -122.423],
  zoom:11,
  layers: [base, damage]
});
var base =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012, WSDOT'
});


var damage = L.layerGroup([sigDamage, modDamage, minDamage]);
var basemap = {"base":base};
var overlay = {"damage":damage};
L.control.layers(basemap, overlay).addTo(mymap);

var div_sigCircle = L.divIcon({className: "sigCircle"});
var div_modCircle = L.divIcon({className: "modCircle"});
var div_minCircle = L.divIcon({className: "minCircle"});

  $.getJSON("waBridgesPrj.geojson",
 			function(data){
		 	var allbridges = L.geoJson(data)
						var sigDamage = L.geoJson(data, {
							filter: function(feature,layer) {
								return feature.properties.InitialDam === "Significant Damage";
							},

							pointToLayer: function(feature, latlng) {
								return L.marker(latlng, {
									icon: div_sigCircle
								}).on("click", function(){
									sigDamage.bindPopup(feature.properties.RepairTime).openPopup();
								});
							}

						});
						var modDamage = L.geoJson(data, {
							filter: function(feature, layer) {
								return feature.properties.InitialDam === "Moderate Damage";
							},

							pointToLayer: function(feature, latlng) {
								return L.marker(latlng, {
									icon: div_modCircle
								}).on("click", function() {
									modDamage.bindPopup(feature.properties.RepairTime).openPopup();
								});
							}

						});

            var minDamage = L.geoJson(data, {
              filter: function(feature, layer) {
                return feature.properties.InitialDam === "Minor Damage";
              },

              pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                  icon: div_minCircle
                }).on("click", function() {
                  minDamage.bindPopup(feature.properties.RepairTime).openPopup();
                });
              }

            });

            sigDamage.addTo(mymap)
            modDamage.addTo(mymap)
            minDamage.addTo(mymap)


            //
            // $("#sixMoPlus").click(function() {
            //   mymap.addLayer(sixMoPlus)
            //   mymap.removeLayer(sixMos)
            // });
            // $("#sixMos").click(function() {
            //   mymap.addLayer(sixMos)
            //   mymap.removeLayer(sixMoPlus)
            // });
            // $("#allbridges").click(function() {
            //   mymap.addLayer(sixMoPlus)
            //   mymap.addLayer(sixMos)
            // });


								});

			// 			L.marker.bindPopup("Year Built: " + feature.properties.YearBuilt + "<br>Days to Replace: "+ feature.properties.RepairTime);
			// 			return L.marker;
      //
			// }).addTo(mymap);
	// });




$.getJSON("WSDOT_-_Seismic_Lifelines.geojson",
 	function(data){
 	L.geoJson(data).addTo(mymap);


// 	});
// }).addTo(map);

var Legend =  new L.Control.Legend({
  position: 'bottomright',
});

mymap.addControl(Legend);
$(".legend-container").append( $("#legend") );
});
