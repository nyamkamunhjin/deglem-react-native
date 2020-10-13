export default async (promise) => {
  const resolved = {
    data: null,
    err: null,
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    resolved.err = e;
  }

  return resolved;
};
