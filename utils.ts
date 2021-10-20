export function cloneData<T extends any[]>(branches: T): T {
  return branches.map((a) => ({ ...a }));
}
