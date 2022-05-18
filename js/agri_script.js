let mymap; // defining the map variable
let lyrOSM; // defining the Open street map variable
let lyrEsri; // defining the esri open street map variable
let ctl_attribute; // defining the map attribute variable
let ctl_scalebar; // defining the scale bar variable
let ctl_mouse_postion; // defining the variable to get the position of the mouse
let ctl_sidebar_button; // vaiable for the side bar button
let ctl_sidebar; // variable for the side bar
let ctl_pan; // varibale for the pan button
let ctl_zoom; // varibale for the initial zoom
let ctL_zoom_button; // varibale for the zoom button
let ctl_layers; //  variable for the layer control buttons
let shp_layers; // varibale for the shape layers
let obj_basemap; // variable for the base map
let gnd; // variable for the GND shape layer
let dsd; // variable for DSD layer
let district; // variable for the district layer
let province; // variable for the province layer
let options; // varible to set radio buttons and check box for the layer controls
let lyr_gnd_search; // new layer to show the newly searched gnd layer
let lyr_dsd_search; // new layer to show the newly searched gnd layer
let lyr_district_search;
let lyr_province_search;
let ar_gnd_object_names = []; // empty array to set gnd names
let ar_dsd_object_names = []; // empty array to set gnd names
let ar_district_object_names = []; // empty array to set gnd names
let ar_province_object_names = [];

$(document).ready(function() {
  // jQuery document ready function
  // *************  Map intialization **********//

  mymap = L.map("mapdiv", {
    // setting up the map to given DOM
    center: [6.83781, 80.3746],
    zoom: 10,
    attributionControl: false, // disabling original attribution controls
    zoomControl: false,
    scrollWheelZoom: false, // disable original zoom function
    smoothWheelZoom: true, // enable smooth zoom
    smoothSensitivity: 1, // zoom speed. default is 1
  });

  ctl_sidebar_button = L.easyButton(
    // easy button leaflet plugin adding methord
    '<i class="fa fa-bars"></i>',
    function() {
      // setting up a function to bind the button into a side bar
      ctl_sidebar.show();
    },
    "Menu"
  ).addTo(mymap);

  ctl_pan = L.control.pan().addTo(mymap); // pan button leaflet plugin initialization

  ctl_zoom = L.control
    .zoom({
      position: "topleft",
    })
    .addTo(mymap); // plus minus zoom leaflet plugin

  ctL_zoom_button = L.Control.boxzoom({
    // box zoom leaflet plugin
    position: "topleft",
    keepOn: true,
  }).addTo(mymap);

  ctl_attribute = L.control // attribute controlling
    .attribution({
      position: "bottomleft",
    })
    .addTo(mymap);
  ctl_attribute.addAttribution("OSM");
  ctl_attribute.addAttribution(
    "&copy; <a href='http://infobhoomi.com'>InfoBhoomi/SUSL-2021</a"
  );

  ctl_scalebar = L.control
    .scale({
      position: "bottomleft",
    })
    .addTo(mymap); // scale attribute controlling

  ctl_mouse_postion = L.control // mouse position controllin
    .mousePosition({
      position: "bottomleft",
      separator: " : ",
    })
    .addTo(mymap);

  ctl_sidebar = L.control.sidebar("side_bar").addTo(mymap);

  // ************* Layer intialization **********//

  lyrOSM = L.tileLayer.provider("OpenStreetMap.Mapnik");
  lyrEsri = L.tileLayer.provider("Esri.WorldImagery");
  mymap.addLayer(lyrOSM);

  // *************  Setup layer controls **********//

  obj_basemap = {
    "Open Street Map": lyrOSM,
    "ESRI World Image Map": lyrEsri,
  };

  $.ajax({
      url: 'http://localhost/webmap201/php/load_data.php',
      data: {
        gnd_id: '1',
        tbl: 'gnd'
      },
      type: 'POST',
      success: function(response) {
        console.log(JSON.parse(response));
        json_gnd = JSON.parse(response);
        gnd = L.geoJSON(json_gnd, {
          onEachFeature: return_gnd
        }).addTo(mymap);
        ctl_layers.addOverlay(gnd, "GN Divisions", "Overlays");
      },
      error: function(xhr, status, error) {
        alert("Error: " + error);
      }

    }

  );


  // $.ajax({
  //     url: 'http://localhost/webmap201/php/load_data.php',
  //     data: {
  //       tbl: 'dsd'
  //     },
  //     type: 'POST',
  //     success: function(response) {
  //       console.log(JSON.parse(response));
  //       json_dsd = JSON.parse(response);
  //       dsd = L.geoJSON(json_dsd, {
  //         onEachFeature: return_dsd
  //       });
  //       ctl_layers.addOverlay(dsd, "DS Divisions", "Overlays");
  //     },
  //     error: function(xhr, status, error) {
  //       alert("Error: " + error);
  //     }

  //   }

  // );

  // $.ajax({
  //     url: 'http://localhost/webmap201/php/load_data.php',
  //     data: {
  //       tbl: 'district'
  //     },
  //     type: 'POST',
  //     success: function(response) {
  //       console.log(JSON.parse(response));
  //       json_district = JSON.parse(response);
  //       district = L.geoJSON(json_district, {
  //         onEachFeature: return_district
  //       });
  //       ctl_layers.addOverlay(district, "District", "Overlays");
  //     },
  //     error: function(xhr, status, error) {
  //       alert("Error: " + error);
  //     }

  //   }

  // );

  // $.ajax({
  //     url: 'http://localhost/webmap201/php/load_data.php',
  //     data: {
  //       tbl: 'province'
  //     },
  //     type: 'POST',
  //     success: function(response) {
  //       console.log(JSON.parse(response));
  //       json_province = JSON.parse(response);
  //       province = L.geoJSON(json_province, {
  //         onEachFeature: return_province
  //       });
  //       ctl_layers.addOverlay(province, "Province", "Overlays");
  //     },
  //     error: function(xhr, status, error) {
  //       alert("Error: " + error);
  //     }

  //   }

  // );

  shp_layers = {
    Overlays: {
    },
  };

  options = {
    // Make the "Landmarks" group exclusive (use radio inputs)
    exclusiveGroups: ["Overlays"],
    // Show a checkbox next to non-exclusive group labels for toggling all
    groupCheckboxes: true,
  };

  ctl_layers = L.control
    .groupedLayers(obj_basemap, shp_layers, options)
    .addTo(mymap);

  // refresh overlay
  mymap.on("overlayadd", function(e) {
    if (lyr_gnd_search) {
      lyr_gnd_search.remove();
    }
    if (e.name !== "GN Divisions") {
      $("#btn_gnd_find_project").attr("disabled", true);
      $("#text_gnd_find_project").attr("disabled", true);
      $("#gnd_dropdown").addClass("disabled");
    } else {
      $("#btn_gnd_find_project").attr("disabled", false);
      $("#text_gnd_find_project").attr("disabled", false);
      $("#gnd_dropdown").removeClass("disabled");
    }
    if (lyr_dsd_search) {
      lyr_dsd_search.remove();
    }
    if (e.name !== "DS Divisions") {
      $("#btn_dsd_find_project").attr("disabled", true);
      $("#text_dsd_find_project").attr("disabled", true);
      $("#dsd_dropdown").addClass("disabled");

    } else {
      $("#btn_dsd_find_project").attr("disabled", false);
      $("#text_dsd_find_project").attr("disabled", false);
      $("#dsd_dropdown").removeClass("disabled");

    }
    if (lyr_district_search) {
      lyr_district_search.remove();
    }
    if (e.name !== "District") {
      $("#btn_district_find_project").attr("disabled", true);
      $("#text_district_find_project").attr("disabled", true);
      $("#district_dropdown").addClass("disabled");

    } else {
      $("#btn_district_find_project").attr("disabled", false);
      $("#text_district_find_project").attr("disabled", false);
      $("#district_dropdown").removeClass("disabled");

    }
    if (lyr_province_search) {
      lyr_province_search.remove();
    }
    if (e.name !== "Province") {
      $("#btn_province_find_project").attr("disabled", true);
      $("#text_province_find_project").attr("disabled", true);
      $("#province_dropdown").addClass("disabled");

    } else {
      $("#btn_province_find_project").attr("disabled", false);
      $("#text_province_find_project").attr("disabled", false);
      $("#province_dropdown").removeClass("disabled");

    }
    console.log(e);
  });

});

