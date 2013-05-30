function refresh(){
    console.log("<Webinos explorer> refreshing");
    $('#explorerView').empty();    
    $('#status').html("STATUS: ");
    if(webinos.session.isConnected()){        
        console.log(webinos.session);
        $('#status').append(webinos.session.getPZPId() + ' is connected to ' + webinos.session.getPZHId());
        fillConnectedDevices();
    }
    else{
        $('#status').append(webinos.session.getPZPId + ' is not connected');
        $('#explorerView').append("<li id='" + webinos.session.getConnectedDevices()[0] + "'><span>"+ webinos.session.getConnectedDevices()[0] +"</span></li>");
        fillServices();
    }
}


function fillConnectedDevices(){    
    for(var i=0;i<webinos.session.getConnectedDevices().length;i++){
        $('#explorerView').append("<li><span>"+ webinos.session.getConnectedDevices()[i].id +"</span></li>");
        for(var j=0;j<webinos.session.getConnectedDevices()[i].pzp.length;j++)
            $('#explorerView').append("<ul><li id='"+ webinos.session.getConnectedDevices()[i].pzp[j] +"'><span>"+ webinos.session.getConnectedDevices()[i].pzp[j] +"</span></li>");
        $('#explorerView').append("</ul>");
    }
    fillServices();
}


function fillServices(){
    console.log("Webinos explorer: calling service discovery");
    webinos.discovery.findServices(new ServiceType('http://www.w3.org/ns/api-perms/geolocation'), {        
//     webinos.discovery.findServices(new ServiceType('http://webinos.org/api/test'), {        
//     webinos.discovery.findServices(new ServiceType('*'), {        
        onFound: function(service){
            $("[id='" + service.serviceAddress + "']").append("<ul><li><span>" + service.displayName + "</span></ul>");
            
//             console.log("----");
//             console.log(service);            
//             console.log("----");
        }
    });
}


$(document).ready(function(){    
    $("#refresh").click(refresh);
    webinos.session.addListener('registeredBrowser', refresh);
});

