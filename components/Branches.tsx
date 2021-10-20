import React, { Fragment } from 'react';
import { Branch } from '../data';

interface BranchesProps {
  branches: Branch[];
  onAdd: (parentId: number) => void;
}

export const Branches: React.FC<BranchesProps> = ({ branches, onAdd }) => {
  return (
    <ul>
      {branches.map((branch) => (
        <Fragment key={branch.id}>
          <li>
            {branch.label} <button onClick={() => onAdd(branch.id)}>+</button>
          </li>
          {branch?.children?.length ? <Branches branches={branch.children} onAdd={onAdd} /> : null}
        </Fragment>
      ))}
    </ul>
  );
};
