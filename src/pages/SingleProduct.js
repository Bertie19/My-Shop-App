import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useState } from "react";

import { BallTriangle } from "react-loader-spinner";
import { getSingleProduct } from "../util/http";
import Product from "../components/Product";
// import { RadioGroup } from '@headlessui/react'


export default function SingleProductPage() {
  const params = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["product", { id: params.productId }],
    queryFn: () => getSingleProduct(params.productId),
  });

  let content;
  if (isPending) {
    content = (
      <div style={{ margin: "auto", width: "100px" }}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#202020"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    content = (
      <p style={{ textAlign: "center" }}>
        {error.info?.message || "Failed to load events."}
      </p>
    );
  }

  if (data) {
    content = (
      <Product product={data}/>
    );
  }
  return content;
}
