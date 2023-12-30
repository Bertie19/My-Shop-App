import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/index";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cartActions } from "../store/index";
import CartPage from "../pages/Cart";

const Header = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login.login);
  const cartItems = useSelector((state) => state.cart.totalQuantity);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showBurgerButton, setShowBurgerButton] = useState(false);
  const shwoMenuHandler = () => {
    setShowSubMenu((prevState) => !prevState);
  };
  const showBurgerButtonHandler = () => {
    setShowBurgerButton((prevState) => !prevState);
  };
  const loginHandler = () => {
    dispatch(loginActions.toggleLogin());
    setShowSubMenu(false);
  };

  const activeClass =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium";
  const inActiveClass =
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

  const activeClassMobile =
    "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium";
  const inActiveClassMobile =
    "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium";
  let cartMenu = "";
  const [cartState, setCartState] = useState(false);
  const showCartMenuHandler = () => {
    setCartState((prevState) => !prevState);
  };
  const closeModal = () => {
    setCartState(false);
  };

  return (
    <>
      <header>
        <nav class="bg-gray-800">
          <CartPage showModal={cartState} setCloseModal={closeModal} />
          <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* <!-- Mobile menu button--> */}
                <button
                  type="button"
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={showBurgerButtonHandler}
                >
                  <span class="absolute -inset-0.5"></span>
                  <span class="sr-only">Open main menu</span>
                  {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                  <svg
                    class="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
                  <svg
                    class="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex flex-shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>

                <div class="hidden sm:ml-6 sm:block">
                  <div class="flex space-x-4">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? activeClass : inActiveClass
                      }
                      aria-current="page"
                      end
                    >
                      Store
                    </NavLink>
                    {!loginState && (
                      <NavLink
                        to="login"
                        className={({ isActive }) =>
                          isActive ? activeClass : inActiveClass
                        }
                      >
                        Login
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={showCartMenuHandler}
                  type="button"
                  class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {cartItems >= 1 && loginState && (
                    <span class="absolute -inset-1.5">
                      <p
                        style={{
                          width: "50%",
                          textAlign: "center",
                          borderRadius: "1rem",
                        }}
                        class="relative mt-7 bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        {cartItems}
                      </p>
                    </span>
                  )}
                  <span class="sr-only">View notifications</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </button>

                {/* <!-- Profile dropdown --> */}
                {loginState && (
                  <div class="relative ml-3">
                    <div>
                      <button
                        type="button"
                        class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={shwoMenuHandler}
                      >
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">Open user menu</span>
                        <img
                          class="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                    {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}

                    {showSubMenu && (
                      <div
                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabindex="-1"
                      >
                        {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                        {/* <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabindex="-1"
                          id="user-menu-item-0"
                        >
                          Your Profile
                        </a> */}
                        <Link
                          onClick={loginHandler}
                          class="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabindex="-1"
                          id="user-menu-item-2"
                        >
                          Sign out
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          <div class="sm:hidden" id="mobile-menu">
            {showBurgerButton && (
              <div class="space-y-1 px-2 pb-3 pt-2">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClassMobile : inActiveClassMobile
                  }
                  aria-current="page"
                  end
                >
                  Store
                </NavLink>
                {!loginState && (
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive ? activeClassMobile : inActiveClassMobile
                    }
                  >
                    Login
                  </NavLink>
                )}
                {/* <a
                  href="#"
                  class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                  aria-current="page"
                >
                  Store
                </a>
                <a
                  href="#"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Login
                </a> */}
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
