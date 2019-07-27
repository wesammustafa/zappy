module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "airbnb-base",
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "globals": {
    "_": true,
    "Promise": true,
    "upload": true,
    "describe": true,
    "beforeEach": true,
    "it": true
  },
  "rules": {
    "no-console": "error",
    "quotes": ["error", "single"],
    "no-mixed-spaces-and-tabs": "error",
    "semi": ["error", "always"],
    "no-param-reassign": "warn",
    "no-plusplus": [
      "error",
      {
        "allowForLoopAfterthoughts": true
      }
    ],
    "no-underscore-dangle": "warn",
    "class-methods-use-this": "error",
    "prefer-destructuring": "warn",
    "max-len": "off",
    "no-this-before-super": "warn",
    "class-methods-use-this": "warn",
    "no-unused-expressions": "warn",
    "comma-dangle": "warn",
    "arrow-parens": "warn",
    "implicit-arrow-linebreak": "warn",
    "function-paren-newline": "warn",
    "nonblock-statement-body-position": "warn",
    "curly": "off",
    "no-use-before-define": "warn"
  }
};
