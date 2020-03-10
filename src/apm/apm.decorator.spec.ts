import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import {
  ApmCurrentSpan,
  ApmCurrentTraceparent,
  ApmCurrentTransaction
} from "./apm.decorator";
import { Span, Transaction } from "./apm.module.interface";

describe("ApmDecorator", () => {
  it("ApmCurrentSpan enhance component with apm current span", () => {
    class Test {
      test(@ApmCurrentSpan() _span: Span | null) {
        // NOTHING
      }
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory()).toEqual(null);
  });

  it("ApmCurrentTraceparent enhance component with apm current traceparent", () => {
    class Test {
      test(@ApmCurrentTraceparent() _traceparent: string) {
        // NOTHING
      }
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory()).toEqual(null);
  });

  it("ApmCurrentTransaction enhance component with apm current transaction", () => {
    class Test {
      test(@ApmCurrentTransaction() _transaction: Transaction) {
        // NOTHING
      }
    }
    const metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, "test");
    const key = Object.keys(metadata)[0];
    expect(metadata[key].factory()).toEqual(null);
  });

  it.todo("ApmAfterMethod enhance instance with apm");
  it.todo("ApmBeforeMethod enhance method with apm");
});
