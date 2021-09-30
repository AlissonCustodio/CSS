<?php

	// use insertDepartment.php first to create new dummy record and then specify it's id in the command below
	// http://localhost/companydirectory/libs/php/deleteDepartmentByID.php?id= <id>

	
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

	$query ='DELETE FROM department WHERE ( SELECT COUNT(id) FROM `personnel` WHERE `departmentID` =' . $id . ') = 0 AND id =' . $id;




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

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($connection);

	echo json_encode($output); 

?>