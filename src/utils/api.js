const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "POST}",
    headers: {
      "Content-Type": "application / json",
    },
  }).then(handleServerResponse);
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application / json",
    },
  }).then(handleServerResponse);
}

export { getItems, addItems, deleteItems };
