import * as React from 'react';
import styles from './style.css';

export function renderFile(content) {
  return <div className={styles.uploadedFile}>&lt;Ladattu ei-kuvatiedosto&gt;</div>;
}

export function renderImage(content) {
  return <img src={content.image} className={styles.image}/>
}

