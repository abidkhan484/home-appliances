const fs = require("fs");

const init = async (app) => {
  const currentPath = __dirname;
  fs.readdir(currentPath, { withFileTypes: true }, (err, directories) => {
    if (err) {
      console.log(err);
      return app;
    }

    directories.map(async (directory) => {
      let moduleName = directory.name;
      // console.log(`${currentPath}/${moduleName}`);
      const stat = await fs.promises.lstat(`${currentPath}/${moduleName}`);
      if (stat.isDirectory()) {
        const module = require(`./${moduleName}`);
        if (module.init) {
          await module.init(app);
          console.log(`Module ${moduleName} loaded.`);
        }
      }
    });
  });

  return app;
};

module.exports = { init };
