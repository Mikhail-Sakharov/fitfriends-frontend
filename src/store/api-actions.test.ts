import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {State} from '../types/state';
import {APIRoute, FF_DIARY_URL, FF_NOTIFIER_URL, FF_SERVICE_URL, FF_USERS_URL} from '../const';
import {
  addFriendAction,
  addGymToFavoritesAction,
  buyGymMembershipAction,
  buyTrainingAction,
  changeTrainingRequestStatusAction,
  checkSubscriptionStatusAction,
  createFoodDiaryAction,
  createReviewAction,
  createTrainingAction,
  createTrainingDiaryAction,
  decrementTrainingAction,
  deleteCertificateAction,
  deleteNotificationAction,
  fetchFoodDiariesAction,
  fetchGymInfoAction,
  fetchGymsCatalogAction,
  fetchIncomingUserRequestsForTraining,
  fetchMyFavoriteGymsAction,
  fetchMyFriendsAction,
  fetchMyOrdersAction,
  fetchMyPurchasesAction,
  fetchMyTrainingsAction,
  fetchNotificationsAction,
  fetchOutgoingUserRequestsForTraining,
  fetchRecommendedTrainingsAction,
  fetchReviewsAction,
  fetchTrainingCatalogAction,
  fetchTrainingDiariesAction,
  fetchTrainingInfoAction,
  fetchTrainingsAction,
  fetchUserInfoAction,
  fetchUsersCatalogAction,
  removeFriendAction,
  removeGymFromFavoritesAction,
  sendTrainingRequestAction,
  toggleSubscriberStatusAction,
  updateFoodDiaryAction,
  updateUserAction,
  uploadAvatarAction,
  uploadCertificateAction
} from './api-actions';
import {api} from '.';
import {UserRequestType} from '../types/user-request-type.enum';
import {Status} from '../types/status.enum';
import CreateOrderDto from '../types/create-order.dto';
import {CreateReviewDto} from '../types/create-review.dto';
import {CreateGymOrderDto} from '../types/create-gym-order.dto';
import {CreateFoodDiaryDto} from '../types/create-food-diary.dto';
import {CreateTrainingsDiaryDto} from '../types/create-trainings-diary.dto';
import UpdateUserDto from '../types/update-user.dto';

