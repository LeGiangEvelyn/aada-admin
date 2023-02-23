import { stringify } from "query-string";
import { fetchUtils, DataProvider } from "ra-core";
import { apiUrl, headers } from "./model/AppConfig";

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 *
 * @example
 *
 * getList          => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * getOne           => GET http://my.api.url/posts/123
 * getManyReference => GET http://my.api.url/posts?author_id=345
 * getMany          => GET http://my.api.url/posts?id=123&id=456&id=789
 * create           => POST http://my.api.url/posts/123
 * update           => PUT http://my.api.url/posts/123
 * updateMany       => PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
 * delete           => DELETE http://my.api.url/posts/123
 *
 * export default App;
 */

export default (httpClient = fetchUtils.fetchJson): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      page: page - 1,
      perPage: perPage,
      sort: field,
      order: order,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url,
      {
        method: "GET",
        headers: headers,
      },
    ).then(({ json }) => {
      if (!json["total"]) {
        throw new Error(
          "The total is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination."
        );
      }
      return {
        data: json.data,
        total: json.total,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json.data,
    })),

  getMany: (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json.data }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      sort: field,
      order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      if (!json["total"]) {
        throw new Error(
          "The total is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination."
        );
      }
      return {
        data: json.data,
        total: json.total,
      };
    });
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: headers,
    }).then(({ json }) => ({ data: json.data }))
      .catch((error) => Promise.reject(error)),

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
          headers: headers,
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: headers,
    }).then(({ json }) => ({ data: { ...params.data, id: json.id } }))
      .catch((error) => Promise.reject(error)),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      headers: headers,
    })
      .then(({ json }) => ({ data: json.status }))
      .catch((error) => Promise.reject(error)),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
          headers: headers,
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),
});
