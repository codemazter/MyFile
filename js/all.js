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
   alert('gotFS');
    //console.log("got filesystem: "+fileSystem.name); // displays "persistent"
    window.rootFS = fileSystem.root;
    alert(window.rootFS.toURL());
}