type TrainingRequestDto = {
  type: UserRequestType;
  userId: string;
};

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument([api, api])];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('fetchMyFriendsAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_USERS_URL}${APIRoute.Friends}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMyFriendsAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyFriendsAction.pending.type,
      fetchMyFriendsAction.fulfilled.type
    ]);
  });

  it('fetchIncomingUserRequestsForTraining', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_NOTIFIER_URL}${APIRoute.UserIncomingRequests}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchIncomingUserRequestsForTraining() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchIncomingUserRequestsForTraining.pending.type,
      fetchIncomingUserRequestsForTraining.fulfilled.type
    ]);
  });

  it('fetchOutgoingUserRequestsForTraining', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_NOTIFIER_URL}${APIRoute.UserOutgoingRequests}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOutgoingUserRequestsForTraining() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOutgoingUserRequestsForTraining.pending.type,
      fetchOutgoingUserRequestsForTraining.fulfilled.type
    ]);
  });

  it('sendTrainingRequestAction', async () => {
    const store = mockStore();
    const dto = {} as TrainingRequestDto;
    mockAPI
      .onPost(`${FF_NOTIFIER_URL}${APIRoute.UserRequests}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendTrainingRequestAction(dto) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendTrainingRequestAction.pending.type,
      sendTrainingRequestAction.fulfilled.type
    ]);
  });

  it('changeTrainingRequestStatusAction', async () => {
    const store = mockStore();
    const requestId = '';
    mockAPI
      .onPatch(`${FF_NOTIFIER_URL}${APIRoute.UserRequests}/${requestId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(changeTrainingRequestStatusAction({
      trainingRequestStatus: Status.Accepted,
      requestId
    }) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeTrainingRequestStatusAction.pending.type,
      changeTrainingRequestStatusAction.fulfilled.type
    ]);
  });

  it('fetchNotificationsAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_NOTIFIER_URL}${APIRoute.Notifications}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNotificationsAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNotificationsAction.pending.type,
      fetchNotificationsAction.fulfilled.type
    ]);
  });

  it('deleteNotificationAction', async () => {
    const store = mockStore();
    const notificationId = '';
    mockAPI
      .onDelete(`${FF_NOTIFIER_URL}${APIRoute.Notifications}/${notificationId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(deleteNotificationAction(notificationId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      deleteNotificationAction.pending.type,
      deleteNotificationAction.fulfilled.type
    ]);
  });

  it('fetchGymsCatalogAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.Gyms}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGymsCatalogAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchGymsCatalogAction.pending.type,
      fetchGymsCatalogAction.fulfilled.type
    ]);
  });

  it('fetchMyFavoriteGymsAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.FavoriteGyms}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMyFavoriteGymsAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyFavoriteGymsAction.pending.type,
      fetchMyFavoriteGymsAction.fulfilled.type
    ]);
  });

  it('addGymToFavoritesAction', async () => {
    const store = mockStore();
    const gymId = '';
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.AddGymToFavorites}/${gymId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addGymToFavoritesAction(gymId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addGymToFavoritesAction.pending.type,
      addGymToFavoritesAction.fulfilled.type
    ]);
  });

  it('removeGymFromFavoritesAction', async () => {
    const store = mockStore();
    const gymId = '';
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.RemoveGymFromFavorites}/${gymId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(removeGymFromFavoritesAction(gymId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      removeGymFromFavoritesAction.pending.type,
      removeGymFromFavoritesAction.fulfilled.type
    ]);
  });

  it('fetchGymInfoAction', async () => {
    const store = mockStore();
    const gymId = '';
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.Gyms}/${gymId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGymInfoAction(gymId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchGymInfoAction.pending.type,
      fetchGymInfoAction.fulfilled.type
    ]);
  });

  it('fetchMyPurchasesAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.Purchases}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMyPurchasesAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyPurchasesAction.pending.type,
      fetchMyPurchasesAction.fulfilled.type
    ]);
  });

  it('fetchTrainingCatalogAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.TrainingCatalog}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchTrainingCatalogAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchTrainingCatalogAction.pending.type,
      fetchTrainingCatalogAction.fulfilled.type
    ]);
  });

  it('fetchRecommendedTrainingsAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.RecommendedTrainings}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchRecommendedTrainingsAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchRecommendedTrainingsAction.pending.type,
      fetchRecommendedTrainingsAction.fulfilled.type
    ]);
  });

  it('fetchUsersCatalogAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_USERS_URL}${APIRoute.Users}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUsersCatalogAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    console.log(actions);

    expect(actions).toEqual([
      fetchUsersCatalogAction.pending.type,
      fetchUsersCatalogAction.fulfilled.type
    ]);
  });

  it('removeFriendAction', async () => {
    const store = mockStore();
    const friendId = '';
    mockAPI
      .onGet(`${FF_USERS_URL}${APIRoute.RemoveFriend}/${friendId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(removeFriendAction(friendId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      removeFriendAction.pending.type,
      removeFriendAction.fulfilled.type
    ]);
  });

  it('addFriendAction', async () => {
    const store = mockStore();
    const friendId = '';
    mockAPI
      .onGet(`${FF_USERS_URL}${APIRoute.AddFriend}/${friendId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addFriendAction(friendId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addFriendAction.pending.type,
      addFriendAction.fulfilled.type
    ]);
  });

  it('toggleSubscriberStatusAction', async () => {
    const store = mockStore();
    const coachId = '';
    mockAPI
      .onGet(`${FF_NOTIFIER_URL}${APIRoute.Subscription}/${coachId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(toggleSubscriberStatusAction(coachId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      toggleSubscriberStatusAction.pending.type,
      toggleSubscriberStatusAction.fulfilled.type
    ]);
  });

  it('checkSubscriptionStatusAction', async () => {
    const store = mockStore();
    const coachId = '';
    mockAPI
      .onGet(`${FF_NOTIFIER_URL}${APIRoute.SubscriptionStatus}/${coachId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkSubscriptionStatusAction(coachId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkSubscriptionStatusAction.pending.type,
      checkSubscriptionStatusAction.fulfilled.type
    ]);
  });

  it('buyTrainingAction', async () => {
    const store = mockStore();
    const dto = {} as CreateOrderDto;
    mockAPI
      .onPost(`${FF_SERVICE_URL}${APIRoute.Orders}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(buyTrainingAction(dto) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      buyTrainingAction.pending.type,
      buyTrainingAction.fulfilled.type
    ]);
  });

  it('fetchReviewsAction', async () => {
    const store = mockStore();
    const trainingId = '';
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.Reviews}/${trainingId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsAction(trainingId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('createReviewAction', async () => {
    const store = mockStore();
    const dto = {trainingId: ''} as CreateReviewDto;
    mockAPI
      .onPost(`${FF_SERVICE_URL}${APIRoute.Reviews}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(createReviewAction(dto) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createReviewAction.pending.type,
      createReviewAction.fulfilled.type
    ]);
  });

  it('decrementTrainingAction', async () => {
    const store = mockStore();
    const trainingId = '';
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.DecrementTraining}/${trainingId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(decrementTrainingAction(trainingId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      decrementTrainingAction.pending.type,
      decrementTrainingAction.fulfilled.type
    ]);
  });

  it('buyGymMembershipAction', async () => {
    const store = mockStore();
    const dto = {} as CreateGymOrderDto;
    mockAPI
      .onPost(`${FF_SERVICE_URL}${APIRoute.OrdersGyms}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(buyGymMembershipAction(dto) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      buyGymMembershipAction.pending.type,
      buyGymMembershipAction.fulfilled.type
    ]);
  });

  it('createFoodDiaryAction', async () => {
    const store = mockStore();
    const dto = {} as CreateFoodDiaryDto;
    mockAPI
      .onPost(`${FF_DIARY_URL}${APIRoute.FoodDiary}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(createFoodDiaryAction(dto) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createFoodDiaryAction.pending.type,
      createFoodDiaryAction.fulfilled.type
    ]);
  });

  it('updateFoodDiaryAction', async () => {
    const store = mockStore();
    const updateFoodDiaryDtoId = '';
    mockAPI
      .onPatch(`${FF_DIARY_URL}${APIRoute.FoodDiary}/${updateFoodDiaryDtoId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(updateFoodDiaryAction({id: updateFoodDiaryDtoId}) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      updateFoodDiaryAction.pending.type,
      updateFoodDiaryAction.fulfilled.type
    ]);
  });

  it('fetchFoodDiariesAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_DIARY_URL}${APIRoute.FoodDiary}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFoodDiariesAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFoodDiariesAction.pending.type,
      fetchFoodDiariesAction.fulfilled.type
    ]);
  });

  it('createTrainingDiaryAction', async () => {
    const store = mockStore();
    const dto = {} as CreateTrainingsDiaryDto;
    mockAPI
      .onPost(`${FF_DIARY_URL}${APIRoute.TrainingsDiary}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(createTrainingDiaryAction(dto) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createTrainingDiaryAction.pending.type,
      createTrainingDiaryAction.fulfilled.type
    ]);
  });

  it('fetchTrainingDiariesAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_DIARY_URL}${APIRoute.TrainingsDiary}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchTrainingDiariesAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchTrainingDiariesAction.pending.type,
      fetchTrainingDiariesAction.fulfilled.type
    ]);
  });

  it('uploadCertificateAction', async () => {
    const store = mockStore();
    const formData = {} as FormData;
    mockAPI
      .onPost(`${FF_USERS_URL}${APIRoute.Certificate}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(uploadCertificateAction(formData) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      uploadCertificateAction.pending.type,
      uploadCertificateAction.fulfilled.type
    ]);
  });

  it('deleteCertificateAction', async () => {
    const store = mockStore();
    const certificateUrl = '';
    mockAPI
      .onGet(`${FF_USERS_URL}${APIRoute.DeleteCertificate}?certificateUrl=${certificateUrl}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(deleteCertificateAction(certificateUrl) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      deleteCertificateAction.pending.type,
      deleteCertificateAction.fulfilled.type
    ]);
  });

  it('uploadAvatarAction', async () => {
    const store = mockStore();
    const formData = {} as FormData;
    mockAPI
      .onPost(`${FF_USERS_URL}${APIRoute.Avatar}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(uploadAvatarAction(formData) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      uploadAvatarAction.pending.type,
      uploadAvatarAction.fulfilled.type
    ]);
  });

  it('updateUserAction', async () => {
    const store = mockStore();
    const dto = {} as UpdateUserDto;
    mockAPI
      .onPatch(`${FF_USERS_URL}${APIRoute.Users}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(updateUserAction(dto) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      updateUserAction.pending.type,
      updateUserAction.fulfilled.type
    ]);
  });

  it('createTrainingAction', async () => {
    const store = mockStore();
    const formData = {} as FormData;
    mockAPI
      .onPost(`${FF_SERVICE_URL}${APIRoute.Trainings}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(createTrainingAction(formData) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createTrainingAction.pending.type,
      createTrainingAction.fulfilled.type
    ]);
  });

  it('fetchMyTrainingsAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.Trainings}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMyTrainingsAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyTrainingsAction.pending.type,
      fetchMyTrainingsAction.fulfilled.type
    ]);
  });

  it('fetchTrainingsAction', async () => {
    const store = mockStore();
    const coachId = '';
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.TrainingsCoach}/${coachId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchTrainingsAction({coachId}) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchTrainingsAction.pending.type,
      fetchTrainingsAction.fulfilled.type
    ]);
  });

  it('fetchUserInfoAction', async () => {
    const store = mockStore();
    const userId = '';
    mockAPI
      .onGet(`${FF_USERS_URL}${APIRoute.Users}/${userId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchUserInfoAction(userId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUserInfoAction.pending.type,
      fetchUserInfoAction.fulfilled.type
    ]);
  });

  it('fetchTrainingInfoAction', async () => {
    const store = mockStore();
    const trainingId = '';
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.Trainings}/${trainingId}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchTrainingInfoAction(trainingId) as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchTrainingInfoAction.pending.type,
      fetchTrainingInfoAction.fulfilled.type
    ]);
  });

  it('fetchMyOrdersAction', async () => {
    const store = mockStore();
    mockAPI
      .onGet(`${FF_SERVICE_URL}${APIRoute.Orders}`)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMyOrdersAction() as unknown as Action<any>);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyOrdersAction.pending.type,
      fetchMyOrdersAction.fulfilled.type
    ]);
  });
});
