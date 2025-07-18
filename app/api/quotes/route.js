export async function GET() {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return Response.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}
