export class DataElasticHitResDto<T> {
  constructor(_source: T) {
    this._source = _source;
  }
  _source: T;
}
