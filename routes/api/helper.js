function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}='${encodeURIComponent(obj[p])}'`);
    }
  return str.join(",");
}

function queryUpdateData(obj) {
  var keys = Object.keys(obj);
  keys = keys.map((item) => item + `='${obj[item]}'`);
  return { keys: keys.join(",") };
}

function queryPostData(obj) {
  console.log("obj", obj);
  const keys = Object.keys(obj).join();
  console.log("keys", keys);
  var values = Object.values(obj);
  values = values.map((item) => `'${item}'`);
  return { keys, values };
}

module.exports = { objectToQueryString, queryUpdateData, queryPostData };
