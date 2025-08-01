import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { SpinnerLoader } from "@/assets/loader";
import imageCompression from "browser-image-compression"; // ⬅️ Import at top

export const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoaderState,
  setImageLoaderState,
  isEditMode,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);

  // const handleImageFileChange = (event) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) setImageFile(selectedFile);
  // };

  const handleImageFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const options = {
      maxWidthOrHeight: 1024, // Resize to max 1024px
      useWebWorker: true,
      initialQuality: 0.9, // Slight compression
    };

    try {
      const compressedFile = await imageCompression(selectedFile, options);
      setImageFile(compressedFile); // ⬅️ Set the compressed file to state
    } catch (err) {
      console.error("Image compression failed:", err);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoaderState(true);
    try {
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:8000/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageLoaderState(false); // Always stop loader
    }
  };

  useEffect(() => {
    if (imageFile != null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-50" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and Drop or click to upload the image</span>
          </Label>
        ) : imageLoaderState ? (
          <SpinnerLoader className="h-10 flex items-center justify-center" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
