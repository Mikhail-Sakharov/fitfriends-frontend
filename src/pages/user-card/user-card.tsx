import Header from '../../components/header/header';
import UserCardCoach from '../../components/user-card-coach/user-card-coach';
import UserCardUser from '../../components/user-card-user/user-card-user';
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
                      <UserCardCoach user={user}/>
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
