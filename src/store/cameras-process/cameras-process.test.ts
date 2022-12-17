import { camerasProcess } from './cameras-process';
import { CamerasProcess } from '../../types/state';
import { fetchCameras, fetchSelectedProduct, fetchSearchedCameras } from '../api-actions';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mocks';
import { CAMERAS_PER_PAGE, ResponseStatus } from '../../const';
import { updateItem } from '../../utils/utils';


const cameras = makeFakeCameras();
const selectedProduct = makeFakeCamera();
const updatedCameras = updateItem(cameras, selectedProduct);

describe('Reducer: camerasProcess', () => {
  let state: CamerasProcess;

  it('without additional parameters should return initial state', () => {
    expect(camerasProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cameras: [],
        pagesNumber: 0,
        searchedCameras: [],
        isDataLoading: false,
        loadingStatus: ResponseStatus.Initial,
      });

  });
  it('should update isDataLoading by fetchCameras pending', () => {
    state = {
      cameras: [],
      pagesNumber: 0,
      searchedCameras: [],
      isDataLoading: false,
      loadingStatus: ResponseStatus.Initial,
    };
    expect(camerasProcess.reducer(state, {type: fetchCameras.pending.type}))
      .toEqual({
        cameras: [],
        pagesNumber: 0,
        searchedCameras: [],
        isDataLoading: true,
        loadingStatus: ResponseStatus.Initial,
      });
  });
  it('should update cameras and isDataLoading by fetchCameras fulfilled', () => {
    state = {
      cameras: [],
      pagesNumber: 0,
      searchedCameras: [],
      isDataLoading: true,
      loadingStatus: ResponseStatus.Initial,
    };
    expect(camerasProcess.reducer(state, {type: fetchCameras.fulfilled.type, payload: cameras}))
      .toEqual({
        cameras,
        pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
        searchedCameras: [],
        isDataLoading: false,
        loadingStatus: ResponseStatus.Fulfilled,
      });
  });
  it('should update isDataLoading and loadingStatus by fetchCameras rejected', () => {
    state = {
      cameras: [],
      pagesNumber: 0,
      searchedCameras: [],
      isDataLoading: true,
      loadingStatus: ResponseStatus.Initial,

    };
    expect(camerasProcess.reducer(state, {type: fetchCameras.rejected.type}))
      .toEqual({
        cameras: [],
        pagesNumber: 0,
        searchedCameras: [],
        isDataLoading: false,
        loadingStatus: ResponseStatus.Rejected,
      });
  });
  it('should update isDataLoading by fetchSelectedProduct pending', () => {
    state = {
      cameras,
      pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
      searchedCameras: [],
      isDataLoading: false,
      loadingStatus: ResponseStatus.Fulfilled,

    };
    expect(camerasProcess.reducer(state, {type: fetchSelectedProduct.pending.type}))
      .toEqual({
        cameras,
        pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
        searchedCameras: [],
        isDataLoading: true,
        loadingStatus: ResponseStatus.Fulfilled,
      });
  });
  it('should update cameras and isDataLoading by fetchSelectedProduct fulfilled', () => {
    state = {
      cameras,
      pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
      searchedCameras: [],
      isDataLoading: true,
      loadingStatus: ResponseStatus.Fulfilled,
    };


    expect(camerasProcess.reducer(state, {type: fetchSelectedProduct.fulfilled.type, payload: selectedProduct}))
      .toEqual({
        cameras: updatedCameras,
        pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
        searchedCameras: [],
        isDataLoading: false,
        loadingStatus: ResponseStatus.Fulfilled,
      });

  });
  it('should update isDataloading by fetchSelectedProduct rejected', () => {
    state = {
      cameras,
      pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
      searchedCameras: [],
      isDataLoading: true,
      loadingStatus: ResponseStatus.Fulfilled,

    };
    expect(camerasProcess.reducer(state, {type: fetchSelectedProduct.rejected.type}))
      .toEqual({
        cameras,
        pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
        searchedCameras: [],
        isDataLoading: false,
        loadingStatus: ResponseStatus.Fulfilled,
      });
  });

  it('should update searchedCameras by fetchSearchedCameras fulfilled', () => {
    state = {
      cameras,
      pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
      searchedCameras: [],
      isDataLoading: true,
      loadingStatus: ResponseStatus.Fulfilled,
    };
    expect(camerasProcess.reducer(state, {type: fetchSearchedCameras.fulfilled.type, payload: cameras}))
      .toEqual({
        cameras,
        pagesNumber: Math.ceil(cameras.length / CAMERAS_PER_PAGE),
        searchedCameras: cameras,
        isDataLoading: true,
        loadingStatus: ResponseStatus.Fulfilled,
      });
  });
});
