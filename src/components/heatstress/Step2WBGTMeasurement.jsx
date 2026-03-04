import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Thermometer } from "lucide-react";

export default function Step2WBGTMeasurement({ wbgt, location, onWBGTChange, onLocationChange, effectiveWBGT, caf }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Thermometer className="w-5 h-5 text-slate-600" />
          <Label className="text-base font-semibold text-slate-900">Measured WBGT</Label>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            step="0.1"
            value={wbgt}
            onChange={(e) => onWBGTChange(parseFloat(e.target.value) || 0)}
            className="w-32 h-12"
            placeholder="28.5"
          />
          <span className="text-slate-600 font-medium">°C</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">Wet Bulb Globe Temperature from on-site measurement</p>
      </div>

      <div>
        <Label className="text-base font-semibold text-slate-900 mb-3 block">
          Location Label (Optional)
        </Label>
        <Input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="h-12"
          placeholder="e.g., Loading Dock, Warehouse Floor"
        />
      </div>

      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <p className="text-sm text-slate-700 font-semibold mb-3">Calculated</p>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Effective WBGT (with CAF adjustment)</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">{effectiveWBGT.toFixed(1)}</span>
            <span className="text-slate-600 font-medium">°C</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Formula: {wbgt.toFixed(1)}°C + {caf}°C (clothing adjustment) = {effectiveWBGT.toFixed(1)}°C
        </p>
      </div>
    </div>
  );
}