// *************  conrol function on GND layers **********//

function return_gnd(json, layer) {
  const att = json.properties;
  layer.setStyle({
    color: "#47B1D1",
    fillColor: "#47B1D1",
    weight: 2,
  });
  layer.on("mouseover", function() {
    //on mouseover function
    this.setStyle({
      fillColor: "#FFFFFF",
    });
  });
  layer.on("mouseout", function() {
    //on mouseout function
    this.setStyle({
      fillColor: "#47B1D1",
    });
  });
  layer.bindPopup("<h5>GND Name : " + att.GND_N + "</h5>");
  ar_gnd_object_names.push(att.GND_N);
}

// *************  conrol function on DSD layers **********//

function return_dsd(json, layer) {
  const att = json.properties;
  layer.setStyle({
    color: "#47B1D1",
    fillColor: "#47B1D1",
    weight: 2,
  });
  layer.on("mouseover", function() {
    //on mouseover function
    this.setStyle({
      fillColor: "#C7DBFF",
    });
  });
  layer.on("mouseout", function() {
    //on mouseout function
    this.setStyle({
      fillColor: "#47B1D1",
    });
  });
  layer.bindPopup("<h5>DSD Name : " + att.adm3_en + "</h5>");
  ar_dsd_object_names.push(att.adm3_en);
}

// *************  conrol function on District layers **********//

function return_district(json, layer) {
  const att = json.properties;
  layer.setStyle({
    color: "#47B1D1",
    fillColor: "#47B1D1",
    weight: 2,
  });
  layer.on("mouseover", function() {
    //on mouseover function
    this.setStyle({
      fillColor: "#C7DBFF",
    });
  });
  layer.on("mouseout", function() {
    //on mouseout function
    this.setStyle({
      fillColor: "#47B1D1",
    });
  });
  layer.bindPopup("<h5>District : " + att.adm2_en + "</h5>");
  ar_district_object_names.push(att.adm2_en);
}

// *************  conrol function on District layers **********//

function return_province(json, layer) {
  const att = json.properties;
  layer.setStyle({
    color: "#47B1D1",
    fillColor: "#47B1D1",
    weight: 2,
  });
  layer.on("mouseover", function() {
    //on mouseover function
    this.setStyle({
      fillColor: "#C7DBFF",
    });
  });
  layer.on("mouseout", function() {
    //on mouseout function
    this.setStyle({
      fillColor: "#47B1D1",
    });
  });
  layer.bindPopup("<h5>Province : " + att.adm1_en + "</h5>");
  ar_province_object_names.push(att.adm1_en);
}
