import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";

export const ProductFilter = ({ filters, handleFilters }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option?.id) > -1 
                      }
                      className="border-gray-700 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white"
                      onCheckedChange={() => handleFilters(keyItem, option?.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};
