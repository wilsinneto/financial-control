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
