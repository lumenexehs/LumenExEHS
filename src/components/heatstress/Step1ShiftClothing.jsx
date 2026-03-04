import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Shirt } from "lucide-react";
import { clothingOptions } from "./heatstressCalculations";

export default function Step1ShiftClothing({ shiftHours, clothingId, onShiftChange, onClothingChange }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-slate-600" />
          <Label className="text-base font-semibold text-slate-900">Shift Length</Label>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            min="1"
            max="24"
            value={shiftHours}
            onChange={(e) => onShiftChange(parseFloat(e.target.value) || 0)}
            className="w-24 h-12"
            placeholder="8"
          />
          <span className="text-slate-600 font-medium">hours</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">Typical shift is 8 hours</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shirt className="w-5 h-5 text-slate-600" />
          <Label className="text-base font-semibold text-slate-900">Clothing / PPE</Label>
        </div>
        <Select value={clothingId} onValueChange={onClothingChange}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select clothing type" />
          </SelectTrigger>
          <SelectContent>
            {clothingOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label} (CAF +{option.caf}°C)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-slate-500 mt-2">
          CAF = Clothing Adjustment Factor — accounts for heat retention
        </p>
      </div>
    </div>
  );
}