var g_charrSupport = [ 's', 'u', 'p', 'p', 'o', 'r', 't' ];
var g_sDomain = "bendyline.com";

function launchSupportEmail()
{
	var sSupportEmail = "";
	
	for (var i=0; i<g_charrSupport.length; i++)
	{
		sSupportEmail += g_charrSupport[i];
	}
		
	sSupportEmail += "@" + g_sDomain;
	
	location.href = "mailto:" + sSupportEmail;
}

function pheroClick()
{
    location.assign("http://prezhero.com");
}

function quallaClick()
{
    location.assign("https://qualla.com");
}