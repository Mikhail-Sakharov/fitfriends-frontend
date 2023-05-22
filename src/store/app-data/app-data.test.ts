import {appData, setDataLoadedStatus} from './app-data';

describe('Reducer: appData', () => {
  type AppData = {
    dataLoadedStatus: boolean;
  };
  const initialState: AppData = {
    dataLoadedStatus: false,
  };
  const state = {
    dataLoadedStatus: true,
  };

  it('without additional parameters should return the initial state', () => {
    expect(appData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change dataLoadedStatus', () => {
    expect(appData.reducer(state, setDataLoadedStatus(true)))
      .toEqual(
        {
          dataLoadedStatus: true,
        }
      );
  });

  it('should switch "dataLoadedStatus" using booleans', () => {
    expect(appData.reducer(initialState, setDataLoadedStatus(true)))
      .toEqual({
        ...initialState,
        dataLoadedStatus: true
      });

    expect(appData.reducer(initialState, setDataLoadedStatus(false)))
      .toEqual({
        ...initialState,
        dataLoadedStatus: false
      });
  });
});
