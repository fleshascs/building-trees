import { useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { Branches } from '../components/Branches';
import { data, Node, Branch } from '../data';
import { Nav } from '../components/Nav';

function recursiveTree(branch: Node[]) {
  const tree: Branch[] = [];
  function makeTree(_branch: Branch[], level: number, tree: Node[]) {
    _branch.forEach((br) => {
      if (br.parentId === level) {
        const newBr = { ...br, children: [] };
        makeTree(_branch, newBr.id, newBr.children);
        tree.push(newBr);
      }
    });
  }
  makeTree(branch, 0, tree);
  return tree;
}

let uniqueNum = 9999;

const Home: NextPage = () => {
  const rawBranches = data;
  const [branches, setBranches] = useState(recursiveTree(rawBranches));
  console.log(JSON.stringify(branches, undefined, 4));

  function onAdd(parentId: number) {
    const uniqueId = uniqueNum++;
    const newBranch = {
      id: uniqueId,
      parentId,
      label: 'new item'
    };
    rawBranches.push(newBranch);
    setBranches(recursiveTree(rawBranches));
  }

  return (
    <div className={styles.container}>
      <Nav activeIndex={0} />
      <main className={styles.main}>
        <Branches branches={branches} onAdd={onAdd} />
      </main>
    </div>
  );
};

export default Home;
