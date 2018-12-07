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
  }

  initImporter() {
    this.sass.importer((request, done) => {
      this.onImport(request.current);
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
                console.log('DEBUG: loaded ' + file);
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

  onImport(file) {}

  compile() {
    return new Promise((resolve) => {
      this.fetchFiles()
        .then(() => {
          fetch(this.entryFile).then((response) => response.text())
            .then((content) => {
              this.sass.compile(content, (result) => {
                this.inject(result.text);
                resolve();
              });
            });
        });
    });
  }

  inject(content) {
    const styleEl = document.createElement("style");
    styleEl.type = "text/css";
    styleEl.innerHTML = content;
    document.body.appendChild(styleEl);
  }
}
