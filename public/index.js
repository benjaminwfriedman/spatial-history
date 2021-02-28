// const zoomLev = 14;
// const styleChoice = 'mapbox://styles/mapbox/light-v10';
// const accessTok = 'pk.eyJ1IjoiYmVubnlmcmllZG1hbjIiLCJhIjoiY2s5YzIwZHliMDBqaDNsbjgyeXB1MDdybCJ9.FANNsUZRFIzmBFsaRdq2SQ';
//
//
//
//
//
// const database = [{
//     // feature for Mapbox DC
//     'type': 'Feature',
//     'geometry': {
//       'type': 'Point',
//       'coordinates': [
//         -118.277158,
//         34.096296
//       ]
//     },
//     'properties': {
//       'title': 'Benjamin Friedmans Home 2019-2020',
//       'significance': 'Benny Friedman lived in this home durring the 2020 Covid pandemic.',
//       'type': 'historic home'
//     }
//   },
//   {
//     // feature for Mapbox SF
//     'type': 'Feature',
//     'geometry': {
//       'type': 'Point',
//       'coordinates': [-118.277278, 34.087909]
//     },
//     'properties': {
//       'title': 'Larissa Creative House',
//       'significance': 'Many great LA musicians called this address home in the early 2020s',
//       'type': 'historic home'
//
//     }
//   },
//   {
//     // feature for Mapbox SF
//     'type': 'Feature',
//     'geometry': {
//       'type': 'Point',
//       'coordinates': [ -118.340418, 34.101585]
//     },
//     'properties': {
//       'title': 'All Black Lives Matter Mural',
//       'significance': 'On June 14, an "All Black Lives Matter" mural was painted in front of the Dolby Theatre on Hollywood Boulevard, in conjunction with an All Black Lives Matter march there.',
//       'type': 'race'
//
//     }
//   }
// ]
//
// historic_homes = [];
// race = [];
//
//
//
// for (let i = 0; i < database.length; i++){
//   if(database[i].properties.type === 'historic home'){
//     historic_homes.push(database[i]);
//   }
//   if(database[i].properties.type === 'race'){
//     race.push(database[i]);
//   }
//
// }
//
//
// function addLocationDot(map, lon, lat) {
//   var size = 100;
//
//   // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
//   // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
//   var pulsingDot = {
//     width: size,
//     height: size,
//     data: new Uint8Array(size * size * 4),
//
//     // get rendering context for the map canvas when layer is added to the map
//     onAdd: function() {
//       var canvas = document.createElement('canvas');
//       canvas.width = this.width;
//       canvas.height = this.height;
//       this.context = canvas.getContext('2d');
//     },
//
//     // called once before every frame where the icon will be used
//     render: function() {
//       var duration = 1000;
//       var t = (performance.now() % duration) / duration;
//
//       var radius = (size / 2) * 0.3;
//       var outerRadius = (size / 2) * 0.7 * t + radius;
//       var context = this.context;
//
//       // draw outer circle
//       context.clearRect(0, 0, this.width, this.height);
//       context.beginPath();
//       context.arc(
//         this.width / 2,
//         this.height / 2,
//         outerRadius,
//         0,
//         Math.PI * 2
//       );
//       // outwards fill style
//       context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
//       context.fill();
//
//       // draw inner circle
//       context.beginPath();
//       context.arc(
//         this.width / 2,
//         this.height / 2,
//         radius,
//         0,
//         Math.PI * 2
//       );
//       //main fill style
//       context.fillStyle = 'rgba(255, 100, 100, 1)';
//       context.strokeStyle = 'white';
//       context.lineWidth = 2 + 4 * (1 - t);
//       context.fill();
//       context.stroke();
//
//       // update this image's data with data from the canvas
//       this.data = context.getImageData(
//         0,
//         0,
//         this.width,
//         this.height
//       ).data;
//
//       // continuously repaint the map, resulting in the smooth animation of the dot
//       map.triggerRepaint();
//
//       // return `true` to let the map know that the image was updated
//       return true;
//     }
//   };
//
//   map.on('load', function() {
//     map.addImage('pulsing-dot', pulsingDot, {
//       pixelRatio: 2
//     });
//
//
//     map.addSource('current-loc-dot', {
//       'type': 'geojson',
//       'data': {
//         'type': 'FeatureCollection',
//         'features': [{
//           'type': 'Feature',
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [lon, lat]
//           }
//         }]
//       }
//     });
//     map.addLayer({
//       'id': 'current-loc-dot-layer',
//       'type': 'symbol',
//       'source': 'current-loc-dot',
//       'layout': {
//         'icon-image': 'pulsing-dot'
//       }
//     });
//     map.loadImage(
//       'https://i.postimg.cc/xTJ1JB6Y/noun-Protest-15242.png',
//       function(error, race_img) {
//         if (error) throw error;
//         map.addImage('race-icon', race_img);
//
//         map.loadImage(
//           'https://i.postimg.cc/KzhNbc6p/noun-House-3095061.png',
//           function(error, home_img) {
//             if (error) throw error;
//             map.addImage('home-icon', home_img);
//
//             //add popup info
//             var popup = new mapboxgl.Popup({
//               closeButton: false,
//               closeOnClick: false
//             });
//
//
//
//
//
//
//
//             // Add a GeoJSON for historic homes
//             map.addSource('Historic Homes', {
//               'type': 'geojson',
//               'data': {
//                 'type': 'FeatureCollection',
//                 'features': historic_homes
//               }
//             });
//
//             // Add a symbol layer for Historic Homes
//             map.addLayer({
//               'id': 'Historic-Homes',
//               'type': 'symbol',
//               'source': 'Historic Homes',
//               'layout': {
//                 'icon-image': 'home-icon',
//                 'icon-size': 0.05,
//
//               },
//             });
//
//             //add interaction for historic homes
//             map.on('mouseenter', 'Historic-Homes', function(e) {
//               // Change the cursor style as a UI indicator.
//               map.getCanvas().style.cursor = 'pointer';
//
//               var coordinates = e.features[0].geometry.coordinates.slice();
//               var description = e.features[0].properties.title;
//
//               // Ensure that if the map is zoomed out such that multiple
//               // copies of the feature are visible, the popup appears
//               // over the copy being pointed to.
//               while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//                 coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//               }
//
//               // Populate the popup and set its coordinates
//               // based on the feature found.
//               popup
//                 .setLngLat(coordinates)
//                 .setHTML(description)
//                 .addTo(map);
//             });
//
//             map.on('mouseleave', 'Historic-Homes', function() {
//               map.getCanvas().style.cursor = '';
//               popup.remove();
//             });
//
//             map.on('click', 'Historic-Homes', function(e) {
//               title = e.features[0].properties.title;
//               significance = e.features[0].properties.significance;
//               document.getElementById('content').innerHTML = '<h3>' + title + '</h3><p>' + significance + '</p>';
//             });
//
//
//
//
//
//             //add source for racial justice
//             map.addSource('Racial Justice', {
//               'type': 'geojson',
//               'data': {
//                 'type': 'FeatureCollection',
//                 'features': race
//               }
//             });
//
//             // Add a symbol layer for racial justice
//             map.addLayer({
//               'id': 'Racial-Justice',
//               'type': 'symbol',
//               'source': 'Racial Justice',
//               'layout': {
//                 'icon-image': 'race-icon',
//                 'icon-size': 0.05,
//
//               },
//             });
//
//             map.on('mouseenter', 'Racial-Justice', function(e) {
//               // Change the cursor style as a UI indicator.
//               map.getCanvas().style.cursor = 'pointer';
//
//               var coordinates = e.features[0].geometry.coordinates.slice();
//               var description = e.features[0].properties.title;
//
//               // Ensure that if the map is zoomed out such that multiple
//               // copies of the feature are visible, the popup appears
//               // over the copy being pointed to.
//               while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//                 coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//               }
//
//               // Populate the popup and set its coordinates
//               // based on the feature found.
//               popup
//                 .setLngLat(coordinates)
//                 .setHTML(description)
//                 .addTo(map);
//             });
//
//             map.on('mouseleave', 'Racial-Justice', function() {
//               map.getCanvas().style.cursor = '';
//               popup.remove();
//             });
//
//             map.on('click', 'Racial-Justice', function(e) {
//               title = e.features[0].properties.title;
//               significance = e.features[0].properties.significance;
//               document.getElementById('content').innerHTML = '<h3>' + title + '</h3><p>' + significance + '</p>';
//             });
//
//
//
//           }
//         );
//       }
//     );
//   });
// };
//
//
//
//
// const successCallback = (position) => {
//   let longitude = position.coords.longitude;
//   let latitude = position.coords.latitude;
//   mapboxgl.accessToken = accessTok;
//   var map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: styleChoice, // style URL
//     center: [longitude, latitude], // starting position [lng, lat]
//     zoom: zoomLev // starting zoom
//   });
//   addLocationDot(map, longitude, latitude);
// };
//
// const errorCallback = (error) => {
//   console.error(error);
//   let longitude = -60;
//   let latitude = 40;
//   mapboxgl.accessToken = accessTok;
//   var map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: styleChoice, // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: zoomLev // starting zoom
//   });
//   alert("Please Enable Location on this Device.")
// };
//
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
