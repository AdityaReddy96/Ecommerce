import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export const AdminProductTile = ({
  setcurrEditingId,
  setOpenProducts,
  product,
  setFormData,
  handleDeleteProduct,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto pt-0">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text=xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenProducts(true);
              setcurrEditingId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDeleteProduct(product?._id)}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
