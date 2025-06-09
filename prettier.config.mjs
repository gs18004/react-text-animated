/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  arrowParens: 'always',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
