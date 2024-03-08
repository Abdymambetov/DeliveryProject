import imgPrev from '../../assets/icons/backBtn.svg';
import { useNavigate } from 'react-router-dom';
import styles from './PathToFiles.module.scss';

const PathToFiles = ({ estab, name }) => {
  const navigate = useNavigate();

  const backPrev = () => {
    navigate(-1);
  };

  return (
    <div className={styles.pathBlock} onClick={backPrev}>
      <div className={styles.back}>
        <button>
          <img src={imgPrev} alt="<" />
          <p>Каталог</p>
        </button>
        <button>{estab}</button>
        {name && <button>{name}</button>}
      </div>
    </div>
  );
};

export default PathToFiles;
