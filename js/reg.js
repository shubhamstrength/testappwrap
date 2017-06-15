$(document).ready(function () {
    function qs() {
        var qsparam = new Array(10);
        var query = window.location.search.substring(1);
        var parms = query.split('&');
        for (var i = 0; i < parms.length; i++) {
            var pos = parms[i].indexOf('=');
            if (pos > 0) {
                var key = parms[i].substring(0, pos);
                var val = parms[i].substring(pos + 1);
                qsparam[i] = val;
            }
        }
        empcode.value = qsparam[0];
        mobile.value = qsparam[1];
        dept.value = qsparam[2];
        role.value = qsparam[3];
        email.value = qsparam[4];



    }
    var splitstr = qs();



});