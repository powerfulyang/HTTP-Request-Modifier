import { loader, Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import schema from '@/schemas/DeclarativeNetRequest.Rule.json';

export const modelUri = monaco.Uri.parse('rule.json');
export const example = {
  id: 1,
  action: {
    type: 'modifyHeaders',
    responseHeaders: [
      {
        header: 'Access-Control-Allow-Origin',
        operation: 'set',
        value: '*',
      },
    ],
  },
  condition: {
    urlFilter: 'https://example.com/url',
  },
};

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas: [
    {
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [modelUri.toString()],
      schema,
    },
  ],
});

loader.config({
  monaco,
});

export default Editor;
