import { delay, HttpResponseResolver } from 'msw';

export function withStatus(resolver: HttpResponseResolver): HttpResponseResolver {
  return async request => {
    await delay(250);
    return resolver(request);
  };
}
