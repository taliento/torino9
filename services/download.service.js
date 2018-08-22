/* jshint node: true */
"use strict";

const fs = require("fs");
const archiver = require("archiver");
const unzip = require("unzip");
const Q = require("q");
const path = require("path");

let service = {};
service.downloadAll = downloadAll;
service.uploadAll = uploadAll;
module.exports = service;

function downloadAll() {
  let deferred = Q.defer();

  // create a file to stream archive data to.
  let output = fs.createWriteStream(__dirname + "/../public/images.zip");
  let archive = archiver("zip", {
    zlib: {
      level: 9
    } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on("close", () => {
    console.log(archive.pointer() + " total bytes");
    console.log("finalized and closed.");
    deferred.resolve();
  });

  // This event is fired when the data source is drained no matter
  // what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on("end", () => {
    console.log("Data has been drained");
  });

  // good practice to catch warnings
  // (ie stat failures and other non-blocking errors)
  archive.on("warning", err => {
    if (err.code === "ENOENT") {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on("error", err => {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // append files from a sub-directory, putting
  // its contents at the root of archive
  archive.directory("public/img/", false);

  // finalize the archive (ie we are done appending files
  // but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling
  // this method so register to them beforehand
  archive.finalize();

  return deferred.promise;
}

function uploadAll(file) {
  let deferred = Q.defer();

  let filePath = __dirname + "/../public/images.zip";

  file.mv(filePath, err => {
    if (err) deferred.reject(err.name + ": " + err.message);

    fs.createReadStream(filePath).pipe(
      unzip.Extract({
        path: __dirname + "/../public/img/"
      })
    );
    deferred.resolve();
  });

  return deferred.promise;
}
