const { error } = require("console");
const fs = require("fs");

function createf(directory_path, start, end, deletef) {
  if (start > end) return;
  else {
    let file_path = `${directory_path}/file${start}.json`;
    fs.writeFile(file_path, JSON.stringify("[]"), "utf-8", (err) => {
      if (err) console.log(err);
      else {
        console.log("file created" + start);
        deletef();
      }
    });
  }
}

function deletef(directory_path, start, rec) {
  let file_path = `${directory_path}/file${start}.json`;
  fs.unlink(file_path, (err) => {
    if (err) console.log(err);
    else {
      console.log("successfully deleted" + start);
      rec();
    }
  });
}

function rec(directory_path, start, end) {
  createf(directory_path, start, end, () => {
    deletef(directory_path, start, () => {
      rec(directory_path, start + 1, end);
    });
  });
}

function func(directory_path, number) {
  rec(directory_path, 1, number);
}
module.exports = func;
