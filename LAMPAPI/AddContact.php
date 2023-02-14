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
      $stmt = $conn->prepare("INSERT into Contacts (UserID,FirstName,LastName,Phone,Email,Address,City,State) VALUES(?,?,?,?,?,?,?,?)");
      $stmt->bind_param("isssssss", $inData["userId"],$inData["contFirstname"],
                                    $inData["contLastname"],$inData["contPhoneNumber"], $inData["contEmail"], $inData["contAddress"],
                                    $inData["contCity"], $inData["contState"]);

      $stmt->execute();
      $stmt->close();


      $stmt = $conn->prepare("SELECT UserID,FirstName,LastName FROM Contacts WHERE UserID=? AND FirstName=? AND LastName =?");
      $stmt->bind_param("iss", $inData["userId"], $inData["contFirstname"], $inData["contLastname"]);
      $stmt->execute();
      $result = $stmt->get_result();

      if( $row = $result->fetch_assoc()  )
      {
        returnWithInfo(  $row['FirstName'], $row['LastName'], $row['UserID']);
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
      $retValue = '{"userId":' . $id . ',"Contact firstName":"' . $firstName . '","Contact lastName":"' . $lastName . '","error":""}';
      sendResultInfoAsJson( $retValue );
    }

?>
