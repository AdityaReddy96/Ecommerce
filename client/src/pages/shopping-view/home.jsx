import { Button } from "@/components/ui/button";
import bannerTwo from "../../assets/banner-2.png";
import bannerOne from "../../assets/banner-1.png";
import bannerThree from "../../assets/banner-3.jpg";
// import bannerFour from "../../assets/banner-4.png";
// import bannerFive from "../../assets/banner-5.png";
// import bannerSeven from "../../assets/banner-7.png";
// import bannerEight from "../../assets/banner-8.png"; 
import { GiFootTrip } from "react-icons/gi";
import { SiNike, SiPuma } from "react-icons/si";
import { CgAdidas } from "react-icons/cg";
import wrognLogo from "../../assets/wrogn-brand.png";
import hrxLogo from "../../assets/HRX-brand.jpg";
import levisLogo from "../../assets/levi's-brand.png";

import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Mars,
  Venus,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/shop-products-silce";
import { ShoppingProductTile } from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCartSlice, getCartItemSlice } from "@/store/shop/shop-cart-slice";
import { toast } from "sonner";
import { ProductDetails } from "@/components/shopping-view/product-details";

const categoryWithIcon = [
  { id: "men", label: "Men", icon: Mars },
  { id: "women", label: "Women", icon: Venus },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: GiFootTrip },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: SiNike },
  { id: "adidas", label: "Adidas", icon: CgAdidas },
  { id: "puma", label: "Puma", icon: SiPuma },
  {
    id: "wrogn",
    label: "Wrogn",
    img: wrognLogo,
  },
  {
    id: "hrx",
    label: "HRX",
    img: hrxLogo,
  },
  {
    id: "levis",
    label: "Levi's",
    img: levisLogo,
  },
];

export const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    bannerOne,
    bannerTwo,
    bannerThree,
    // bannerFour,
    // bannerSeven,
    // bannerFive,
    // bannerEight,
    // bannerSix,
  ];
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.featureSlice);
  const [openDetails, setOpenDetails] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardNavigation = (currentProduct, section) => {
    sessionStorage.removeItem("filters");
    const homeCardFilter = {
      [section]: [currentProduct.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(homeCardFilter));
    navigate(`/shop/listing`);
    window.scrollTo(0, 0);
  };

  const handleGetProductDetails = (getCurrProductId) => {
    // console.log(getCurrProductId);
    dispatch(getProductDetails(getCurrProductId));
  };

  const handleAddToCart = (getCurrProductId) => {
    // console.log(getCurrProductId);
    dispatch(
      addToCartSlice({
        userId: user?.id,
        productId: getCurrProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItemSlice(user?.id));
        toast.success("Product Added to Cart");
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      getFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetails(true);
  }, [productDetails]);

  // useEffect(() => {
  //     dispatch(getFeatureImage());
  //   }, [dispatch]);

  // console.log("productList", productList);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => {
          return (
            <img
              src={slide}
              key={index}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          );
        })}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryWithIcon.map((categoryItem) => {
              return (
                <Card
                  onClick={() => handleCardNavigation(categoryItem, "category")}
                  key={categoryItem.id}
                  className="cursor-pointer hover: shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((brandItem) => {
              return (
                <Card
                  onClick={() => handleCardNavigation(brandItem, "brand")}
                  key={brandItem.id}
                  className="cursor-pointer hover: shadow-lg transition-shadow"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    {brandItem.icon ? (
                      <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                    ) : (
                      <img
                        src={brandItem.img}
                        alt={brandItem.label}
                        className="w-12 h-12 mb-4"
                      />
                    )}
                    <span className="font-bold">{brandItem.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productList) => {
                  return (
                    <ShoppingProductTile
                      key={productList._id}
                      product={productList}
                      handleGetProductDetails={handleGetProductDetails}
                      handleAddToCart={handleAddToCart}
                    />
                  );
                })
              : null}
          </div>
        </div>
        <ProductDetails
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
          productDetails={productDetails}
        />
      </section>
    </div>
  );
};
