import { stringify } from "qs";

import { getAuthenticationToken, unsetAuthenticationToken } from "./token";

const DOMAIN = process.env.REACT_APP_BACK_URL as string;

function hasJsonContent(response: Response) {
  const contentType = response.headers.get("Content-Type");
  return contentType ? /^application\/json/i.test(contentType) : false;
}

const formatURL = (
  domain: string,
  path: string,
  qs?: Record<string, unknown>
) => {
  if (!qs || Object.keys(qs).length === 0) return `${domain}${path}`;
  return `${domain}${path}?${stringify(qs)}`;
};

const request = async (req: Request): Promise<unknown> => {
  const token = getAuthenticationToken();

  if (token) req.headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(req);

  if (!response.ok) {
    if (response.status === 403) {
      unsetAuthenticationToken();
    }
    throw response.body && hasJsonContent(response)
      ? await response.json()
      : await response.text();
  }

  return response.body && hasJsonContent(response)
    ? response.json()
    : undefined;
};

export const get = async (
  path: string,
  qs?: Record<string, unknown>
): Promise<unknown> =>
  request(
    new Request(formatURL(DOMAIN, path, qs), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const post = (path: string, body?: unknown): Promise<unknown> =>
  request(
    new Request(formatURL(DOMAIN, path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );

export const put = (path: string, body?: unknown): Promise<unknown> =>
  request(
    new Request(formatURL(DOMAIN, path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );

export const del = async (
  path: string,
  qs?: Record<string, unknown>
): Promise<unknown> =>
  request(
    new Request(formatURL(DOMAIN, path, qs), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

export const delWithBody = (path: string, body?: unknown): Promise<unknown> =>
  request(
    new Request(formatURL(DOMAIN, path), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );
