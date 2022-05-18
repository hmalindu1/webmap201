<?php

$overlay_trees = [
    'label' => 'Some cities',
    'selectAllCheckbox' => 'Un/select all',
    'children' => [[
        'label' => 'Germany',
        'selectAllCheckbox' => 'true',
        'children' => [[
            'label' => 'Berlin',
            'layer' => 'test 1'
        ]],
    ]],
];

// $json = array(
//     "client" => array(
//         "build" => "1.0",
//         "name" => "xxxxxx",
//         "version" => "1.0",
//     ),
//     "protocolVersion" => 4,
//     "data" => array(
//         "distributorId" => "xxxx",
//         "distributorPin" => "xxxx",
//         "locale" => "en-US",
//     ),
// );


echo json_encode($overlay_trees);

?>
