export function cloneData<T extends any[]>(branches: T): T {
  return branches.reduce((list, branch) => {
    const _branch = Object.assign({}, branch);
    list.push(_branch);
    return list;
  }, []);
}
