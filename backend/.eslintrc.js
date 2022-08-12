const SHARED_EXTENDS = [
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  "plugin:jsx-a11y/recommended",
  "plugin:import/recommended",
  "plugin:@next/next/recommended",
  "plugin:prettier/recommended",
];

const SHARED_RULES = {
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "no-return-await": "error",
  "react/react-in-jsx-scope": "off",
  "react/no-multi-comp": "error",
  "react/self-closing-comp": "warn",
  "react/prop-types": "off",
  "react/prefer-stateless-function": "error",
  "import/no-unresolved": "off",
  "import/no-relative-parent-imports": "error",
  "import/no-anonymous-default-export": "warn",
  "import/order": [
    "warn",
    {
      "newlines-between": "never",
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
  ],
  "@next/next/no-html-link-for-pages": "error",
  "@next/next/no-img-element": "error",
};

const SHARED_SETTINGS = {
  react: {
    version: "detect",
  },
};

module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: SHARED_EXTENDS,
  rules: SHARED_RULES,
  settings: SHARED_SETTINGS,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint"],
      extends: [
        ...SHARED_EXTENDS,
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
      ],
      rules: {
        ...SHARED_RULES,
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/ban-ts-comment": [
          "warn",
          {
            "ts-ignore": "allow-with-description",
          },
        ],
        "@typescript-eslint/no-empty-interface": "off",
      },
      settings: SHARED_SETTINGS,
    },
  ],
};
