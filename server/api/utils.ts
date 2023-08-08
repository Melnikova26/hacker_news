import { AxiosResponse } from "axios";

export const isResponseSuccess = (response: AxiosResponse): boolean => {
  return response.status == 200 && response.data;
};

export const concurencyBalancer = async <T>(
  concurrencyLimit: number = 50,
  listOfArguments: number[],
  asyncOperation: (storyID: number) => Promise<T | null>
): Promise<T[]> => {
  const emptyArray: { value: number; index: number }[] = [];
  const argsCopy = emptyArray.concat(
    listOfArguments.map((value, index) => ({ value, index }))
  );
  const result = new Array(listOfArguments.length);
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());

  function chainNext(p: Promise<unknown>): Promise<unknown> {
    if (argsCopy.length) {
      const arg = argsCopy.shift();
      return p.then(() => {
        // Store the result into the array upon Promise completion
        if (!arg) {
          return;
        }
        const operationPromise = asyncOperation(arg.value).then((r) => {
          result[arg.index] = r;
        });
        return chainNext(operationPromise);
      });
    }
    return p;
  }

  await Promise.all(promises.map(chainNext));

  return result;
};
