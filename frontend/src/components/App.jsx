import React, { useState } from "react";
import CreateProduct from "./CreateProduct";
import ProductList from "./ProductList";

export default function App() {
  const [refresh, setRefresh] = useState(Date.now());

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        Product Manager
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
