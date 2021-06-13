<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Agriculture</title>

    <link rel="stylesheet" href="src/leaflet.css" />
    <link href="src/all.css" rel="stylesheet" />

    <link rel="stylesheet" href="src/plugins/L.Control.MousePosition.css" />
    <link rel="stylesheet" href="src/plugins/L.Control.Sidebar.css" />
    <link rel="stylesheet" href="src/plugins/easy-button.css" />
    <link rel="stylesheet" href="src/plugins/L.Control.Pan.css" />
    <link rel="stylesheet" href="src/plugins/L.Control.Zoomslider.css" />
    <link rel="stylesheet" href="src/plugins/leaflet-control-boxzoom.css" />
    <link rel="stylesheet" href="src/plugins/leaflet.groupedlayercontrol.css" />
    <link rel="stylesheet" href="css/agri_style.css" />

    <script src="src/jquery-3.6.0.js"></script>

    <link rel="stylesheet" href="src/jquery-ui.min.css" />
    <script src="src/jquery-ui.min.js"></script>

    <script src="src/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="src/css/bootstrap.css" />

    <script src="src/leaflet-src.js"></script>
    <script src="src/all.js"></script>

    <script src="src/plugins/L.Control.MousePosition.js"></script>
    <script src="src/plugins/L.Control.Sidebar.js"></script>
    <script src="src/plugins/easy-button.js"></script>
    <script src="src/plugins/L.Control.Pan.js"></script>
    <script src="src/plugins/SmoothWheelZoom.js"></script>
    <script src="src/plugins/leaflet-providers.js"></script>
    <script src="src/plugins/leaflet.ajax.min.js"></script>
    <script src="src/plugins/leaflet-control-boxzoom.js"></script>
    <script src="src/plugins/leaflet.groupedlayercontrol.js"></script>

    <style></style>
  </head>
  <body>
    <div id="header" class="col-md-12">
      <h2 class="text-center">Agricultural Information System (AIS)</h2>
    </div>
    <div>
      <div class="container">
        <div class="row">
          <div id="side_bar">
            <div id="div_project" class="col-12">
              <div id="div_gnd_project_label" class="text-center col-12">
                <h5>GN Divisions</h5>
                <div id="div_gnd_project_error" class="errorMsg col-12"></div>
                <div id="div_gnd_find_project" class="row form-group has-error">
                  <div class="col-6">
                    <input
                      type="text"
                      id="text_gnd_find_project"
                      class="form-control"
                      placeholder="GND Name"
                    />
                  </div>
                  <div class="col-6">
                    <button
                      id="btn_gnd_find_project"
                      class="btn btn-primary"
                      disabled
                    >
                      Find
                    </button>
                  </div>
                </div>
                <div id="gnd_project_data"></div>
                <li
                  class="main_menu btn btn-secondary dropdown"
                  id="myDropdown"
                >
                  <a
                    class="dropdown-toggle btn-myadd1"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Spatial Unit
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Land information
                        <i class="fa fa-solid fa fa-caret-right"></i>
                      </a>
                      <ul class="submenu dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#"
                            >Land Use Classification
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Land Ownership
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Agriculture
                        <i class="fa fa-solid fa fa-caret-right"></i>
                      </a>
                      <ul class="submenu dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#"
                            >Machineries
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Production
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Insurance
                            <i class="fa fa-solid fa fa-caret-right"></i>
                          </a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Extension
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Schema <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Export <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Livestock <i class="fa fa-solid fa fa-caret-right"></i>
                      </a>
                      <ul class="submenu dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#"
                            >Forage Cultivations
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Special Programs
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Small Industries
                            <i class="fa fa-solid fa fa-caret-right"></i>
                          </a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Population
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Services
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Irrigation <i class="fa fa-solid fa fa-caret-right"></i>
                      </a>
                      <ul class="submenu dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#"
                            >Ornamental Fisheries
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Irrigation Projects
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Minor Irrigations
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#"
                            >Inland Fisheries
                            <i class="fa fa-solid fa fa-caret-right"></i
                          ></a>
                          <ul class="submenu dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">All</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2015</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2016</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2017</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2018</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">2019</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </div>
            </div>
            <div id="div_project" class="col-12">
              <div id="div_dsd_project_label" class="text-center col-12">
                <h5>DS Divisions</h5>
                <div id="div_dsd_project_error" class="errorMsg col-12"></div>
                <div id="div_dsd_find_project" class="row form-group has-error">
                  <div class="col-6">
                    <input
                      type="text"
                      id="text_dsd_find_project"
                      class="form-control"
                      placeholder="DSD Name"
                    />
                  </div>
                  <div class="col-6">
                    <button
                      id="btn_dsd_find_project"
                      class="btn btn-primary"
                      disabled
                    >
                      Find
                    </button>
                  </div>
                </div>
                <div id="dsd_project_data"></div>
              </div>
            </div>
            <div id="div_project" class="col-12">
              <div id="div_district_project_label" class="text-center col-12">
                <h5>District</h5>
                <div
                  id="div_district_project_error"
                  class="errorMsg col-12"
                ></div>
                <div
                  id="div_district_find_project"
                  class="row form-group has-error"
                >
                  <div class="col-6">
                    <input
                      type="text"
                      id="text_district_find_project"
                      class="form-control"
                      placeholder="District"
                    />
                  </div>
                  <div class="col-6">
                    <button
                      id="btn_district_find_project"
                      class="btn btn-primary"
                      disabled
                    >
                      Find
                    </button>
                  </div>
                </div>
                <div id="district_project_data"></div>
              </div>
            </div>
            <div id="div_project" class="col-12">
              <div id="div_province_project_label" class="text-center col-12">
                <h5>Province</h5>
                <div
                  id="div_province_project_error"
                  class="errorMsg col-12"
                ></div>
                <div
                  id="div_province_find_project"
                  class="row form-group has-error"
                >
                  <div class="col-6">
                    <input
                      type="text"
                      id="text_province_find_project"
                      class="form-control"
                      placeholder="Province"
                    />
                  </div>
                  <div class="col-6">
                    <button
                      id="btn_province_find_project"
                      class="btn btn-primary"
                      disabled
                    >
                      Find
                    </button>
                  </div>
                </div>
                <div id="province_project_data"></div>
              </div>
            </div>
          </div>
          <div id="mapdiv" class="col-md-12"></div>
          <!-- <div id="info_bar" class="col-md-2"></div> -->
        </div>
      </div>
    </div>
    <script src="js/agri_script.js"></script>
  </body>
</html>
