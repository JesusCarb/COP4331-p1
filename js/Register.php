<?php
	$inData = getRequestInfo();
	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];
 
	$conn = new mysqli("localhost", "Dev", "copProject1plz", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$check = $conn->prepare("SELECT Login FROM Users WHERE Login = ?");
		$check->bind_param("s", $inData["Login"]);
		$check->execute();
		$checkLogin = $check->get_result();
		
		// prevents existing username
		if ($row = $checkLogin->fetch_assoc())
		{
			returnWithError("Username Unavailable");
		}
		else
		{
			$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $Password);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
	
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>