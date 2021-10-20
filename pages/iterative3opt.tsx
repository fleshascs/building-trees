import { Fragment, ReactNode, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { data, Node } from '../data';
import { cloneData } from '../utils';
import { Nav } from '../components/Nav';

let uniqueNum = 9999;

const Home: NextPage = () => {
  const [rawBranches, setRawBranches] = useState(data);

  function onAdd(parentId: number) {
    const uniqueId = uniqueNum++;
    const newBranch = {
      id: uniqueId,
      parentId,
      label: 'new item'
    };
    setRawBranches((branches) => [...branches, newBranch]);
  }

  const branches = useMemo(() => {
    const childrenMap: Record<number, ReactNode[]> = { 0: [] };

    rawBranches.forEach((branch) => {
      childrenMap[branch.id] = childrenMap[branch.id] ?? [];
      childrenMap[branch.parentId] = childrenMap[branch.parentId] ?? [];

      childrenMap[branch.parentId].push(
        <Fragment key={branch.id}>
          <li>
            {branch.label} <button onClick={() => onAdd(branch.id)}>+</button>
          </li>
          {<ul>{childrenMap[branch.id]}</ul>}
        </Fragment>
      );
    });

    return childrenMap[0];
  }, [rawBranches]);

  return (
    <div className={styles.container}>
      <Nav activeIndex={4} />

      <main className={styles.main}>
        <ul>{branches}</ul>
      </main>
    </div>
  );
};

export default Home;
