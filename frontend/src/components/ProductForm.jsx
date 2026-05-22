import React, { useEffect, useState } from "react";
import { client } from "../lib/graphql";

const CREATE_PRODUCT = `
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    name
  }
}
`;

const UPDATE_PRODUCT = `
mutation UpdateProduct($id: ID!, $input: ProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    description
    price
  }
}
`;

const EMPTY_FORM = {
	name: "",
	description: "",
	price: 0,
};

export default function ProductForm({ product, onSaved, onCancel }) {
	const [form, setForm] = useState(EMPTY_FORM);

	useEffect(() => {
		if (product) {
			setForm({
				name: product.name ?? "",
				description: product.description ?? "",
				price: Number(product.price ?? 0),
			});
			return;
		}

		setForm(EMPTY_FORM);
	}, [product]);

	const submit = async (e) => {
		e.preventDefault();

		try {
			if (product?.id) {
				await client.request(UPDATE_PRODUCT, {
					id: product.id,
					input: form,
				});
			} else {
				await client.request(CREATE_PRODUCT, { input: form });
			}

			onSaved?.();
			setForm(EMPTY_FORM);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
			alert(product ? "Error updating product" : "Error creating product");
		}
	};

	const isEditing = Boolean(product?.id);

	return (
		<form onSubmit={submit} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40 backdrop-blur">
			<h2 className="text-xl font-semibold text-slate-50">
				{isEditing ? "Edit Product" : "Create Product"}
			</h2>

			{isEditing ? (
				<p className="text-sm text-cyan-300">
					Editing <span className="font-medium text-slate-50">{product.name}</span>
				</p>
			) : null}

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

			<div className="flex flex-wrap gap-2">
				<button type="submit" className="btn">
					{isEditing ? "Update" : "Create"}
				</button>

				{isEditing ? (
					<button type="button" className="btn-edit" onClick={onCancel}>
						Cancel
					</button>
				) : null}
			</div>
		</form>
	);
}