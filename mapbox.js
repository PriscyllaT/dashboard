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
    map.addSource( 'map', { type: 'geojson', data: regionais});

    map.addLayer({
        'id': 'maine',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': regionais
        },
        'layout': {}
    });
});
}	