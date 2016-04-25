var fs = require('fs');
var request = require('request')

module.exports = {
  pwd: function(stdin, arg, done) {
    done(stdin, process.argv[1].replace(/\/\w+$/, ""));
  },
  date: function(stdin, arg, done) {
    done(stdin, String(new Date()));
  },
  ls: function(stdin, arg, done) {
    var output = '';
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file){
        output += file.toString() + '\n';
      })
      done(stdin, output);
    });
  },
  echo: function(stdin, arg, done) {
    done(stdin, arg);
  },
  cat: function(stdin, fileName, done) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      done(stdin, data);
    })
  },
  head: function(stdin, fileName, done) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      var splitData = data.split("\n")
      var toOut = splitData.slice(0,5).join("\n");
      done(stdin, toOut);
    })
  },
  tail: function(stdin, fileName, done) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      var splitData = data.split("\n")
      var toOut = splitData.slice(-5).join("\n");
      done(stdin, toOut);
    })
  },
  sort: function(stdin, fileName, done) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      var splitData = data.split("\n").sort();
      done(stdin, splitData.join('\n'));
    });
  },
  wc: function(stdin, fileName, done) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      done(stdin, data.split("\n").length.toString());
    });
  },
  uniq: function(stdin, fileName, done) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      var results = [];
      data = data.split("\n");
      data.forEach( function(line) {
        if(results.slice(-1)[0] !== line) results.push(line);
      });
      done(stdin, results.join('\n'));

    });
  },
  curl: function(stdin, url, done) {
    request.get(url, function(err, response, body) {
      if(err || response.statusCode !== 200) throw err;
      else done(stdin, body);
    });
  }
}