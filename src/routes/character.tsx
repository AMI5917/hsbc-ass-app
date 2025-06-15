import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import { CharacterDetail } from '../components/CharacterDetail';

export const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetail,
});
