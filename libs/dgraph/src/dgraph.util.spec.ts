import { getOrCreateDgraphInstance, makeDefaultOptions } from "./dgraph.util";

import { DgraphClient } from "dgraph-js";

describe("DgraphUtil", () => {
  it("getOrCreateDgraphInstance should be instance of a dgraph", () => {
    expect(
      getOrCreateDgraphInstance({
        stubs: [{}],
      }).client
    ).toBeInstanceOf(DgraphClient);
  });

  it("getOrCreateDgraphInstance should be instance of the same dgraph", () => {
    expect(
      getOrCreateDgraphInstance({
        stubs: [{}],
      }).client
    ).toBeInstanceOf(DgraphClient);
  });

  it("getOrCreateDgraphInstance should be instance of a dgraph with debug true", () => {
    expect(
      getOrCreateDgraphInstance(
        {
          debug: true,
          stubs: [{}],
        },
        true
      ).client
    ).toBeInstanceOf(DgraphClient);
  });

  it("makeDefaultOptions should be equal to an option", () => {
    expect(
      makeDefaultOptions({
        stubs: [{}],
      })
    ).toEqual({
      stubs: [{}],
    });
  });

  it("makeDefaultOptions should be equal to an option with option undefined", () => {
    expect(makeDefaultOptions()).toEqual({ stubs: [] });
  });
});
