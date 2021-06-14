<?php 
$dsn = "pgsql:host=localhost;dbname=webmap201;port=5432";
        $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false
        ];
        $pdo = new PDO($dsn, 'postgres', '123', $opt);

        $result = $pdo -> query("SELECT * FROM gnd");
        foreach ($result AS $row){
            unset($row['geom']);
            echo json_encode($row),"<br><br>";
        }
?>