<?php
/******************************************************
 *
 * JotForm to MySQL Database Through Webhook - Sample Script
 * Elton Cris - JotForm Tech Support
 * www.jotform.com
 *
 * Test form: https://form.jotform.com/62893435003959
 * Check request here: https://jotthemes.000webhostapp.com/jotform/view.php
 ******************************************************/

//Replace with your DB Details
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

//Get field values from the form
//Get unique submissionID - nothing to change here
$sid = $mysqli->real_escape_string($_REQUEST['submissionID']);

//Get form field values and decode - nothing to change here
$fieldvalues = $_REQUEST['rawRequest'];
$obj = json_decode($fieldvalues, true);

//Replace the field names from your form here
$weight = $mysqli->real_escape_string($obj['q4_whatIs4']);
$height = $mysqli->real_escape_string($obj['q3_whatIs']);
$temperature = $mysqli->real_escape_string($obj['q5_whatIs5']);
$nickname = $mysqli->real_escape_string($obj['q7_yourNickname']);
$symptoms = $obj['q6_areYou6'];
$symptoms = json_encode($symptoms);

$result = $mysqli->query("INSERT INTO assessments (sid, nickname, rawdata, weight, height, temperature, symptoms) VALUES ($sid, '$nickname', '$fieldvalues', '$weight', '$height', '$temperature', '$symptoms')");
echo "New Record Added!";
if ($result === false) {
	echo "SQL error:" . $mysqli->error;
	file_put_contents('log.txt', $mysqli->error);
}

$mysqli->close();
?>
