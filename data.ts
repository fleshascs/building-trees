export type Node = {
  id: number;
  parentId: number;
  label: string;
};

export type Branch = Node & { children?: Branch[] };

export const data: Node[] = [
  { id: 1, parentId: 0, label: 'test1' },
  { id: 2, parentId: 1, label: 'test2' },
  { id: 3, parentId: 1, label: 'test3' },
  { id: 4, parentId: 2, label: 'test4' },
  { id: 5, parentId: 0, label: 'test5' },
  { id: 6, parentId: 1, label: 'test6' },
  { id: 7, parentId: 0, label: 'test7' },
  { id: 8, parentId: 0, label: 'test8' },
  { id: 9, parentId: 0, label: 'test9' }
];
