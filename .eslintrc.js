module.exports = {
    env: {
        es2021: true,
        node: true,
      },
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 13,
        sourceType: "module",
      },
      plugins: ["@typescript-eslint"],
      rules: {
        "no-multiple-empty-lines": "warn",
        "no-var": "error",
        "prefer-const": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/ban-ts-comment": "off"
      }
};
