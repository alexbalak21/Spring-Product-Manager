import React, { useState } from "react";
import { client } from "../lib/graphql";

const CREATE_PRODUCT = `
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    name
  }
}
`;

export default function CreateProduct({ onCreated }) {
  const [form, setForm] = useState({ name: "", description: "", price: 0 });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await client.request(CREATE_PRODUCT, { input: form });
      onCreated && onCreated();
      setForm({ name: "", description: "", price: 0 });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Error creating product');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
      <h2 className="text-xl font-semibold text-slate-50">Create Product</h2>

      <input
        className="input"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="input"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
      />

      <button type="submit" className="btn">Create</button>
    </form>
  );
}
