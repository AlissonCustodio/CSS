<?php

	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=1

	
    $executionStartTime = microtime(true);

    header('Content-Type: application/json; charset=UTF-8');

    include("dbh.php");

    $connection = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($connection);

		echo json_encode($output);

		exit;

	}	


	$query = 'INSERT INTO department (name, locationID) VALUES("' . $_POST['name'] . '",' . $_POST["locationID"] . ')';

	$result = $connection->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($connection);

		echo json_encode($output); 

		exit;

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($connection);

	echo json_encode($output); 

?>