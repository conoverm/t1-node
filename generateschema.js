var fs = require( 'fs' );
var path = require( 'path' );
var jsonrefs = require('json-refs');

var schemaPath = path.join("../mm-json-schema/adama");
var jsPath = path.join(__dirname, "/lib/schema");
var jsonRefsOptions = {
        depth: 2,
        location: schemaPath
    };

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

if (fs.existsSync(jsPath)) {
  deleteFolderRecursive(jsPath);
} 

fs.mkdirSync(jsPath);

// Loop through all the files in the temp directory
fs.readdir( schemaPath, function( err, files ) {
  if( err ) {
      console.error( "Could not list the directory.", err );
      process.exit( 1 );
  } 

  files.forEach( function( file, index ) {
    // Make one pass and make the file complete
    var filePath = path.join( schemaPath, file );

    fs.stat( filePath, function( error, stat ) {
        if( error ) {
            console.error( "Error stating file.", error );
            return;
        }

        var schemaContent = fs.readFileSync(filePath);
        // Example using `options.paths`
        jsonrefs.resolveRefs(JSON.parse(schemaContent), jsonRefsOptions )
          .then(function(resolved) {
            fs.writeFile(path.join( jsPath, path.basename(file, '.json') + '.js' ), "module.exports  = " + JSON.stringify(resolved.resolved, null, 2) + ";\n")
          })
          .catch(function(e) {
            console.log(e)
          });
    } );
  } );
} );

