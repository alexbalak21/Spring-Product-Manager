# 🌟 Astro Frontend — Product CRUD (GraphQL + React + Tailwind)

This is a simple **SPA‑style Astro frontend** that connects to a **Spring Boot GraphQL backend** running at:

```
http://localhost:8080/graphql
```

The app provides:

- A **Create Product** form  
- A **Product List** table  
- **Edit** and **Delete** actions  
- A minimal GraphQL client using `graphql-request`  
- A simple SPA experience using Astro Islands + React  
- TailwindCSS for styling  

---

## 📦 Tech Stack

- Astro  
- React (Astro Islands)  
- TailwindCSS  
- graphql-request  
- Spring Boot GraphQL backend  

---

## 🚀 1. Project Setup

### Create the Astro project

```bash
npm create astro@latest product-frontend
cd product-frontend
```

Choose:

- Template → **Empty** or **Basics**
- Install dependencies → **Yes**

---

## 🚀 2. Add React

```bash
npx astro add react
```

---

## 🚀 3. Add TailwindCSS

```bash
npx astro add tailwind
```

This creates:

- `tailwind.config.mjs`
- `src/styles/global.css`

---

## 🚀 4. Install GraphQL client

```bash
npm install graphql graphql-request
```

---

# 📁 Project Structure

```
src/
│
├── components/
│   ├── CreateProduct.jsx
│   ├── ProductList.jsx
│   └── EditProductModal.jsx   (optional)
│
├── lib/
│   └── graphql.js
│
└── pages/
    └── index.astro
```

---

# 🔌 GraphQL Client (`src/lib/graphql.js`)

```js
import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("http://localhost:8080/graphql");
```

---

# 🧱 Create Product Component (`src/components/CreateProduct.jsx`)

```jsx
import { useState } from "react";
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
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const submit = async (e) => {
    e.preventDefault();
    await client.request(CREATE_PRODUCT, { input: form });
    onCreated();
    setForm({ name: "", description: "", price: 0 });
  };

  return (
    <form onSubmit={submit} className="space-y-3 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold">Create Product</h2>

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
        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
      />

      <button className="btn">Create</button>
    </form>
  );
}
```

---

# 📋 Product List Component (`src/components/ProductList.jsx`)

```jsx
import { useEffect, useState } from "react";
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
    const data = await client.request(GET_PRODUCTS);
    setProducts(data.products);
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const remove = async (id) => {
    await client.request(DELETE_PRODUCT, { id });
    load();
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
```

---

# 🏠 Main Page (`src/pages/index.astro`)

```astro
---
import CreateProduct from "../components/CreateProduct.jsx";
import ProductList from "../components/ProductList.jsx";
import { useState } from "react";
---

<html>
  <body class="p-8 bg-gray-50">
    <h1 class="text-3xl font-bold mb-6">Product Manager</h1>

    <CreateProduct client:load onCreated={() => setRefresh(Date.now())} />

    <ProductList client:load refresh={refresh} />
  </body>
</html>
```

---

# 🎨 Tailwind Utility Classes (`src/styles/global.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.input {
  @apply border p-2 w-full rounded;
}

.btn {
  @apply bg-blue-600 text-white px-4 py-2 rounded;
}

.btn-delete {
  @apply bg-red-600 text-white px-3 py-1 rounded;
}

.btn-edit {
  @apply bg-yellow-500 text-white px-3 py-1 rounded;
}
```

---

# 🧪 Testing

Start Astro:

```bash
npm run dev
```

Visit:

```
http://localhost:4321
```

You can now:

- Create a product  
- See it appear in the table  
- Delete it  
- (Optional) Add edit modal  

---

# 🚀 Next Steps

- Add **EditProductModal**  
- Add **Zustand** for global state  
- Add **form validation**  
- Add **pagination**  
- Add **JWT authentication**  

