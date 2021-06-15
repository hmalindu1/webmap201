var mymap; // defining the map variable
var lyrOSM; // defining the Open street map variable
var lyrEsri; // defining the esri open street map variable
var ctl_attribute; // defining the map attribute variable
var ctl_scalebar; // defining the scale bar variable
var ctl_mouse_postion; // defining the variable to get the position of the mouse
var ctl_sidebar_button; // vaiable for the side bar button
var ctl_sidebar; // variable for the side bar
var ctl_pan; // varibale for the pan button
var ctl_zoom; // varibale for the initial zoom
var ctL_zoom_button; // varibale for the zoom button
var ctl_layers; //  variable for the layer control buttons
var shp_layers; // varibale for the shape layers
var obj_basemap; // variable for the base map
var gnd; // variable for the GND shape layer
var dsd; // variable for DSD layer
var district; // variable for the district layer
var province; // variable for the province layer
var options; // varible to set radio buttons and check box for the layer controls
var lyr_gnd_search; // new layer to show the newly searched gnd layer
var lyr_dsd_search; // new layer to show the newly searched gnd layer
var lyr_district_search;
var lyr_province_search;
var ar_gnd_object_names = []; // empty array to set gnd names
var ar_dsd_object_names = []; // empty array to set gnd names
var ar_district_object_names = []; // empty array to set gnd names
var ar_province_object_names = [];

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
      url: 'http://localhost/webmap201/php/load_gnd.php',
      success: function(response) {
        console.log(JSON.parse(response));
        json_gnd = JSON.parse(response);
        gnd = L.geoJSON(json_gnd, {
          onEachFeature: returnGnd,
        }).addTo(mymap);
        ctl_layers.addOverlay(gnd, "GN Divisions", "Overlays");
        if (mymap.hasLayer(gnd)) {
          console.log("yes");
          $("#btn_dsd_find_project").attr("disabled", true);
          $("#text_dsd_find_project").attr("disabled", true);
          $("#btn_district_find_project").attr("disabled", true);
          $("#text_district_find_project").attr("disabled", true);
          $("#btn_province_find_project").attr("disabled", true);
          $("#text_province_find_project").attr("disabled", true);
        }
        ar_gnd_object_names.sort();
        $("#text_gnd_find_project").autocomplete({
          source: ar_gnd_object_names,
        });

      },
      error: function(xhr, status, error) {
        alert("Error: " + error);
      }

    }

  );

  /* gnd = L.geoJSON
     .ajax("data/gnd.geojson", {
       onEachFeature: returnGnd,
     })
     .addTo(mymap);
   gnd.on("data:loaded", function() {
     ar_gnd_object_names.sort();
     $("#text_gnd_find_project").autocomplete({
       source: ar_gnd_object_names,
     });
   });*/

  dsd = L.geoJSON.ajax("data/dsd.geojson", {
    onEachFeature: returnDsd,
  });
  dsd.on("data:loaded", function() {
    ar_dsd_object_names.sort();
    $("#text_dsd_find_project").autocomplete({
      source: ar_dsd_object_names,
    });
  });

  district = L.geoJSON.ajax("data/district.geojson", {
    onEachFeature: returnDistrict,
  });
  district.on("data:loaded", function() {
    ar_district_object_names.sort();
    $("#text_district_find_project").autocomplete({
      source: ar_district_object_names,
    });
  });

  province = L.geoJSON.ajax("data/province.geojson", {
    onEachFeature: returnProvince,
  });
  province.on("data:loaded", function() {
    ar_province_object_names.sort();
    $("#text_province_find_project").autocomplete({
      source: ar_province_object_names,
    });
  });

  shp_layers = {
    Overlays: {
      // "GN Divisions": gnd,
      "DS Divisions": dsd,
      District: district,
      Province: province,
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
    } else {
      $("#btn_dsd_find_project").attr("disabled", false);
      $("#text_dsd_find_project").attr("disabled", false);
    }
    if (lyr_district_search) {
      lyr_district_search.remove();
    }
    if (e.name !== "District") {
      $("#btn_district_find_project").attr("disabled", true);
      $("#text_district_find_project").attr("disabled", true);
    } else {
      $("#btn_district_find_project").attr("disabled", false);
      $("#text_district_find_project").attr("disabled", false);
    }
    if (lyr_province_search) {
      lyr_province_search.remove();
    }
    if (e.name !== "Province") {
      $("#btn_province_find_project").attr("disabled", true);
      $("#text_province_find_project").attr("disabled", true);
    } else {
      $("#btn_province_find_project").attr("disabled", false);
      $("#text_province_find_project").attr("disabled", false);
    }
    console.log(e);
  });

  // $(".dropdown-item").click(function () {
  //   $(this)
  //     .parents(".dropdown")
  //     .find("button.dropdown-toggle")
  //     .dropdown("toggle");
  // });

  // $(".dropdown").hover(function () {
  //   $(".dropdown-toggle", this).trigger("click");
});

