<?php
  $inData = getRequestInfo();
  // ini_set('log_errors', TRUE);
  // ini_set('display_errors', TRUE);

  $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
  if ($conn->connect_error)
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("INSERT INTO Users(FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
    $stmt->bind_param("ssss", $inData["registerFirstName"], $inData["registerLastName"], $inData["registerUsername"], $inData["registerPassword"]);
    $stmt->execute();
    $stmt->close();


    $stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
    $stmt->bind_param("ss", $inData["registerUsername"], $inData["registerPassword"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if( $row = $result->fetch_assoc()  )
    {
      returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
    }
    else
    {
      returnWithError("No Records Found");
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

  function returnWithInfo( $firstName, $lastName, $id )
  {
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson( $retValue );
  }

?>
