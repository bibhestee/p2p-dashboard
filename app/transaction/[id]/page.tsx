import React, { ReactElement, use } from "react";

const Page = ({
  params,
}: {
  params: Promise<{ id: string }>;
}): ReactElement => {
  const { id } = use(params);
  return <div>Transaction id: {id}</div>;
};

export default Page;
