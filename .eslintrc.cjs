const perfectionistRules = {
  "perfectionist/sort-array-includes": [
    "error",
    {
      type: "natural",
      order: "asc",
      "spread-last": true,
    },
  ],
  "perfectionist/sort-classes": [
    "error",
    {
      type: "natural",
      order: "asc",
      groups: [
        "index-signature",
        "static-property",
        "private-property",
        "property",
        "constructor",
        "static-method",
        "private-method",
        "method",
      ],
    },
  ],
  "perfectionist/sort-enums": [
    "error",
    {
      type: "natural",
      order: "asc",
    },
  ],
  "perfectionist/sort-exports": [
    "error",
    {
      type: "natural",
      order: "asc",
    },
  ],
  "perfectionist/sort-imports": [
    "error",
    {
      type: "natural",
      order: "asc",
      groups: [
        "type",
        "react",
        ["builtin", "external"],
        "internal-type",
        "internal",
        ["parent-type", "sibling-type", "index-type"],
        ["parent", "sibling", "index"],
        "side-effect",
        "style",
        "object",
        "unknown",
      ],
      "custom-groups": {
        value: {
          react: ["react", "react-*"],
        },
        type: {
          react: "react",
        },
      },
      "newlines-between": "always",
      "internal-pattern": [
        "@/components/**",
        "@/stores/**",
        "@/pages/**",
        "@/lib/**",
      ],
    },
  ],
  "perfectionist/sort-interfaces": [
    "error",
    {
      type: "natural",
      order: "asc",
    },
  ],
  // "perfectionist/sort-jsx-props": [
  //   "error",
  //   {
  //     "type": "natural",
  //     "order": "asc",
  //     "groups": ["multiline", "unknown", "shorthand"]
  //   }
  // ],
  "perfectionist/sort-maps": [
    "error",
    {
      type: "natural",
      order: "asc",
    },
  ],
  "perfectionist/sort-named-exports": [
    "error",
    {
      type: "natural",
      order: "asc",
    },
  ],
  "perfectionist/sort-named-imports": [
    "error",
    {
      type: "natural",
      order: "asc",
    },
  ],
  // "perfectionist/sort-objects": [
  //   "error",
  //   {
  //     "type": "natural",
  //     "order": "asc",
  //     "partition-by-comment": "Part:**",
  //     "groups": ["id", "unknown"],
  //     "custom-groups": {
  //       "id": "id"
  //     }
  //   }
  // ],
  "perfectionist/sort-object-types": [
    "error",
    {
      type: "natural",
      order: "asc",
      "always-on-top": ["id"],
    },
  ],
  "perfectionist/sort-union-types": [
    "error",
    {
      type: "natural",
      order: "asc",
    },
  ],
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:sonarjs/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "sonarjs", "perfectionist"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    ...perfectionistRules,
  },
};
