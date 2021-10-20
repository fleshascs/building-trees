import Link from 'next/link';
import React from 'react';
import styles from '../styles/Home.module.css';

interface NavProps {
  activeIndex: number;
}

const nav = [
  { path: '/', label: 'Recursive' },
  { path: '/iterative', label: 'Iterative' },
  { path: '/iterative2', label: 'Iterative2' },
  { path: '/iterative3', label: 'Iterative3' },
  { path: '/iterative3opt', label: 'Iterative3opt' }
];

export const Nav: React.FC<NavProps> = ({ activeIndex }) => {
  return (
    <div className={styles.nav}>
      {nav.map(({ path, label }, index) =>
        index === activeIndex ? (
          <b key={path}>{label}</b>
        ) : (
          <Link href={path} key={path}>
            <a>{label}</a>
          </Link>
        )
      )}
    </div>
  );
};
