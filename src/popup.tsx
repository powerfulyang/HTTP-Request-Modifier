import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import browser from 'webextension-polyfill';
import { URLParameters } from '@/components/URL-parameters';
import { queryClient } from '@/utils';
import './styles/base.scss';

browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  const root = document.getElementById('root');
  const tab = tabs[0];
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <URLParameters url={tab.url} />
        </QueryClientProvider>
      </StrictMode>,
    );
  }
});
