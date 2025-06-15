import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { router } from './routes'; 

const queryClient = new QueryClient();

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('#app not found');

const root = createRoot(rootElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
