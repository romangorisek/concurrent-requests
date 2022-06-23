const { handleRequests } = require('./concurrentRequests');

describe('Test ratedHttpRequest:', () => {
  const mockSimpleNativeGetRequest = async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(url);
      }, 50);
    });
  };

  test('it gets results for all requests', async () => {
    expect.assertions(1);

    const res = await handleRequests([1, 2, 3, 4], 2, mockSimpleNativeGetRequest, new Set());
    console.log(res);
    expect(res).toEqual([1, 2, 3, 4]);
  });

  test('it does not go over the MAX_CONCURRENCY', async () => {
    expect.assertions(1);

    const mockSet = new Set();
    const promise = handleRequests([1, 2, 3, 4], 2, mockSimpleNativeGetRequest, mockSet);
    expect(mockSet.size).toEqual(2);
    await promise;
  });
});
