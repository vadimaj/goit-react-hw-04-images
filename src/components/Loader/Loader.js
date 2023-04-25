import css from './Loader.module.css';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.loader}>
      <Oval
        height="40"
        width="40"
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#8890bc"
        strokeWidth={7}
        strokeWidthSecondary={7}
      />
    </div>
  );
};

export default Loader;
