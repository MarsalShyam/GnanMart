export default function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Student Dashboard
      </h1>

      <p>Welcome! You can:</p>

      <ul className="list-disc ml-5 mt-2">
        <li>Browse products</li>
        <li>Add to cart</li>
        <li>Place orders</li>
        <li>Track orders</li>
      </ul>
    </div>
  );
}