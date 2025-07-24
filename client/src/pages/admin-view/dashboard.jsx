import { ProductImageUpload } from "@/components/admin-view/upload-image";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImage } from "@/store/admin/feature-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoaderState, setImageLoaderState] = useState(false);

  const { featureImageList } = useSelector((state) => state.featureSlice);

  const dispatch = useDispatch();

  const handleFeatureImageUpload = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImage());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  console.log(featureImageList);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoaderState={setImageLoaderState}
        imageLoaderState={imageLoaderState}
        // isEditMode={currEditingId !== null}
        isCustomStyling={true}
      />
      <Button className="mt-5 w-full" onClick={handleFeatureImageUpload}>
        Add Image
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImage) => (
              <div key={featureImage?.image} className="relative">
                <img
                  src={featureImage?.image}
                  className="w-full h-[300px] object-cover  rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
