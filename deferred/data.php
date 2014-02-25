<?php
$id = isset($_GET['id']) ? $_GET['id'] : null;
$data = array(
    'id' => $id,
    'number' => rand(),
    'time' => time()
);
$data = json_encode($data);

$time = rand(2, 5);
$time = 0;
sleep($time);

header('Content-Type: application/json');
echo $data;
