import { useEffect, useState } from "react";

interface State<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}

const useFetch = <T>(path: string): State<T> => {
  const apiServer = import.meta.env.VITE_SERVER_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    setLoading(true);

    (async () => {
      try {
        const response = await fetch(`${apiServer}${path}`, requestOptions);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiKey, apiServer, path]);

  return { data, loading, error };
};

export { useFetch };
