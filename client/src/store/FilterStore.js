import { makeAutoObservable } from 'mobx';

export default class FilterStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._searchQuery = '';
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setSelectedType(type) {
    this._selectedType = type;
  } 
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  setSearchQuery (searchQuery) {
    this._searchQuery = searchQuery;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get searchQuery() {
    return this._searchQuery;
  }
}