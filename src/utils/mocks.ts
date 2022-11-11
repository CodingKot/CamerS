import {Promo} from '../types/promo';
import { Camera, Cameras } from '../types/camera';
import { Review, Reviews } from '../types/review';
import { ReviewPost } from '../types/review-post';
import {name, internet, datatype} from 'faker';

export const makeFakePromo = (): Promo => ({
  id: datatype.number(100),
  name: name.title(),
  previewImg: internet.url(),
  previewImg2x: internet.url(),
  previewImgWebp: internet.url(),
  previewImgWebp2x: internet.url(),
} as Promo);

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(100),
  name: datatype.string(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  category: datatype.string(),
  description: datatype.string(),
  level: datatype.string(),
  rating: datatype.number(5),
  price: datatype.number(100000),
  previewImg: internet.url(),
  previewImg2x: internet.url(),
  previewImgWebp: internet.url(),
  previewImgWebp2x: internet.url(),
  reviewCount: datatype.number(100),
} as Camera);


export const makeFakeReview = (): Review => ({
  id: datatype.string(),
  userName: name.title(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number(5),
  createAt: datatype.string(),
  cameraId: datatype.number(100),
});

export const makeFakePostReview = (): ReviewPost => ({
  cameraId: datatype.number(100),
  userName: name.title(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number(100),
});


export const makeFakeCameras = (): Cameras => new Array(9).fill(null).map(() => makeFakeCamera());
export const makeFakeReviews = (): Reviews => new Array(9).fill(null).map(() => makeFakeReview());


