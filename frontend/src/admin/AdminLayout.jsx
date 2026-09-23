import React from "react";
import Sidebar from "./components/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          w-full
          min-h-screen
          ml-0
          md:ml-64
          pb-20
          md:pb-0
          overflow-x-hidden
        "
      >
        <div className="w-full p-3 sm:p-4 md:p-6">
          {children}
        </div>
      </main>

    </div>
  );
}

export default AdminLayout;