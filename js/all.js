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

  var uri = 'http://cordova.apache.org/static/img/cordova_bot.png';
    window.rootFS = fileSystem.root;
    fileSystem.root.getDirectory('test1', { create: true });

    var filePath = fileSystem.root.toURL() + 'test1/' + uri.split('/').pop();

    alert(window.rootFS.toURL()+" --\n"+filePath);

    var fileTransfer = new FileTransfer();
    //var fileURL = window.rootFS.toURL()+"downloaded-image.png";
    

    fileTransfer.download(uri,filePath, function (entry) {
          alert("Successful download...");
          alert("download complete: " + entry.toURL());
            
        },
        function (error) {
            alert("download error source " + error.source);
            alert("download error target " + error.target);
            alert("download error code" + error.code);
        },
        null, // or, pass false
        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );

}

