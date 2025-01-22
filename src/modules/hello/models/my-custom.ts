import { model } from '@medusajs/framework/utils';

// START --------------- many-to-many with custom example --------------- https://docs.medusajs.com/learn/fundamentals/data-models/relationships#many-to-many-with-custom-columns
// each should be exported
const Order = model.define('order_test', {
  id: model.id().primaryKey(),
  products: model.manyToMany(() => Product, {
    pivotEntity: () => OrderProduct,
  }),
});

const Product = model.define('product_test', {
  id: model.id().primaryKey(),
  orders: model.manyToMany(() => Order),
});

const OrderProduct = model.define('orders_products', {
  id: model.id().primaryKey(),
  order: model.belongsTo(() => Order, {
    mappedBy: 'products',
  }),
  product: model.belongsTo(() => Product, {
    mappedBy: 'orders',
  }),
  metadata: model.json().nullable(),
});

// END --------------- many-to-many with custom example ---------------

const MyCustom = model.define('my-custom', {
  id: model.id().primaryKey(),
  name: model.text(),
});

// Just for example of showing one-to-one relationship
const User = model.define('user', {
  id: model.id().primaryKey(),
  email: model.hasOne(() => Email),
});

const Email = model.define('email', {
  id: model.id().primaryKey(),
  user: model.belongsTo(() => User, {
    mappedBy: 'email',
  }),
});
// ---------------

export default MyCustom;
