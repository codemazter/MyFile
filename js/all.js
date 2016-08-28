$.support.cors = true;
$(document).ready(function(e) {
  //=========================== Device Ready ==================================
    document.addEventListener("deviceready", function() {

      alert('deviceready');
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(){
      console.log("error requesting LocalFileSystem");
    });
       
    }, false);
    /** Device Ready ends **/
});

function gotFS(fileSystem) {
   //alert('gotFS');
    //console.log("got filesystem: "+fileSystem.name); // displays "persistent"
    window.rootFS = fileSystem.root;
    alert(window.rootFS.toURL());

    var fileTransfer = new FileTransfer();
    var fileURL = window.rootFS.toURL()+"downloaded-image.png";
    var uri = 'http://cordova.apache.org/static/img/cordova_bot.png';

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