// *************  conrol function on GND layers **********//

function returnGnd(json, layer) {
  var att = json.properties;
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
  // console.log(ar_object_names);
  //console.log(feature);
}

// *************  conrol function on DSD layers **********//

function returnDsd(json, layer) {
  var att = json.properties;
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
  layer.bindPopup("<h5>DSD Name : " + att.ADM3_EN + "</h5>");
  ar_dsd_object_names.push(att.ADM3_EN);
}

// *************  conrol function on District layers **********//

function returnDistrict(json, layer) {
  var att = json.properties;
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
  layer.bindPopup("<h5>District : " + att.ADM2_EN + "</h5>");
  ar_district_object_names.push(att.ADM2_EN);
}

// *************  conrol function on District layers **********//

function returnProvince(json, layer) {
  var att = json.properties;
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
  layer.bindPopup("<h5>Province : " + att.ADM1_EN + "</h5>");
  ar_province_object_names.push(att.ADM1_EN);
}

//******************** Search function on GND layer */

function return_gnd_project_name(name) {
  var ar_layers = gnd.getLayers();
  for (let i = 0; i < ar_layers.length; i++) {
    var feature_name = ar_layers[i].feature.properties.GND_N;

    if (feature_name == name) {
      return ar_layers[i];
    }
  }
  console.log(feature_name);
  return false;
}

function test_gnd_project_name(name) {
  if (ar_gnd_object_names.indexOf(name) < 0) {
    $("#div_gnd_find_project").addClass("has-error");
    $("#div_gnd_project_error").html("*******GND name was not found");
    $("#btn_gnd_find_project").attr("disabled", true);
  } else {
    $("#div_gnd_find_project").removeClass("has-error");
    $("#div_gnd_project_error").html("");
    $("#btn_gnd_find_project").attr("disabled", false);
  }
}

$("#text_gnd_find_project").on("keyup paste click", function() {
  var name = $("#text_gnd_find_project").val();
  test_gnd_project_name(name);
});

$("#btn_gnd_find_project").click(function() {
  var name = $("#text_gnd_find_project").val();
  var lyr = return_gnd_project_name(name);
  if (lyr) {
    if (lyr_gnd_search) {
      lyr_gnd_search.remove();
    }
    lyr_gnd_search = L.geoJSON(lyr.toGeoJSON(), {
      style: {
        color: "#68389b",
        weight: 5,
        opacity: 0.5,
      },
    }).addTo(mymap);
    mymap.fitBounds(lyr.getBounds().pad(1));
    var att = lyr.feature.properties;
    $("#gnd_project_data").html(
      "<h6 class='text-center'> Attributes </h6><h6>Project ID: " +
      att.GND_N +
      "</h6>"
    );
  } else {
    $("#div_gnd_project_error").html("*******GND name was not found");
  }
});

//******************** Search function on DSD layer */

function return_dsd_project_name(name) {
  var ar_layers = dsd.getLayers();
  for (let i = 0; i < ar_layers.length; i++) {
    var feature_name = ar_layers[i].feature.properties.ADM3_EN;

    if (feature_name == name) {
      return ar_layers[i];
    }
  }
  return false;
}

function test_dsd_project_name(name) {
  if (ar_dsd_object_names.indexOf(name) < 0) {
    $("div_dsd_find_project").addClass("has-error");
    $("#div_dsd_project_error").html("*******DSD name was not found");
    $("#btn_dsd_find_project").attr("disabled", true);
  } else {
    $("div_dsd_find_project").removeClass("has-error");
    $("#div_dsd_project_error").html("");
    $("#btn_dsd_find_project").attr("disabled", false);
  }
}

$("#text_dsd_find_project").on("keyup paste click", function() {
  var name = $("#text_dsd_find_project").val();
  test_dsd_project_name(name);
});

