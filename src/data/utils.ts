// Helper to wrap a promise and throw promises to suspense when read
export function wrapPromise(promise: Promise<any>) {
  let status = "pending";
  let response: string;

  const suspender = promise.then(
    (res: string) => {
      status = "success";
      response = res;
    },
    (err: string) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}
