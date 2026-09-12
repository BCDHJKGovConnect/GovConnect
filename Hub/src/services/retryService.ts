export const retryRequest = async <T>(
  requestFunction: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {

  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {

    try {
      console.log(`Attempt ${attempt} of ${retries}`);

      const result = await requestFunction();

      console.log(`Request succeeded on attempt ${attempt}`);

      return result;

    } catch (error) {

      lastError = error;

      console.log(
        `Request failed on attempt ${attempt}`
      );

      if (attempt < retries) {
        console.log(
          `Retrying in ${delay / 1000} second(s)...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );
      }
    }
  }

  throw lastError;
};