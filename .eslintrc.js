const path = require("path");
const fs = require("fs");

const isDirectory = (source) => fs.lstatSync(source).isDirectory();
const getDirectories = (source) =>
  fs
    .readdirSync(source)
    .map((name) => path.join(source, name))
    .filter(isDirectory);

module.exports = {
  $schema: "http://json.schemastore.org/eslintrc",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  rules: {
    indent: "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/extensions": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "react/react-in-jsx-scope": 0,
    "no-shadow": "off",
    "react/button-has-type": "off",
    "@typescript-eslint/no-explicit-any": ["error"],
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/consistent-type-definitions": [2],
    "@typescript-eslint/no-require-imports": [4],
    "no-useless-catch": [2],
    "@typescript-eslint/no-unused-vars": [2],
    "@typescript-eslint/no-unnecessary-type-constraint": [2],
    "@typescript-eslint/no-empty-function": [0],
    "@typescript-eslint/no-use-before-define": "off",
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir: [
          __dirname,
          ...getDirectories(path.join(__dirname, "../packages")),
        ],
      },
    ],
    "react/require-default-props": 0,
    "no-console": "error",
    "comma-dangle": ["error", "never"],
    quotes: ["error", "double"],
    "react/function-component-definition": [
      1,
      { namedComponents: "arrow-function" },
    ],
    "import/prefer-default-export": 0,
    "react/jsx-props-no-spreading": 0,
  },
};
