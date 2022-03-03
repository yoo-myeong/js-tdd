class StubProductClient {
  async fetchItems() {
    return [
      { item: "milk", available: true },
      { item: "banana", available: false },
    ];
  }
}

module.exports = StubProductClient;
