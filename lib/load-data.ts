import {getResource} from "next-drupal";

export async function loadNodes(nodes) {
  return Promise.all(nodes.map(async (node) => {
    node = await getResource(node.type, node.id, {
      params: {
        'include': "field_image.field_media_image, field_tags, field_techno"
      },
    });
    return node;
  })).then((contents) => {
    return contents
  });
}

export async function sendSearchRequestToApi(filters, indexName) {
  let params = {
    'filter': {}
  };
  for (const filterName in filters) {
    let filterValue = filters[filterName];
    if (filterValue) {
      if (Array.isArray(filterValue)) {
        filterValue = filterValue.join(';');
      }
      if (filterValue !== '') {
        params["filter"][filterName] = filterValue;
      }
    }
  }

  return await fetch("/api/search/"+indexName, {
    method: "POST",
    body: JSON.stringify({
      deserialize: false,
      params,
    }),
  })
}