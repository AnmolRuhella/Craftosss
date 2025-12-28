export default function UploadProductPage() {
  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Product</h2>

      <input className="w-full border p-2 mb-3" placeholder="Product name" />
      <textarea
        className="w-full border p-2 mb-3"
        placeholder="Description"
      />
      <input className="w-full border p-2 mb-3" placeholder="Image URL" />

      <button className="bg-black text-white px-4 py-2 rounded">
        Save Product
      </button>
    </div>
  );
}
