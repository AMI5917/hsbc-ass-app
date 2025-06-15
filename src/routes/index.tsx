import { rootRoute } from './root';
import { charactersRoute } from './characters';
import { characterRoute } from './character';
import { createRouter } from '@tanstack/react-router';

export const routeTree = rootRoute.addChildren([
  charactersRoute,
  characterRoute,
]);

export const router = createRouter({ routeTree });
