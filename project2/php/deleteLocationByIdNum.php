<?php

	
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

	$id = $_POST['id'];

	// Deleting Department ----------------------------------------------------------------
	$queryDepartment ='DELETE FROM `department` WHERE `locationID` =' . $id;

	$resultDepartment = $connection->query($queryDepartment);

	// ---------------------------------------------------------------------------------------

	// Deleting Location --------------------------------------------------------------------------

	$query ='DELETE FROM `location` WHERE id ='.$id;

	$result = $connection->query($query);

	// ---------------------------------------------------------------------------------


	

	// 'SELECT l.name AS location_name, COUNT(d.id) AS departments FROM locations AS l LEFT JOIN departments As d ON ';

	$result = $connection->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "Error deleting record: " . $connection->error;	
		$output['data'] = [];

		mysqli_close($connection);

		echo json_encode($output); 

		exit;

	}

	$data = [];

	// while ($row = mysqli_fetch_assoc($result)) {

	// 	array_push($data, $row);

	// }

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($connection);

	echo json_encode($output); 

?>