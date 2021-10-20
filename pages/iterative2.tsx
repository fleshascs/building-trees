import { Fragment, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Branch, data, Node } from '../data';
import { cloneData } from '../utils';

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
    function renderBranches(branches: Node[]) {
      const _branches = cloneData(branches).sort((a, b) => (a.parentId < b.parentId ? 1 : -1));
      const constructionSite: Record<number, any> = {};

      _branches.forEach((branch) => {
        constructionSite[branch.parentId] = constructionSite[branch.parentId] ?? [];
        constructionSite[branch.parentId].push(
          <Fragment key={branch.id}>
            <li>
              {branch.label} <button onClick={() => onAdd(branch.id)}>+</button>
            </li>
            {constructionSite[branch.id] ? <ul>{constructionSite[branch.id]}</ul> : null}
          </Fragment>
        );
      });

      return Object.values(constructionSite);
    }
    return renderBranches(rawBranches);
  }, [rawBranches]);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link href='/'>
          <a>Recursive</a>
        </Link>
        <Link href='/iterative'>
          <a>Iterative</a>
        </Link>
        <b>Iterative2</b>
      </div>

      <main className={styles.main}>
        <ul>{branches}</ul>
      </main>
    </div>
  );
};

export default Home;
