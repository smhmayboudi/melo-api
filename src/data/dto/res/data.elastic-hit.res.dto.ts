export class DataElasticHitResDto<T> {
  constructor(_source: T) {
    this._source = _source;
  }
  readonly _source: T;
}
