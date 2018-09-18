
function httpGetAsync() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function (){
        if (xhttp.readyState == 4) {
            if (xhttp.status = 200)
                mostrarRegionais(this.responseText)
        }
    }
    xhttp.open("GET", "https://api.thingspeak.com/channels/494997/feeds.json?results=30000", true)

    xhttp.send()

}


function mostrarRegionais(responseText){
	
   
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
	var jsonResposta = JSON.parse(responseText)
    console.log(jsonResposta)
    var ocorrencias = jsonResposta.feeds
    var a = []
    
     for(i = 0; i < ocorrencias.length; i++){
       
       // console.log(ocorrencias[i].field1)
         var latitude  = parseFloat(ocorrencias[i].field7)
        var longitude = parseFloat(ocorrencias[i].field6)
         var json = {
                "type": "Feature",
                "properties": {
                    "message": mensagem,
                    "iconSize": [60, 60]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [longitude,latitude]
                }
        }
         a.push(json)
    }

     console.log(json)
 
    var mensagem = "Ponto"
    var longitude  = -38.524251
    var latitude = -3.737879
    var json = {
            "type": "Feature",
            "properties": {
                "message": mensagem,
                "iconSize": [60, 60]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [longitude,latitude]
            }
    }

    a.push(json)

    var longitude  = -38.524264
     var latitude = -3.737880
    var json = {
            "id": 'ocorrencia',
            "type": "Feature",
            "properties": {
                "message": mensagem,
                "iconSize": [60, 60]
            },
            "geometry": {
                "type": "Point",
                "coordinates":[longitude,latitude]
            }
    }

    a.push(json)

     console.log(json)
    var myJsonString = JSON.stringify(a);
     var geojson = { 
        "type": "FeatureCollection",
        "features": a};


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

    //  map.addLayer({
    //     'id': 'population',
    //     'type': 'circle',
    //     'source': {
    //        'type': 'geojson',
    //        'data': geojson
    //     },
    //      'paint': {
    //         // make circles larger as the user zooms from z12 to z22
    //         'circle-radius': {
    //             'base': 1.75,
    //             'stops': [[12, 2], [22, 180]]
    //         },
    //         // color circles by ethnicity, using a match expression
    //         // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
    //         'circle-color': '#FF0000'
    //     }
    // });
 map.addSource("earthquakes", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

 map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });
 map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
        }
    });

});


}	
