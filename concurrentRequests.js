const handleRequests = async (urls, maxConcurrency, simpleNativeGetRequest, pendingPromises) => {
  const tasks = urls.map((url) => {
    return ratedHttpRequest(url, maxConcurrency, simpleNativeGetRequest, pendingPromises);
  });
  const results = await Promise.allSettled(tasks);
  return results.map(r => r.value);
};

const ratedHttpRequest = async (url, maxConcurrency, simpleNativeGetRequest, pendingPromises) => {
  while (pendingPromises.size >= maxConcurrency) {
    await Promise.race(pendingPromises);
  }

  const promise = simpleNativeGetRequest(url);
  pendingPromises.add(promise);
  const res = await promise;
  pendingPromises.delete(promise);
  return res;
};

exports.handleRequests = handleRequests;
