import { changeBreadcrumbs, getBreadcrumbsPath, updateItem, compareDates, handleScrollToTop } from './utils';
import {BreadcrumbsPath, BreadcrumbsValue, BreadcrumbsLabel} from '../const';
import {makeFakeCameras, makeFakeCamera} from './mocks';

describe('utils', () => {
  it('should change crumb name', () => {

    expect(changeBreadcrumbs(BreadcrumbsValue.Main)).toBe(BreadcrumbsLabel.Main);
    const productIdLink = '1';
    const productName = 'CameraPro';
    expect(changeBreadcrumbs(productIdLink, productName)).toBe('CameraPro');
  });

  it('should not change crumb name incorrectly', () => {
    const value = 'catalog';
    expect(changeBreadcrumbs(BreadcrumbsValue.Catalog)).not.toBe(value);
    const productIdLink = '1';
    const productName = 'CameraPro';
    expect(changeBreadcrumbs(productIdLink, productName)).not.toBe(productIdLink);
  });

  it('should get path for crumb', () => {
    expect(getBreadcrumbsPath(BreadcrumbsValue.Main)).toBe(BreadcrumbsPath.Main);
    expect(getBreadcrumbsPath(BreadcrumbsValue.Catalog)).toBe(BreadcrumbsPath.Catalog);
  });

  it('should update array', () => {
    const fakeCameras = makeFakeCameras();
    const fakeCamera = makeFakeCamera();
    const updatedCameras = updateItem(fakeCameras, fakeCamera);
    expect(updatedCameras).toContain(fakeCamera);
  });

  it('should sort reviews by dates in descending order', () => {
    const fakeReviews = [
      {id: '', userName: '', advantage: '', disadvantage: '', review: '', rating: 1,
        createAt: '2022-07-09T13:24:57.980Z',
        cameraId: 1,},
      {id: '', userName: '', advantage: '', disadvantage: '', review: '', rating: 3,
        createAt: '2015-03-04T00:00:00.000Z',
        cameraId: 2,},
      {id: '', userName: '', advantage: '', disadvantage: '', review: '', rating: 2,
        createAt: '2019-11-03T05:00:00.000Z',
        cameraId: 3,},
    ];

    const updatedFakeReviews = [
      {id: '', userName: '', advantage: '', disadvantage: '', review: '', rating: 1,
        createAt: '2022-07-09T13:24:57.980Z',
        cameraId: 1,},
      {id: '', userName: '', advantage: '', disadvantage: '', review: '', rating: 2,
        createAt: '2019-11-03T05:00:00.000Z',
        cameraId: 3,},
      {id: '', userName: '', advantage: '', disadvantage: '', review: '', rating: 3,
        createAt: '2015-03-04T00:00:00.000Z',
        cameraId: 2,},
    ];

    fakeReviews.sort(compareDates);

    expect(fakeReviews).toEqual(updatedFakeReviews);
  });

  it('should scroll to 0 smoothly when handleScrollToTop is called', () => {
    global.scrollTo = jest.fn();
    handleScrollToTop();
    expect(global.scrollTo).toHaveBeenCalledWith({ top: 0, behavior:
      'smooth'
    });
  });
});
