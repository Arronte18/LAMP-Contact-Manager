function formatCheckPassword()
{
  var input = document.getElementById("registerPassword").value;

    input=input.trim();
    document.getElementById("registerPassword").value=input;
    if(input.length>7 && input.length<32)
    {
        document.getElementById("check0").style.color="green";
    }
    else
    {
       document.getElementById("check0").style.color="red";
    }

    if(input.match(/[0-9]/i))
    {
        document.getElementById("check1").style.color="green";
    }
    else
    {
       document.getElementById("check1").style.color="red";
    }

    if(input.match(/[^A-Za-z0-9]/i))
    {
        document.getElementById("check2").style.color="green";
    }
    else
    {
       document.getElementById("check2").style.color="red";
    }

}
