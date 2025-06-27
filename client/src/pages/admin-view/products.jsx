import { ProductImageUpload } from "@/components/admin-view/upload-image";
import { CommonForm } from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductsFormElements } from "@/config";
import { addNewProduct, getAllProducts } from "@/store/admin/product-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export const AdminProducts = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoaderState, setImageLoaderState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  // console.log(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        dispatch(getAllProducts);
        setImageFile(null);
        setOpenProducts(false);
        setFormData(initialFormData);
        toast.success("Product Added");
      }
    });
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log(productList, uploadedImageUrl, "productList");

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProducts(true)}>Add Products</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openProducts}
        onOpenChange={() => {
          setOpenProducts(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto p-6">
          <SheetHeader>
            <SheetTitle>
              <span className="text-2xl cursor-pointer font-semibold">
                Add new Product
              </span>
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoaderState={setImageLoaderState}
            imageLoaderState={imageLoaderState}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductsFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
