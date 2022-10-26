module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-no-bind": [
      "error",
      { allowArrowFunctions: true, allowFunctions: true },
    ],
    "prettier/prettier": "warn",
    "react/require-default-props": "off",
    "no-use-before-define": "off",
    "no-nested-ternary": "off",
    "no-shadow": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".tsx"] }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "react/function-component-definition": "off",
        "react/jsx-props-no-spreading": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ".",
      },
    },
  },
};
