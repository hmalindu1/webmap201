<?php 
$dsn = "pgsql:host=localhost;dbname=webmap201;port=5432";
        $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false
        ];
        $pdo = new PDO($dsn, 'postgres', '123', $opt);

        $result = $pdo -> query("SELECT *, ST_AsGeoJSON(geom,5) AS geojson FROM gnd");
        foreach ($result AS $row){
            unset($row['geom']);
    $geometry = $row['geojson'] = json_decode($row['geojson']);
    unset($row['geojson']);
    $feature = ["type" => "features", "geometry" => $geometry, "properties" => $row];
    echo json_encode($feature), "<br><br>";
}
?>