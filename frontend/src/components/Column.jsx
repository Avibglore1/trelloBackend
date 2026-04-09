import { useDroppable } from "@dnd-kit/core";

function Column({ id, title, children }) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
    status: id,   
  },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-shrink-0 w-[300px] bg-gray-100 rounded-lg p-3"
    >
      <h2 className="font-semibold mb-3">{title}</h2>
      <div className="flex flex-col gap-3 min-h-[400px]">
        {children}
      </div>
    </div>
  );
}

export default Column