$("#btn_dsd_find_project").click(function() {
  var name = $("#text_dsd_find_project").val();
  var lyr = return_dsd_project_name(name);
  if (lyr) {
    if (lyr_dsd_search) {
      lyr_dsd_search.remove();
    }
    lyr_dsd_search = L.geoJSON(lyr.toGeoJSON(), {
      style: {
        color: "#68389b",
        weight: 5,
        opacity: 0.5,
      },
    }).addTo(mymap);
    mymap.fitBounds(lyr.getBounds().pad(1));
    var att = lyr.feature.properties;
    $("#dsd_project_data").html(
      "<h6 class='text-center'> Attributes </h6><h6>Project ID: " +
      att.ADM3_EN +
      "</h6>"
    );
  } else {
    $("#div_dsd_project_error").html("*******DSD name was not found");
  }
});

//******************** Search function on District layer */

function return_district_project_name(name) {
  var ar_layers = district.getLayers();
  for (let i = 0; i < ar_layers.length; i++) {
    var feature_name = ar_layers[i].feature.properties.ADM2_EN;

    if (feature_name == name) {
      return ar_layers[i];
    }
  }
  console.log(feature_name);
  return false;
}

function test_district_project_name(name) {
  if (ar_district_object_names.indexOf(name) < 0) {
    $("div_district_find_project").addClass("has-error");
    $("#div_district_project_error").html("*******district name was not found");
    $("#btn_district_find_project").attr("disabled", true);
  } else {
    $("div_district_find_project").removeClass("has-error");
    $("#div_district_project_error").html("");
    $("#btn_district_find_project").attr("disabled", false);
  }
}

$("#text_district_find_project").on("keyup paste click", function() {
  var name = $("#text_district_find_project").val();
  test_district_project_name(name);
});

$("#btn_district_find_project").click(function() {
  var name = $("#text_district_find_project").val();
  var lyr = return_district_project_name(name);
  if (lyr) {
    if (lyr_district_search) {
      lyr_district_search.remove();
    }
    lyr_district_search = L.geoJSON(lyr.toGeoJSON(), {
      style: {
        color: "#68389b",
        weight: 5,
        opacity: 0.5,
      },
    }).addTo(mymap);
    mymap.fitBounds(lyr.getBounds().pad(1));
    var att = lyr.feature.properties;
    $("#district_project_data").html(
      "<h6 class='text-center'> Attributes </h6><h6>District Name: " +
      att.ADM2_EN +
      "</h6>"
    );
  } else {
    $("#div_district_project_error").html("*******district name was not found");
  }
});

//******************** Search function on Province layer */

function return_province_project_name(name) {
  var ar_layers = province.getLayers();
  for (let i = 0; i < ar_layers.length; i++) {
    var feature_name = ar_layers[i].feature.properties.ADM1_EN;

    if (feature_name == name) {
      return ar_layers[i];
    }
  }
  console.log(feature_name);
  return false;
}

function test_province_project_name(name) {
  if (ar_province_object_names.indexOf(name) < 0) {
    $("div_province_find_project").addClass("has-error");
    $("#div_province_project_error").html("*******Province name was not found");
    $("#btn_province_find_project").attr("disabled", true);
  } else {
    $("div_province_find_project").removeClass("has-error");
    $("#div_province_project_error").html("");
    $("#btn_province_find_project").attr("disabled", false);
  }
}

$("#text_province_find_project").on("keyup paste click", function() {
  var name = $("#text_province_find_project").val();
  test_province_project_name(name);
});

$("#btn_province_find_project").click(function() {
  var name = $("#text_province_find_project").val();
  var lyr = return_province_project_name(name);
  if (lyr) {
    if (lyr_province_search) {
      lyr_province_search.remove();
    }
    lyr_province_search = L.geoJSON(lyr.toGeoJSON(), {
      style: {
        color: "#68389b",
        weight: 5,
        opacity: 0.5,
      },
    }).addTo(mymap);
    mymap.fitBounds(lyr.getBounds().pad(1));
    var att = lyr.feature.properties;
    $("#province_project_data").html(
      "<h6 class='text-center'> Attributes </h6><h6>province Name: " +
      att.ADM1_EN +
      "</h6>"
    );
  } else {
    $("#div_province_project_error").html("*******Province name was not found");
  }
});