import { hostingURL } from './appConfig';

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  if (typeof input === 'string' && input.includes('undefined')) return;
  const res = await fetch(hostingURL + input, init);
  return res.json();
}
