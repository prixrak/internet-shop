import {makeAutoObservable} from "mobx";

export default class BasketStore {
  constructor() {
    this._devices = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 1;
    makeAutoObservable(this);
  }

  setDevices(devices) {
    this._devices = devices;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }

 
  get devices() {
    return this._devices;
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}