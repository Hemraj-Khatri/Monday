import colors from "colors";
import fs from "fs";
import path from "path";
import url from "url";

function logger(req, res, next) {
  let __filename = url.fileURLToPath(import.meta.url);
  let __dirname = path.dirname(__filename);
  let reqColors = {
    GET: "bgGreen",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };
  let start = Date.now();
  res.on("finish", () => {
    let end = Date.now();
    let today = new Date();
    let logMessage = `${today.getFullYear()}/${
      today.getMonth() + 1
    }/${today.getDate()} - ${req.method} ${req.originalUrl} ${req.ip} ${
      res.statusCode
    } ${end - start}ms`;
    console.log(logMessage[reqColors[req.method]]);
    fs.appendFile(
      path.join(__dirname, "../app.log"),
      logMessage + "\n",
      (err) => {
        if (err) console.log(err.message);
      }
    );
  });

  next();
}

export default logger;


//@des: from git lab


// import colors from "colors";
// import fs from "fs";
// import path from "path";
// import url from "url";

// function logger(req, res, next) {
//   let __filename = url.fileURLToPath(import.meta.url);
//   let __dirname = path.dirname(__filename);
//   let reqColors = {
//     GET: "bgGreen",
//     POST: "yellow",
//     PUT: "blue",
//     DELETE: "red",
//   };
//   let start = Date.now();
//   res.on("finish", () => {
//     let end = Date.now();
//     let today = new Date();
//     let logMessage = `${today.getFullYear()}/${
//       today.getMonth() + 1
//     }/${today.getDate()} - ${req.method} ${req.originalUrl} ${req.ip} ${
//       res.statusCode
//     } ${end - start}ms`;
//     console.log(logMessage[reqColors[req.method]]);
//     fs.appendFile(
//       path.join(__dirname, "../app.log"),
//       logMessage + "\n",
//       (err) => {
//         if (err) console.log(err.message);
//       }
//     );
//   });

//   next();
// }

// export default logger;
