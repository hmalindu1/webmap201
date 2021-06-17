<?php
if (isset($_POST['tbl'])) {
    $table = $_POST['tbl'];
    $dsn = "pgsql:host=localhost;dbname=webmap201;port=5432";
    $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, 'postgres', '123', $opt);

    $result = $pdo->query("SELECT * FROM {$table}");
    $return_table = "<table class = 'table table-hover'>";
    foreach ($result as $row) {
        $return_table .= "<tr>";
        foreach ($row as $key => $value) {
            $return_table .= "<td>{$value}</td>";
        }
        $return_table .= "</tr>";
    }
    echo $return_table;
    $return_table .= "</table>";
} else {
    echo "ERROR: No table parameter included with request";
}
