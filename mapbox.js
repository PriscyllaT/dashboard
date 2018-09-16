function mostrarRegionais(){
	
//       var regionaSource =  new mapboxgl.source.Vector({
//           url: 'limiteregional.geojson',
//           format: new mapboxgl.format.GeoJSON() 
//         })
      
//            var regional = new mapboxgl.layer.Vector({
//        opacity: 1, 
//        source: regionaSource
//       });

//                var map = new mapboxgl.Map({
//     controls: mapboxgl.control.defaults({
//                 attributionOptions: ({
//                     collapsible: false
//                 })
//             }).extend([
//                 new mapboxgl.control.ZoomSlider(),
//                 new mapboxgl.control.ZoomToExtent({
//  extent: [-4290784.574241771, -429636.58187010355, -4281377.290892059, -414336.58187010355]
                    
//                 }),
//                 new mapboxgl.control.Rotate(),
//                 new mapboxgl.control.OverviewMap(),
               
//                 new mapboxgl.control.FullScreen() 
//             ]) ,
//       layers: [
//           new mapboxgl.layer.Tile({
//             source: new ol.source.OSM()
//           }),regional  
//         ],
//         target: 'map',        
//         view: new mapboxgl.View({
//           center: mapboxgl.proj.transform([-38.530723,-3.791678], 'EPSG:4326', 'EPSG:3857'),
//             maxZoom: 13.5,
//             minZoom: 11.7,
//           zoom: 11.7 ,
//   extent:  [-4298084.574241771, -433036.58187010355, -4271377.290892059, -412336.58187010355] 
 
//         })
//       });
// mapboxgl.accessToken = 'pk.eyJ1IjoicHJpc2N5bGxhdCIsImEiOiJjamxqZG9nM3gwYXMzM3ZteGFpMDI3dHdsIn0.r_t2Hf1KDlHe9iA8cwF11w';

		
    var ocorrencias = []
    var mensagem = "Ponto"
    var latitude  = -38.524251
    var longitude = -3.737879
    var json = {
            "type": "Feature",
            "properties": {
                "message": mensagem,
                "iconSize": [60, 60]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [latitude,longitude]
            }
    }

    ocorrencias.push(json)

     var latitude  = -38.524264
    var longitude = -3.737880
    var json = {
            "type": "Feature",
            "properties": {
                "message": mensagem,
                "iconSize": [60, 60]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [latitude,longitude]
            }
    }

    ocorrencias.push(json)
    var myJsonString = JSON.stringify(ocorrencias);
     var geojson = { 
        "type": "FeatureCollection",
        "features": ocorrencias};


mapboxgl.accessToken = 'pk.eyJ1IjoicHJpc2N5bGxhdCIsImEiOiJjamxqZG9nM3gwYXMzM3ZteGFpMDI3dHdsIn0.r_t2Hf1KDlHe9iA8cwF11w'; 
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-38.530723,-3.791678],
    zoom:10
});

map.on('load', function () {

    var regionais = 'https://raw.githubusercontent.com/PriscyllaT/dashboard/master/bairrosregionais.json';
    var bairros = 'https://raw.githubusercontent.com/PriscyllaT/dashboard/master/limitebairro.json';
  
      map.addLayer({
        'id': 'bairros',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': bairros
        },
        'layout': {},
        'paint':{
            'line-color': '#F7455D' // red
        }
    });
      
    map.addLayer({
        'id': 'regionais',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': regionais
        },
        'layout': {},
        'paint':{
        	'line-width': 3
        }
    });
});

 // add markers to map
geojson.features.forEach(function(marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://raw.githubusercontent.com/PriscyllaT/dashboard/master/rd.png)';
    el.style.width = '10px';
    el.style.height = '10px';

    el.addEventListener('click', function() {
        window.alert(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});
}	