import {makeAutoObservable} from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [
      {id: 1, name: 'Холодильники'},
      {id: 2, name: 'Смартфони'},
      {id: 3, name: 'Ноутбуки'},
      {id: 4, name: 'Телевізори'}

    ]
    this._brands = [
      {id: 1, name: 'Samsung'},
      {id: 2, name: 'Apple'},
      {id: 3, name: 'Asus'},
      {id: 4, name: 'Lenovo'},
    ]
    this._devices = [
      {id: 1, name: 'Ipone 12 PRO', price: 25000, rating: 5, img: 'https://www.meme-arsenal.com/memes/74da4266f0b98a04fa1e9ec32dac5016.jpg'},
      {id: 2, name: 'Ipone 12 PRO', price: 25000, rating: 5, img: 'https://www.meme-arsenal.com/memes/74da4266f0b98a04fa1e9ec32dac5016.jpg'},
      {id: 3, name: 'Ipone 12 PRO', price: 25000, rating: 5, img: 'https://www.meme-arsenal.com/memes/74da4266f0b98a04fa1e9ec32dac5016.jpg'},
      {id: 4, name: 'Ipone 12 PRO', price: 25000, rating: 5, img: 'https://www.meme-arsenal.com/memes/74da4266f0b98a04fa1e9ec32dac5016.jpg'},
      {id: 5, name: 'Ipone 12 PRO', price: 25000, rating: 5, img: 'https://www.meme-arsenal.com/memes/74da4266f0b98a04fa1e9ec32dac5016.jpg'}
    ]
    this._selectedType = {};
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setSelectedType(type) {
    this._selectedType = type;
  } 
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}