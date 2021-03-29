<!-- code where we build the map and its functionality -->


var mymap = L.map('map', {
  center:[47.219, -122.423],
  zoom:11,

});
var basemap =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012, WSDOT'
}).addTo(mymap);


var allbridges = L.layerGroup();
  $.getJSON("waBridgesPrj.geojson",
	function(data){
	// var allbridges = L.geoJson(data)
	var sigDamage = L.geoJson(data, {
		filter: function(feature,layer) {
			return feature.properties.InitialDam === "Significant Damage";
		},

		pointToLayer: function(feature, latlng) {
			var div_sigCircle = L.divIcon({
			  className: "sigCircle",
			  interactive: true
			});

			return L.marker(latlng, {
				icon: div_sigCircle});
		},

            	onEachFeature: function(feature, layer){
                layer.bindPopup("<b>Days to repair:</b></br> "+feature.properties.RepairTime);
              	}

         }).addTo(allbridges);

	var modDamage = L.geoJson(data, {
		filter: function(feature, layer) {
			return feature.properties.InitialDam === "Moderate Damage";
		},

		pointToLayer: function(feature, latlng) {
			var div_modCircle = L.divIcon({
			  className: "modCircle",
			  interactive: true
               	 	});

			return L.marker(latlng, {
				icon: div_modCircle});
		},

              onEachFeature: function(feature, layer){
              layer.bindPopup("<b>Days to repair:</b></br> "+feature.properties.RepairTime);
              }

          }).addTo(allbridges);

          var minDamage = L.geoJson(data, {
	         filter: function(feature, layer) {
			 return feature.properties.InitialDam === "Minor Damage";
	      },

                 pointToLayer: function(feature, latlng) {
			var div_minCircle = L.divIcon({
			  className: "minCircle",
			  interactive: true
			});

			return L.marker(latlng, {
			        icon: div_minCircle});
                },

                onEachFeature: function(feature, layer){
                layer.bindPopup("<b>Days to repair:</b></br> "+feature.properties.RepairTime);
                }

          }).addTo(allbridges);
          mymap.addLayer(allbridges);

 });






$.getJSON("WSDOT_-_Seismic_Lifelines.geojson",
 	function(data){
 	L.geoJson(data).addTo(mymap);


var Legend =  new L.Control.Legend({
  position: 'bottomright',
});

mymap.addControl(Legend);
$(".legend-container").append( $("#legend") );
});
