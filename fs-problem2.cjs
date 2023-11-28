const fs = require("fs");

function readf(path, cb) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) console.error(err);
    else cb(data);
  });
}
function writef(data, path, cb) {
  fs.writeFile(path, data, "utf-8", (err) => {
    if (err) console.error(err);
    else {
      console.log("file created successfully");
      cb();
    }
  });
}

function writeupper(name, cb) {
  fs.writeFile(
    "/home/madvi/Documents/callbacks/filenames.txt",
    name,
    "utf-8",
    (err) => {
      if (err) console.error(err);
      else {
        console.log("successfully added");
        cb();
      }
    }
  );
}

function appendf(path, content, cb) {
  fs.appendFile(path, "\n" + content, "utf-8", (err) => {
    if (err) console.error(err);
    else cb();
  });
}

function unlinkf(path) {
  fs.unlink(path, (err) => {
    if (err) console.error(err);
    else console.log(`successfully deleted ${path}`);
  });
}

function fs2(filepath) {
  readf(filepath, (data) => {
    const dataa = data.toUpperCase();
    writef(dataa, "/home/madvi/Documents/callbacks/upper.txt", () => {
      writeupper("upper.txt", () => {
        readf("/home/madvi/Documents/callbacks/upper.txt", (data) => {
          data = data.toLowerCase().replaceAll(". ", ".\n");
          writef(data, "/home/madvi/Documents/callbacks/newline.txt", () => {
            appendf(
              "/home/madvi/Documents/callbacks/filenames.txt",
              "newline.txt",
              () => {
                readf("/home/madvi/Documents/callbacks/upper.txt", (data) => {
                  writef(
                    data,
                    "/home/madvi/Documents/callbacks/sort.txt",
                    () => {
                      readf(
                        "/home/madvi/Documents/callbacks/newline.txt",
                        (data) => {
                          appendf(
                            "/home/madvi/Documents/callbacks/sort.txt",
                            data,
                            () => {
                              readf(
                                "/home/madvi/Documents/callbacks/sort.txt",
                                (data) => {
                                  data = data.split(" ").sort().join(" ");
                                  console.log(data);
                                  writef(
                                    data,
                                    "/home/madvi/Documents/callbacks/sort.txt",
                                    () => {
                                      appendf(
                                        "/home/madvi/Documents/callbacks/filenames.txt",
                                        "sort.txt",
                                        () => {
                                          readf(
                                            "/home/madvi/Documents/callbacks/filenames.txt",
                                            (data) => {
                                              data = data.split("\n");
                                              for (i in data) {
                                                let tempname = `/home/madvi/Documents/callbacks/${data[i]}`;
                                                unlinkf(tempname);
                                              }
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                });
              }
            );
          });
        });
      });
    });
  });
}
module.exports = fs2;
