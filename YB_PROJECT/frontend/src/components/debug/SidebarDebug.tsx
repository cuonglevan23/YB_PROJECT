import { useSidebar } from "../../hooks";

export const SidebarDebug = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="fixed top-20 right-4 z-50 bg-red-600 text-white p-2 rounded text-sm">
      <div>Collapsed: {isCollapsed ? "Yes" : "No"}</div>
      <button
        onClick={toggleSidebar}
        className="mt-1 px-2 py-1 bg-red-700 rounded text-xs"
      >
        Toggle Debug
      </button>
    </div>
  );
};
