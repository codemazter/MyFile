$.support.cors = true;
$(document).ready(function(e) {
  //=========================== Device Ready ==================================
    document.addEventListener("deviceready", function() {
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function(){
      console.log("error requesting LocalFileSystem");
    });
    }, false);
});

function gotFS(fileSystem) {
    window.rootFS = fileSystem.root;
    fileSystem.root.getDirectory('test1', { create: true });
}

function download() {

    //var uri = 'http://cordova.apache.org/static/img/cordova_bot.png';

    var uri = 'http://amisapp.ansarullah.co.uk/images/meeting_documents/Test Ortho.txt'
    var filePath = window.rootFS.toURL() + 'test1/' + uri.split('/').pop();
    alert("filePath: "+filePath);
    var fileTransfer = new FileTransfer();
    uri = encodeURI(uri);
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
