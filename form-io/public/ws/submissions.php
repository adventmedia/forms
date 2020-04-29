<?php
require_once("credentials.php");
$response = (object)array("success" => false, "message" => "server error");

//Create connection
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

//Check connection
if ($mysqli->connect_error) {
	die("Connection failed: " . $mysqli->connect_error);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$submitted = json_decode(file_get_contents("php://input"));
	$data = $submitted->data;

	$query = "INSERT INTO assessment (nickname, weight, height, bodytemperature, bloodpressure, symptoms) VALUES ('$data->nickname', '$data->weight', '$data->height', '$data->bodytemperature', '$data->bloodpressure', '$data->symptoms')";
	$result = $mysqli->query($query);
	if ($result === false) {
		echo "SQL error:" . $mysqli->error;
		file_put_contents('log.txt', $mysqli->error);
		$response->message = $mysqli->error;
	} else {
		$response->success = true;
		$response->message = '';
	}
} else {
	$query = "SELECT * FROM assessment";
	$result = $mysqli->query($query);
	if ($result === false) {
		echo "SQL error:" . $mysqli->error;
		file_put_contents('log.txt', $mysqli->error);
		$response->message = $mysqli->error;
	} else {
		if ($result->num_rows > 0) {
			$records = [];
			while($row = $result->fetch_assoc()) {
				$records[] = $row;
			}
		}
		$response->success = true;
		$response->message = $records;
	}
}
echo json_encode($response);
$mysqli->close();
?>
