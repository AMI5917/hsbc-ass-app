import { createRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { rootRoute } from './root';
import { CharacterList } from '../components/CharacterList';

export const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterList,
  validateSearch: z.object({
    page: z.coerce.number().optional().default(1),
  }),
});

