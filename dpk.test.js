const { createHash } = require("crypto");

const { deterministicPartitionKey } = require("./dpk");

jest.mock('crypto', () => ({
  createHash: jest.fn(),
}));

const mockDigest = jest.fn();

describe("deterministicPartitionKey", () => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  beforeEach(() => {
    (createHash).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: mockDigest,
    });
    // leaving this in submission.. but unable to test this part
  });

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the partitionKey value in event obj passed as param", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "abc"});
    expect(trivialKey).toBe("abc");
    
  })
  it("Returns key when given empty obj as input", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  })
  it("Returns key with valid obj as input", () => {
    const trivialKey = deterministicPartitionKey({ test : "abc"});
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
    // expect(createHash).toHavebeenCalled();
  })

  it("returns key with string as input", () => {
    const trivialKey = deterministicPartitionKey("abc");
    // expect(createHash).toHavebeenCalled();
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  })

  it("returns key with number as input", () => {
    const trivialKey = deterministicPartitionKey(891);
    // expect(createHash).toHavebeenCalled();
    expect(trivialKey.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  })

});
