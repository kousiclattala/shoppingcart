export const fetchGET = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    const resjson = await res.json();

    return resjson;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
