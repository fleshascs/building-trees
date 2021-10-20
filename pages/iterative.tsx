import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Branches } from '../components/Branches';
import { data, Node, Branch } from '../data';
import { cloneData } from '../utils';

function iterativeTree(branches: Node[]) {
  const _branches = cloneData(branches);
  const refMap = _branches.reduce((mp, branch: Branch) => {
    mp[branch.id] = branch;
    return mp;
  }, {} as Record<number, Branch>);

  _branches.forEach((branch) => {
    const ref = refMap[branch.parentId];
    if (ref) {
      ref.children = ref.children ?? [];
      ref.children.push(branch);
    }
  });

  return _branches.filter((branch) => branch.parentId === 0);
}

let uniqueNum = 9999;

const Home: NextPage = () => {
  const rawBranches = data;
  const [branches, setBranches] = useState(iterativeTree(rawBranches));
  console.log(JSON.stringify(branches, undefined, 4));

  function onAdd(parentId: number) {
    const uniqueId = uniqueNum++;
    const newBranch = {
      id: uniqueId,
      parentId,
      label: 'new item'
    };
    rawBranches.push(newBranch);
    setBranches(iterativeTree(rawBranches));
  }
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link href='/'>
          <a>Recursive</a>
        </Link>
        <b>Iterative</b>
        <Link href='/iterative2'>
          <a>Iterative2</a>
        </Link>
      </div>

      <main className={styles.main}>
        <Branches branches={branches} onAdd={onAdd} />
      </main>
    </div>
  );
};

export default Home;
