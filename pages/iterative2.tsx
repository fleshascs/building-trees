import { Fragment, ReactNode, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Branch, data, Node } from '../data';
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
    function renderBranches(branches: Node[]) {
      const _branches = cloneData(branches).sort((a, b) => (a.parentId < b.parentId ? 1 : -1));
      const constructionSite: Record<Branch['id'], ReactNode[]> = {};

      _branches.forEach((branch) => {
        constructionSite[branch.parentId] = constructionSite[branch.parentId] ?? [];
        constructionSite[branch.parentId].push(
          <Fragment key={branch.id}>
            <li>
              {branch.label} <button onClick={() => onAdd(branch.id)}>+</button>
            </li>
            {constructionSite[branch.id] ? <ul>{constructionSite[branch.id].reverse()}</ul> : null}
          </Fragment>
        );
      });

      return constructionSite[0].reverse();
    }
    return renderBranches(rawBranches);
  }, [rawBranches]);

  return (
    <div className={styles.container}>
      <Nav activeIndex={2} />

      <main className={styles.main}>
        <ul>{branches}</ul>
      </main>
    </div>
  );
};

export default Home;
