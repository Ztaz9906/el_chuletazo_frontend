import client from "./axios";

const customFetchBase = async ({
  //usando la libreria de Axios, hace las peticiones
  url,
  method,
  body,
  params,
  responseType = "json",
}) => {
  try {
    const responseConfig = { url, method, data: body, params, responseType };

    const result = await client(responseConfig);

    // Si el responseType es 'blob', se devolverá directamente la data
    // Si no, se seguirá devolviendo result.data (que asumimos es un objeto JSON)
    return { data: responseType === "blob" ? result : result.data };
  } catch (error) {
    // Usar el mensaje y status procesados por el interceptor
    return {
      error: {
        status: error.status || 500,
        data: error.message,
      },
    };
  }
};

export default customFetchBase;
