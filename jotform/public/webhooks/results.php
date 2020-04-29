<?php
$servername = "localhost";
$username = "root";
$password = "regnaDkciN";
$dbname = "jotform";
$dbtable = "assessments";

//Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);
//Check connection
if ($mysqli->connect_error) {
	die("Connection failed: " . $mysqli->connect_error);
}

$result = $mysqli->query("SELECT * FROM assessments");
if ($result->num_rows > 0) {
	$records = [];
	while($row = $result->fetch_assoc()) {
		$records[] = $row;
	}
	$data = json_encode($records);
	echo $data;
}
$mysqli->close();
