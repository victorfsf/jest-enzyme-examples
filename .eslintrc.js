const path = require('path');

module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
      "jsx-a11y/": 0,
      "react/jsx-filename-extension": 0,
    "max-len": ["error", 100]
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, 'config/webpack.config.dev.js'),
        "config-index": 1
      }
    }
  }
}
