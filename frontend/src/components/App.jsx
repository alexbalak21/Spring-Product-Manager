import React, { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductList";

export default function App() {
  const [refresh, setRefresh] = useState(Date.now());

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Product Manager</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CreateProduct onCreated={() => setRefresh(Date.now())} />
        </div>

        <div className="md:col-span-2">
          <ProductList refresh={refresh} />
        </div>
      </div>
    </div>
  );
}
