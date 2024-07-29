import {
  RenderOptions,
  queries,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { ReactElement } from 'react';

const allQueries = { ...queries };
const customScreen = within(document.body, allQueries);
const customWithin = (element: HTMLElement) => within(element, allQueries);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { queries: allQueries, ...options });
const customWaitFor = waitFor;

export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { MemoryRouter } from 'react-router-dom';
export * from 'vitest';
export {
  customRender as render,
  customScreen as screen,
  customWaitFor as waitFor,
  customWithin as within,
};
export async function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
