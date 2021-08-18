import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequests = useCallback(async (configData, responseData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configData.url, {
        method: configData.method ? configData.method : "GET",
        headers: configData.headers ? configData.headers : {},
        body: configData.body ? JSON.stringify(configData.body) : null,

      });
      if (!response.ok) {
        throw new Error("Response issue. Please try again later");
      }
      const data = await response.json();
      responseData(data);
    } catch (error) {
      setError(error.message || "Something went wrong.!");
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequests };
};

export default useHttp;
