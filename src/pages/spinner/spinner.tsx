import {ClipLoader} from 'react-spinners';
import styles from './spinner.module.css';

function Spinner(): JSX.Element {
  return (
    <div className={styles.container} data-testid="loadingScreen">
      <div className={styles.spinner}>
        <ClipLoader color={'#333'} size={70}/>
      </div>
    </div>
  );
}

export default Spinner;
