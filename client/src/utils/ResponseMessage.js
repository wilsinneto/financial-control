exports.captureHttpStatusCode = (status) => status.match(/(\d+)/);

exports.getMessage = (status) => 
  ({
    401: "User not found",
    403: "Senha inválida.",
    404: "Item não encontrado.",
    409: "Item já existe.",
    500: "Error Interno",
  }[status] || "");
