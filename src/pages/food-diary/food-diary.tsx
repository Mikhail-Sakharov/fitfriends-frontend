import Header from '../../components/header/header';

function FoodDiary(): JSX.Element {
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
                <section className="food-diary">
                  <div className="food-diary__wrapper">
                    <h1 className="food-diary__title">Дневник питания</h1>
                    <div className="food-diary__block">
                      <div className="food-diary__sidebar">
                        <svg className="food-diary__icon" width="21" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-book"></use>
                        </svg>
                        <ul className="food-diary__list">
                          <li className="food-diary__item">
                            <span>Завтрак</span>
                          </li>
                          <li className="food-diary__item">
                            <span>Обед</span>
                          </li>
                          <li className="food-diary__item">
                            <span>Ужин</span>
                          </li>
                          <li className="food-diary__item">
                            <span>Перекус</span>
                          </li>
                        </ul>
                        <p className="food-diary__total">Итого</p>
                      </div>
                      <div className="food-diary__content">
                        <form action="#" method="get">
                          <table className="food-diary__table">
                            <tr className="food-diary__row food-diary__row--head">
                              <th className="food-diary__cell food-diary__cell--head">пн</th>
                              <th className="food-diary__cell food-diary__cell--head">вт</th>
                              <th className="food-diary__cell food-diary__cell--head">ср</th>
                              <th className="food-diary__cell food-diary__cell--head">чт</th>
                              <th className="food-diary__cell food-diary__cell--head">пт</th>
                              <th className="food-diary__cell food-diary__cell--head">сб</th>
                              <th className="food-diary__cell food-diary__cell--head">вс</th>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="620"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="620"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="620"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="620"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="620"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="620"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="620"/>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="810"/>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="770"/>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" value="390"/>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </form>
                      </div>
                    </div>
                    <div className="total food-diary__total-per-week">
                      <div className="total__title-wrapper">
                        <div className="total__title">Итого за неделю</div>
                        <svg className="total__icon" width="30" height="30" aria-hidden="true">
                          <use xlinkHref="#icon-chart-with-arrow"></use>
                        </svg>
                      </div>
                      <p className="total__number">18 130</p>
                    </div>
                    <button className="btn food-diary__button" type="button">Сохранить</button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default FoodDiary;
