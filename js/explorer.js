function refresh(){
    console.log("<Webinos explorer> refreshing");       
    logWebinos();
    
    $('#explorerView').empty();    
    $('#status').html('STATUS:  ');
    if(webinos.session.isConnected()){        
        $('#status').append(webinos.session.getPZPId() + ' is connected to ' + webinos.session.getPZHId());
        fillConnectedDevices();        
    }
    else{ //virgin mode only
        $('#status').append(webinos.session.getPZPId() + ' is not connected');
        $('#explorerView').append('<li id="' + webinos.session.getConnectedDevices()[0].id + '"><span>'+ webinos.session.getConnectedDevices()[0].friendlyName +'</span></li><ol id="' + webinos.session.getConnectedDevices()[0].id + '/services' + '"></ol>');
        fillServices();
    }
}


function fillConnectedDevices(){    
    for(var i=0;i<webinos.session.getConnectedDevices().length;i++){
        $('#explorerView').append('<li id="'+ webinos.session.getConnectedDevices()[i].id + '"><span>' + webinos.session.getConnectedDevices()[i].friendlyName + '</span></li><ol id="' + webinos.session.getConnectedDevices()[i].id + '/services' + '"></ol>');
        
        for(var j=0;j<webinos.session.getConnectedDevices()[i].pzp.length;j++)
            $('#explorerView').append('<ul><li id="' + webinos.session.getConnectedDevices()[i].pzp[j].id +'"><span>' + webinos.session.getConnectedDevices()[i].pzp[j].friendlyName +'</span></li><ol id="' + webinos.session.getConnectedDevices()[i].pzp[j].id + '/services' + '"></ol>');
        $('#explorerView').append('</ul>');
    }
    fillServices();
}


function fillServices(){
    console.log("webinos explorer: calling service discovery");    
    webinos.discovery.findServices(new ServiceType('*'), {                
        onFound: function(service){            
            console.log("***************");
            console.log(service.serviceAddress);
            console.log("***************");
            $('[id="' + service.serviceAddress + '/services' + '"]').append('<li><span>' + service.displayName + '</span></li>');
        }
    });
}


$(document).ready(function(){    
    $("#refresh").bind('click', refresh);
    webinos.session.addListener('registeredBrowser', refresh);
});


function logWebinos(){
    console.log("-------------------------------------");
    console.log('webinos.session.getSessionId()');
    console.log(webinos.session.getSessionId());
    console.log("---");
    console.log('webinos.session.getConnectedPzh()');
    console.log(webinos.session.getConnectedPzh());
    console.log("---");
    console.log('webinos.session.getConnectedPzp()');
    console.log(webinos.session.getConnectedPzp());
    console.log("---");
    console.log('webinos.session.getConnectedDevices()');
    console.log(webinos.session.getConnectedDevices());
    console.log("---");
    console.log('webinos.session.getPZPId()');
    console.log(webinos.session.getPZPId());
    console.log("---");
    console.log('webinos.session.getPZHId()');
    console.log(webinos.session.getPZHId());
    console.log("---");
    console.log('webinos.session.getFriendlyName()');
    console.log(webinos.session.getFriendlyName());
    console.log("---");
    console.log('webinos.session.isConnected()');
    console.log(webinos.session.isConnected());
    console.log("---");
    console.log('webinos.session.getSessionId()');
    console.log(webinos.session.getSessionId());
    console.log("---");
    console.log('webinos.session.getWebinosVersion()');
    console.log(webinos.session.getWebinosVersion());
    console.log("---");
    console.log('webinos.session.getServiceLocation()');
    console.log(webinos.session.getServiceLocation());
    console.log("---");
    console.log('webinos.session');
    console.log(webinos.session);
    console.log("-------------------------------------");
} 