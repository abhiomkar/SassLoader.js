class SassLoader {
  constructor(includeFiles, entryFile) {
    this.entryFile = entryFile;
    this.files = includeFiles;
    this.filesLoaded = [];
    this.sass;

    this.init();
  }

  init() {
    this.sass = new Sass();

    this.initImporter();
    this.fetchFiles()
      .then(() => this.compile());
  }

  initImporter() {
    this.sass.importer((request, done) => {
      console.log('import: ', request.current);
      if (request.path) {
        done();
      } else if (request.current.indexOf('@material/') === 0) {
        done({
          path: this.getPath(request.current),
        });
      } else {
        done();
      }
    });
  }

  getPath(name) {
    let path = `/node_modules/${name}.scss`;
    if (this.files.indexOf(path) === -1) {
      path = path
        .split('/')
        .map((word, index, arr) => {
          if (index === arr.length - 1) {
            return '_' + word;
          } else {
            return word;
          }
        })
        .join('/');
    }

    path = '/sass' + path;
    return path;
  }

  fetchFiles() {
    return new Promise((resolve) => {
      this.files.forEach((file) => {
        fetch(file)
          .then((response) => response.text())
          .then((content) => {
            this.writeFile(file, content)
              .then(() => {
                this.filesLoaded.push(file);
                if (this.filesLoaded.length === this.files.length) resolve();
              });
          });
      });
    });
  }

  isFileLoaded(filePath) {
    return this.filesLoaded.indexOf(filePath) >= 0;
  }

  writeFile(filePath, content) {
    return new Promise((resolve, reject) => {
      this.sass.writeFile(filePath, content, (success) => success ? resolve() : reject());
    });
  }

  compile() {
    this.sass.compileFile(this.entryFile, (result) => {
      console.log('result: ', result);
    });
  }
}

new SassLoader(
  [
    '/index.scss',
    '/home.scss',
    '/about.scss',
  ],
  'index.scss',
);
