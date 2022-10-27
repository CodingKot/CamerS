import { CouponType } from '../const';

export type OrderPost = {
  camerasIds: number[];
  coupon: CouponType | null;

}
