import React, { useEffect, useState } from "react";
import { client } from "../lib/graphql";

const GET_PRODUCTS = `
query {
  products {
    id
    name
    description
    price
  }
}
`;

const DELETE_PRODUCT = `
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
`;

export default function ProductList({ refresh, editingProductId, onEdit }) {
  const [products, setProducts] = useState([]);

  const load = async () => {
    try {
      const data = await client.request(GET_PRODUCTS);
      setProducts(data.products || []);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const visibleProducts = products.filter((product) => product.id !== editingProductId);

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await client.request(DELETE_PRODUCT, { id });
      load();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Error deleting product');
    }
  };

  return (
    <table className="mt-6 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-slate-950/40 backdrop-blur">
      <thead className="bg-slate-800/80 text-slate-200">
        <tr>
          <th className="p-3 text-left font-medium">Name</th>
          <th className="p-3 text-left font-medium">Description</th>
          <th className="p-3 text-left font-medium">Price</th>
          <th className="p-3 text-left font-medium">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-800 text-slate-100">
        {visibleProducts.map((p) => (
          <tr key={p.id} className="align-top">
            <td className="p-3 font-medium text-slate-50">{p.name}</td>
            <td className="p-3 text-slate-300">{p.description}</td>
            <td className="p-3 text-slate-200">{p.price} €</td>
            <td className="space-x-2 p-3">
              <button className="btn-edit" onClick={() => onEdit?.(p)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => remove(p.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
