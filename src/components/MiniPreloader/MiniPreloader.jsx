import React from 'react';
import styles from './MiniPreloader.module.scss';

const MiniPreloader = () => {
  return (
    <div className={styles.miniLoader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default MiniPreloader;
