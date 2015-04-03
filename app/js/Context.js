'use strict';
import { Context } from 'material-flux';
import Actions from './actions/Actions';

export default class AppContext extends Context {

  constructor() {
    super();
    this.appAction = new Actions(this);
    //this.productsStore = new ProductStore(this);
    //this.cartStore = new CartStore(this);
  }

}
