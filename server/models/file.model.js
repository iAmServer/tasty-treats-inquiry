const file = `${__dirname}/${process.env.EXCEL_FILE_NAME}`;
const fs = require("fs");

const getAll = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }

      if (data) {
        const dataArray = data.split("\n");
        const dataObjectsArray = [];

        dataArray.pop();
        dataArray.forEach((element) => {
          const dataObjectArray = element.split("::");
          const dataObject = {
            name: dataObjectArray[0],
            email: dataObjectArray[1],
            message: dataObjectArray[2],
            isSubscribe: dataObjectArray[3] === "true" ? true : false,
          };

          dataObjectsArray.push(dataObject);
        });

        resolve(dataObjectsArray.reverse());
      } else {
        resolve([]);
      }
    });
  });
};

const create = (data) => {
  return new Promise((resolve, reject) => {
    const stringfiedData = `${data.name}::${data.email}::${data.message}::${
      data.isSubscribe ? true : false
    }\n`;

    fs.appendFile(file, stringfiedData, (err) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};

module.exports = {
  getAll,
  create,
};
