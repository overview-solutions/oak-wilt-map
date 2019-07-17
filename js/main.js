mapboxgl.accessToken = 'pk.eyJ1IjoiZWFydGhhZGFtIiwiYSI6ImNqd3VzNnN3ZDA2OWE0OHBoN2xrNmlrNGYifQ.MMqPanYD57YyTkaJYxyeHQ';
/*
var months = [
    'January 2018',
    'February 2018',
    'March 2018',
    'April 2018',
    'May 2018',
    'June 2018',
    'July 2018',
    'August 2018',
    'September 2018',
    'October 2018',
    'November 2018',
    'December 2018',
    'January 2019',
    'February 2019',
    'March 2019',
    'April 2019',
    'May 2019',
    'June 2019',
    'July 2019',
    'August 2019',
    'September 2019',
    'October 2019',
    'November 2019',
    'December 2019'
];

function filterBy(month) {

  var filters = ['==', 'month', month];
  map.setFilter('Oak Wilt Trees', filters);

  // Set the label to the month
  document.getElementById('month').textContent = months[month];
}
*/
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-82.968,39.982],
    zoom: 10
});

var icon = "circle";

map.on('load', function() {
    var layers = ['Oak Wilt Trees'];
    var colors = ['#FF0000'];
    for (i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
      
        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      }
      map.addLayer({
        'id': 'Oak Wilt Trees',
        'type': 'circle',
        'source': {
          type: 'vector',
          url: 'mapbox://earthadam.5lx1btyu'  //smrtcbus.cficgu1f
        },
        'source-layer': 'oak-wilt-6411ux',
        'paint': {
        // make circles larger as the user zooms from z12 to z22
          'circle-radius': {
            'base': 5,
            'stops': [[12, 4], [22, 10]]
        },
        // color circles by ethnicity, using a match expression
        // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
        'circle-color': '#ff0000',
        'circle-stroke-color': '#550000',
        'circle-stroke-width':1
        }
    });
    var popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true
    }); 
    map.on('mouseover', 'Oak Wilt Trees', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
                "<h2>"+e.features[0].properties["Address"]+"</h2>"+
                "<b>Date Identified:</b> "+e.features[0].properties["Date Identified"]+"<br>"+
                "<b>Arborist:</b> "+e.features[0].properties["Arborist Contact"]+"<br>"+
                "<b>Diagnosis:</b> "+e.features[0].properties["Lab Confirmation"]+"<br>"+
                "<b>Removed:</b> "+e.features[0].properties["Removed"]+"<br>"+
                "<b>Testing Lab:</b> "+e.features[0].properties["Testing Lab"]
            )
            //.setHTML(e.features[0].properties.description)
            .addTo(map);
    });
    map.on('click', 'Oak Wilt Trees', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
                "<h2>"+e.features[0].properties["Address"]+"</h2>"+
                "<b>Date Identified:</b> "+e.features[0].properties["Date Identified"]+"<br>"+
                "<b>Arborist:</b> "+e.features[0].properties["Arborist Contact"]+"<br>"+
                "<b>Diagnosis:</b> "+e.features[0].properties["Lab Confirmation"]+"<br>"+
                "<b>Removed:</b> "+e.features[0].properties["Removed"]+"<br>"+
                "<b>Testing Lab:</b> "+e.features[0].properties["Testing Lab"]
            )
            //.setHTML(e.features[0].properties.description)
            .addTo(map);
    });
    map.on('click', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    /*
    filterBy(0);

    document.getElementById('slider').addEventListener('input', function(e) {
        var month = parseInt(e.target.value, 10);
        filterBy(month);
    });
*/
  });

var toggleableLayerIds = [ 'Oak Wilt Trees'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
