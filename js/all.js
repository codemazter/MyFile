$.support.cors = true;
$(document).ready(function() {
  document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(){
      console.log("error requesting LocalFileSystem");
    });
}

function fail() {console.log("failed to get filesystem");}

function gotFS(fileSystem) {
    console.log("got filesystem: "+fileSystem.name); // displays "persistent"
    window.rootFS = fileSystem.root;
}

function dirReady(entry) {window.appRootDir = entry;}

$(document).on('click','.download_btn',function () {
    
    var url = 'http://amisapp.ansarullah.co.uk/images/meeting_documents/Test Ortho.txt';
    //https://maps.googleapis.com/maps-api-v3/api/js/26/1/common.js
    fileName = url.substr(url.lastIndexOf('/') + 1);
    /*cordova.plugins.pDialog.init({
          theme : 'HOLO_DARK',
          progressStyle : 'SPINNER',
          cancelable : false,
          title : 'Please Wait...',
          message : 'Downloading ...'
    });*/

    alert(fileName);

  cordova.exec(
    function(freeSpace) {
      if((freeSpace/1024) > 10){

        var fileTransfer = new FileTransfer();
        var urls = encodeURI(url);
        var filePath = window.rootFS.toURL() + fileName;
        alert(urls);
        alert(filePath);

        fileTransfer.onprogress = function(result){
          var percent =  result.loaded / result.total * 100;
          percent = Math.round(percent);
          //cordova.plugins.pDialog.setProgress(percent);
        };
        fileTransfer.download(urls,filePath,
          function(entry) {
            navigator.notification.alert('File saved into internal storage', null, 'Success', 'OK');
            //cordova.plugins.pDialog.dismiss();  
            disableBack = false;
          },
          function(error) {
            disableBack = false;
            //cordova.plugins.pDialog.dismiss();  
           navigator.notification.alert("Cannot download.  No/bad internet connection?", null, 'Error', 'OK');
          });

      }else{
        disableBack = false;
        //cordova.plugins.pDialog.dismiss();  
        navigator.notification.alert("Free up space in memory card and try again!", null, 'Alert', 'OK');
      }
    },
    function() {
      disableBack = false;
      //cordova.plugins.pDialog.dismiss();  
      navigator.notification.alert("Error checking filesystem", null, 'Error', 'OK');
    },
    "File", "getFreeDiskSpace", []
  );
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