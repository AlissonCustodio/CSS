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

	$query = 'SELECT d.id, d.name, l.name as location FROM department d LEFT JOIN location l ON (l.id = d.locationID) ORDER BY d.name, l.name';
 
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
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($connection);

	echo json_encode($output); 

?>