/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override } = require('customize-cra');
const { alias, aliasJest, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json');
module.exports = override(useBabelRc(), alias(aliasMap));
module.exports.jest = aliasJest(aliasMap);
