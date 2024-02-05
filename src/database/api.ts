export async function getBoards() {
  const res = await fetch(
    "https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app/kanban.json"
  );
  const data = await res.json();
  return data.boards;
}
