const path = require('node:path');
const fs = require('node:fs');
const { createGenerator } = require('ts-json-schema-generator');

const config = {
  path: path.resolve(
    __dirname,
    '../../node_modules/@types/webextension-polyfill/namespaces/declarativeNetRequest.d.ts',
  ),
  tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
  type: 'DeclarativeNetRequest.Rule',
};

const generator = createGenerator(config);
const schema = generator.createSchema(config.type);

const jsonSchemaString = JSON.stringify(schema, null, 2);

fs.writeFileSync(path.join(__dirname, 'DeclarativeNetRequest.Rule.json'), jsonSchemaString, 'utf8');
