import { camerasProcess } from './cameras-process';
import { CamerasProcess } from '../../types/state';
import { fetchCameras, fetchSelectedProduct } from '../api-actions';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mocks';
import { ResponseStatus } from '../../const';
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
        isDataLoading: false,
        loadingStatus: ResponseStatus.Initial,
      });

  });
  it('should update isDataLoading by fetchCameras pending', () => {
    state = {
      cameras: [],
      isDataLoading: false,
      loadingStatus: ResponseStatus.Initial,
    };
    expect(camerasProcess.reducer(state, {type: fetchCameras.pending.type}))
      .toEqual({
        cameras: [],
        isDataLoading: true,
        loadingStatus: ResponseStatus.Initial,
      });
  });
  it('should update cameras and isDataLoading by fetchCameras fulfilled', () => {
    state = {
      cameras: [],
      isDataLoading: true,
      loadingStatus: ResponseStatus.Initial
    };
    expect(camerasProcess.reducer(state, {type: fetchCameras.fulfilled.type, payload: cameras}))
      .toEqual({
        cameras,
        isDataLoading: false,
        loadingStatus: ResponseStatus.Fulfilled,
      });
  });
  it('should update isDataLoading and loadingStatus by fetchCameras rejected', () => {
    state = {
      cameras: [],
      isDataLoading: true,
      loadingStatus: ResponseStatus.Initial,
    };
    expect(camerasProcess.reducer(state, {type: fetchCameras.rejected.type}))
      .toEqual({
        cameras: [],
        isDataLoading: false,
        loadingStatus: ResponseStatus.Rejected,
      });
  });
  it('should update isDataLoading by fetchSelectedProduct pending', () => {
    state = {
      cameras,
      isDataLoading: false,
      loadingStatus: ResponseStatus.Fulfilled};
    expect(camerasProcess.reducer(state, {type: fetchSelectedProduct.pending.type}))
      .toEqual({
        cameras,
        isDataLoading: true,
        loadingStatus: ResponseStatus.Fulfilled,
      });
  });
  it('should update cameras and isDataLoading by fetchSelectedProduct fulfilled', () => {
    state = {
      cameras,
      isDataLoading: true,
      loadingStatus: ResponseStatus.Fulfilled
    };


    expect(camerasProcess.reducer(state, {type: fetchSelectedProduct.fulfilled.type, payload: selectedProduct}))
      .toEqual({
        cameras: updatedCameras,
        isDataLoading: false,
        loadingStatus: ResponseStatus.Fulfilled
      });

  });
  it('should update isDataloading by fetchSelectedProduct rejected', () => {
    state = {
      cameras,
      isDataLoading: true,
      loadingStatus: ResponseStatus.Fulfilled,
    };
    expect(camerasProcess.reducer(state, {type: fetchSelectedProduct.rejected.type}))
      .toEqual({
        cameras,
        isDataLoading: false,
        loadingStatus: ResponseStatus.Fulfilled
      });
  });
});
