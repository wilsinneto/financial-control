exports.headerGetOrDelete = (method) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'
  },
  mode: "cors",
  cache: "default",
});
exports.headerSave = (method, payload) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: "cors",
  body: JSON.stringify(payload),
});
exports.execute = async (url, header) => {
  try {
    const response = await fetch(url, header);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
