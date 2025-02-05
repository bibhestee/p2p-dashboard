import { DB } from "../../db/model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const transaction = DB.getTransaction(id);
  if (!transaction) {
    return Response.json(
      {
        message: "Not found",
      },
      { status: 404 }
    );
  }
  return Response.json({
    data: transaction,
    message: "Transaction retrieved successfully.",
  });
}
