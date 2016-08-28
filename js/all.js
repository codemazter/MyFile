$.support.cors = true;
$(document).ready(function() {

  document.addEventListener("deviceready", function() {

    alert('deviceready';)
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(){
      alert("error requesting LocalFileSystem");
    });

  }, false);

  //document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(){
      console.log("error requesting LocalFileSystem");
    });
}

function fail() {console.log("failed to get filesystem");}

function gotFS(fs) {
    console.log("got filesystem: "+fs.name); // displays "persistent"
    window.rootFS = fs.root;
    // Make sure you add the domain name to the Content-Security-Policy <meta> element.
    var url = 'http://cordova.apache.org/static/img/cordova_bot.png';

    fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
        download(fileEntry, url);
    }, onErrorCreateFile);
}


function download(fileEntry, uri) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();

    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
            alert("Successful download...");
            alert("download complete: " + entry.toURL());
            
        },
        function (error) {
            alert("download error source " + error.source);
            alert("download error target " + error.target);
            alert("upload error code" + error.code);
        },
        null, // or, pass false
        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );
}


function dirReady(entry) {window.appRootDir = entry;}

$(document).on('click','.download_btn22',function () {
    
    //var url = 'http://amisapp.ansarullah.co.uk/images/meeting_documents/Test Ortho.txt';
    var url = 'https://maps.googleapis.com/maps-api-v3/api/js/26/1/common.js';
    fileName = url.substr(url.lastIndexOf('/') + 1);
    /*cordova.plugins.pDialog.init({
          theme : 'HOLO_DARK',
          progressStyle : 'SPINNER',
          cancelable : false,
          title : 'Please Wait...',
          message : 'Downloading ...'
    });*/

    alert(fileName);


});


var slug = function(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
  .replace(/\s+/g, '-') // collapse whitespace and replace by -
  .replace(/-+/g, '-'); // collapse dashes
  return str;
};