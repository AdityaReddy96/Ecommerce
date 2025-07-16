import { addressFormControls } from "@/config";
import { CommonForm } from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressSlice,
  deleteAddressSlice,
  getAddressSlice,
  updateAddressSlice,
} from "@/store/shop/addresss-slice";
import { AddressCard } from "./address-card";
import { toast } from "sonner";

const initialFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

export const Address = ({ setCurrentSelectedAddress }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  const handleAddress = (event) => {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditingId === null) {
      setFormData(initialFormData);
      toast.warning("Address limit Exceeded");
      return;
    }

    currentEditingId !== null
      ? dispatch(
          updateAddressSlice({
            userId: user?.id,
            addressId: currentEditingId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAddressSlice(user?.id));
            setCurrentEditingId(null);
            setFormData(initialFormData);
            toast.success("Address Updated");
          }
        })
      : dispatch(addAddressSlice({ ...formData, userId: user?.id })).then(
          (data) => {
            // console.log(data);
            if (data?.payload?.success) {
              dispatch(getAddressSlice(user?.id));
              setFormData(initialFormData);
              toast.success("Address Added");
            }
          }
        );
  };

  const handleDeleteAddress = (address) => {
    // console.log(addressId);
    dispatch(
      deleteAddressSlice({ userId: user?.id, addressId: address?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAddressSlice(user?.id));
        toast.success("Address Deleted");
      }
    });
  };

  const handleEditAddress = (address) => {
    // console.log(addressId);
    setCurrentEditingId(address?._id);
    setFormData({
      ...formData,
      address: address?.address,
      city: address?.city,
      pincode: address?.pincode,
      phone: address?.phone,
      notes: address?.notes,
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  useEffect(() => {
    dispatch(getAddressSlice(user?.id));
  }, [dispatch]);

  // console.log(addressList);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-2  ">
        {addressList && addressList.length > 0
          ? addressList.map((address) => {
              return (
                <AddressCard
                  addressInfo={address}
                  key={address._id}
                  handleDeleteAddress={handleDeleteAddress}
                  handleEditAddress={handleEditAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
              );
            })
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditingId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditingId ? "Edit Address" : "Add New Address"}
          onSubmit={handleAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};
