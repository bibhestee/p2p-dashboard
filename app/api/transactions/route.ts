import { NextRequest } from "next/server";
import { DB } from "../db/model";

export async function GET() {
  const transactions = DB.getTransactions();
  return Response.json({
    data: transactions,
    message: "Transactions retrieved successfully.",
  });
}

export async function POST(req: NextRequest) {
  const obj = req.body;
  console.log(obj);
  return Response.json(
    {
      data: obj,
      message: "Transaction created successfully",
    },
    { status: 201 }
  );
}
