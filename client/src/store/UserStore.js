import {makeAutoObservable} from "mobx";

export default class UserStore {
  constructor() {
    this._currentUser = null;
    makeAutoObservable(this);
  }

  setCurrentUser(user) {
    this._currentUser = user;
  }

  get currentUser() {
    return this._currentUser;
  }
}