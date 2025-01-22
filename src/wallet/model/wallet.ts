import { model } from '@medusajs/framework/utils';

const Wallet = model.define('wallet', {
  id: model.id().primaryKey(),
  balance: model.float(), // Store balance as float since decimal is not available
  currency: model.text(), // Currency code (e.g. USD, EUR)
  owner_id: model.text(), // Reference to owner (e.g. customer ID)
  metadata: model.json().nullable(), // Optional metadata
  owner_name: model.text().searchable(),
});

export default Wallet;
