function formatCheckPassword()
{
  var input = document.getElementById("registerPassword").value;

    input=input.trim();
    document.getElementById("registerPassword").value=input;
    if(input.length>7 && input.length<32)
    {
        document.getElementById("check0").style.color="green";
        document.getElementById("check0").style.opacity=0;
    }
    else
    {
       document.getElementById("check0").style.color="black";
       document.getElementById('x1').innerHTML = "&#10006;";
       document.getElementById("check0").style.opacity=1;
    }

    if(input.match(/[0-9]/i))
    {
        document.getElementById("check1").style.color="green";
        document.getElementById("check1").style.opacity=0;
    }
    else
    {
       document.getElementById("check1").style.color="black";
       document.getElementById('x2').innerHTML = "&#10006;";
       document.getElementById("check1").style.opacity=1;
    }

    if(input.match(/[^A-Za-z0-9]/i))
    {
        document.getElementById("check2").style.color="green";
        document.getElementById("check2").style.opacity=0;
    }
    else
    {
       document.getElementById("check2").style.color="black";
       document.getElementById('x3').innerHTML = "&#10006;";
       document.getElementById("check2").style.opacity=1;
    }

}
