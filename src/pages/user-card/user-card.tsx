import Header from '../../components/header/header';
import UserCardCoach from '../../components/user-card-coach/user-card-coach';
import UserCardUser from '../../components/user-card-user/user-card-user';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRole} from '../../types/user-role.enum';
import {User} from '../../types/user.interface';

function UserCard(): JSX.Element {
  // TODO: запрос юзера по id
  // TODO: запрос тренировок тренера, если роль - Тренер
  const user = {
    userName: 'John',
    email: 'john@qwe.qwe',
    gender: 'мужской',
    birthday: '01.01.1989',
    userRole: 'тренер',
    location: 'Спортивная',
    trainingLevel: 'профессионал',
    trainingTypes: [
      'бег',
      'кроссфит',
      'бокс'
    ],
    questionnaire: {
      certificates: [
        'myCoolCertificate.pdf'
      ],
      description: 'The best coach ever',
      isReadyToTrain: false
    },
    myFriends: []
  } as User;
  /* const user = {
    userName: 'Михаил',
    email: 'qwe@qwe.qwe',
    gender: 'мужской',
    birthday: '09.03.1989',
    userRole: 'пользователь',
    location: 'Петроградская',
    trainingLevel: 'любитель',
    trainingTypes: [
      'бег',
      'кроссфит'
    ],
    questionnaire: {
      trainingDuration: '30-50 мин',
      dailyCaloriesCount: 1000,
      totalCaloriesCount: 5000,
      isReadyToGetTrained: true
    },
    myFriends: []
  }; */
  const trainings = Array.from({length: 4}, () => ({
    title: 'energy+',
    bgImageUrl: 'img/content/thumbnails/training-02.jpg',
    level: 'любитель',
    type: 'стрейчинг',
    duration: '10 — 30 мин',
    price: 6500,
    caloriesCount: 5000,
    description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию!',
    gender: 'для всех',
    videoUrl: '',
    rating: 0,
    coachId: '64359129835875db1a1aeade',
    isSpecialOffer: false
  })) as unknown as TrainingRdo[];

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                {
                  user.userRole === UserRole.Coach
                    ? (
                      <UserCardCoach user={user} trainings={trainings}/>
                    )
                    : (
                      <UserCardUser user={user}/>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserCard;
