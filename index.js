const loader = new SassLoader(
  [
    '/node_modules/@material/shape/_functions.scss',
    '/node_modules/@material/shape/_variables.scss',
    '/node_modules/@material/shape/_mixins.scss',
    '/node_modules/@material/animation/_functions.scss',
    '/node_modules/@material/animation/_variables.scss',
    '/node_modules/@material/ripple/_functions.scss',
    '/node_modules/@material/ripple/_variables.scss',
    '/node_modules/@material/ripple/mdc-ripple.scss',
    '/node_modules/@material/ripple/common.scss',
    '/node_modules/@material/ripple/_keyframes.scss',
    '/node_modules/@material/ripple/_mixins.scss',
    '/node_modules/@material/button/_variables.scss',
    '/node_modules/@material/button/_mixins.scss',
    '/node_modules/@material/button/mdc-button.scss',
    '/node_modules/@material/theme/mdc-theme.scss',
    '/node_modules/@material/theme/_functions.scss',
    '/node_modules/@material/theme/_variables.scss',
    '/node_modules/@material/theme/_color-palette.scss',
    '/node_modules/@material/theme/_mixins.scss',
    '/node_modules/@material/theme/_constants.scss',
    '/node_modules/@material/typography/_functions.scss',
    '/node_modules/@material/typography/_variables.scss',
    '/node_modules/@material/typography/mdc-typography.scss',
    '/node_modules/@material/typography/_mixins.scss',
    '/node_modules/@material/elevation/_variables.scss',
    '/node_modules/@material/elevation/_mixins.scss',
    '/node_modules/@material/elevation/mdc-elevation.scss',
    '/node_modules/@material/rtl/_mixins.scss',
    '/node_modules/@material/base/_mixins.scss',
    '/index.scss',
    '/home.scss',
    '/about.scss',
  ],
  '/index.scss',
);
loader.compile()
  .then(() => {
    document.querySelector('.app').classList.remove('hidden');
    document.querySelector('.debug-container').classList.add('hidden');
  });
loader.onImport = (file) => {
  document.querySelector('.debug-substatus').textContent = file;
};
