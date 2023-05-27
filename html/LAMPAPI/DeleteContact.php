<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "Dev", "copProject1plz", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ?");
    $stmt->bind_param("i", $inData["ID"]);

    $stmt->execute();
		
    if( $result = $stmt->get_result() )		
		{
			returnWithError( "Delete fail" );
		}
		else
		{
			returnWithError( "" );
		}
		
		$stmt->close();
		$conn->close();
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