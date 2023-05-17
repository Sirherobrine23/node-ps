const addon = require("./build/Release/ps.node");

if (process.platform === "linux") {
  const fs = require("fs");
  module.exports.list = list;
  function list() {
    const lists = addon.List();
    return lists.map(cc => {
      try {cc.execPath = fs.realpathSync(cc.execPath);} catch {}
      return cc;
    });
  }
} else module.exports.list = addon.List;