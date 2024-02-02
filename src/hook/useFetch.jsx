const useHttp = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });
      if (!response.ok) {
        throw new Error(`error ${response.url}, status ${response.status}`);
      }
      const data = response.json();
      return data;
    } catch (e) {}
  };
  return { request };
};

export default useHttp;
