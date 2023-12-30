import { useQuery } from "@tanstack/react-query";
import { BallTriangle } from "react-loader-spinner";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import { getProducts } from "../util/http";


const ShopPage = () => {
  const [shopData, setShopData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const response = await fetch("https://fakestoreapi.com/products");

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }
  //     setShowLoader(false);

  //     return await response.json();
  //   };
  //   getProducts()
  //     .then((data) => setShopData(data))
  //     .catch((err) => console.log(err));
  // }, []);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  let content;

  if (isPending) {
    content = (
      <div style={{ margin: "auto", width:"100px" }}>
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
    content = <Products items={data} />;
  }

  return content;
};

export default ShopPage;
