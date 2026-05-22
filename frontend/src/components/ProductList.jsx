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

export default function ProductList({ refresh }) {
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
    <table className="table-auto w-full mt-6 border bg-white shadow">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Name</th>
          <th className="p-2">Description</th>
          <th className="p-2">Price</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.description}</td>
            <td className="p-2">{p.price} €</td>
            <td className="p-2 space-x-2">
              <button className="btn-edit">Edit</button>
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
