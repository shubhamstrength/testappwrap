$(document).ready(function () {
    $("#btnCallWebService").click(function (event) {
        var wsUrl = "http://esriindia.niit-tech.in/eesserv/Service.asmx?op=returnAll";

        var soapRequest =
'<?xml version="1.0" encoding="utf-8"?> \
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" \
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
  <soap:Body> \
    <returnAll xmlns="http://tempuri.org/"> \
      <tablename>' + $("#txtName").val() + '</tablename> \
<imei>' + "1234567" + '</imei> \
    </returnAll> \
  </soap:Body> \
</soap:Envelope>';

        $.ajax({
            type: "POST",
            url: wsUrl,
            contentType: "text/xml",
            dataType: "xml",
            data: soapRequest,
            success: processSuccess,
            error: processError
        });

    });

});
$(document).ready(function () {
    $("#loginsubmit").click(function (event) {
        var wsUrl = "http://esriindia.niit-tech.in/eesserv/Service.asmx?op=returnAllData";

        var soapRequest =
'<?xml version="1.0" encoding="utf-8"?> \
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" \
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
  <soap:Body> \
    <returnAllData xmlns="http://tempuri.org/"> \
      <empcode>' + $("#empid").val() + '</empcode> \
<mobile>' + $("#mobile").val() + '</mobile> \
    </returnAllData> \
  </soap:Body> \
</soap:Envelope>';
        if ($("#empid").val() == "" || $("#mobile").val() == "") {
            alert("Important feilds cant be empty!")
        } else {
            $.ajax({
                type: "POST",
                url: wsUrl,
                contentType: "text/xml",
                dataType: "xml",
                data: soapRequest,
                success: loginSuccess,
                error: processError
            });
        }
      

    });




});

function processSuccess(data, status, req) {
    if (status == "success")
        $("#response").text($(req.responseXML).find("returnAllResult").text());
}

function loginSuccess(data, status, req) {
    if (status == "success")
        // $("#response").text($(req.responseXML).find("returnAllResult").text());
        var data = $(req.responseXML).find("returnAllDataResult").text();
    if (data != "false") {
        var empcode = $("#empid").val();
        var mobile = $("#mobile").val()
        var partsOfdata = data.split(',');
        var se = partsOfdata[0];
        var dept = partsOfdata[1];
        var email = partsOfdata[2];
        window.location.href = "/registration.html?empcode=" + empcode + "&mobile=" + mobile +
         "&se=" + se + "&dept=" + dept + "&email=" + email;
    }
    else {
        alert("Please check that you have entered correct Emp Id/Mobile!")
    }

  

}
function processError(data, status, req) {
    alert(req.responseText + " " + status);
}
