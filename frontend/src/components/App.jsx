import React, { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

export default function App() {
  const [refresh, setRefresh] = useState(Date.now());
  const [editingProduct, setEditingProduct] = useState(null);

  const startEditing = (product) => {
	setEditingProduct(product);
  };

  const stopEditing = () => {
	setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 sm:px-8 lg:px-10">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        Product Manager
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <ProductForm
			key={editingProduct ? editingProduct.id : "create"}
			product={editingProduct}
			onSaved={() => {
				setRefresh(Date.now());
				stopEditing();
			}}
			onCancel={editingProduct ? stopEditing : undefined}
		  />
        </div>

        <div className="md:col-span-2">
          <ProductList
			refresh={refresh}
			editingProductId={editingProduct?.id ?? null}
			onEdit={startEditing}
		  />
        </div>
      </div>
    </div>
  );
}
