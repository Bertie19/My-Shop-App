import { StarIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import { useEffect, useState } from "react";
import { cartActions } from "../store/index";

const reviews = { href: "#", average: 4, totalCount: 122 };
const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = (props) => {
  const [open, setOpen] = useState(false);
  const title = "Not Logged In!";
  const message = "In order to continue shoping you must log in first.";
  const loginState = useSelector((state) => state.login.login);
  const dispatch = useDispatch();
  const [addToBag, setAddToBeg] = useState("Add to beg");
  const [buttonClicked, setButtonClicked] = useState(false);
  let timer = "";
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!loginState) {
      setOpen(true);
      return;
    }
    setAddToBeg("Added to beg...");
    setButtonClicked((prevState) => !prevState);
    dispatch(cartActions.addToCart(props.product));
  };

  useEffect(() => {
    if (buttonClicked) {
      timer = setTimeout(() => {
        setAddToBeg("Add to beg");
        setButtonClicked(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [buttonClicked]);

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        showModal={open}
        setCloseModal={closeModal}
        message={message}
        title={title}
      />
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <p className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {props.product.category}
            </p>
          </nav>
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={props.product.image}
                alt={props.product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={props.product.image}
                  alt={props.product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={props.product.image}
                  alt={props.product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div> */}
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg lg:hidden">
              <img
                src={props.product.image}
                alt={props.product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {props.product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {props.product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    // href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10" onSubmit={formSubmitHandler}>
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {addToBag}
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {props.product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
