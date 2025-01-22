import { model } from '@medusajs/framework/utils';

const Point = model.define('point', {
  id: model.id(),
  name: model.text(),
  latitude: model.float(),
  longitude: model.float(),
});

export default Point;
