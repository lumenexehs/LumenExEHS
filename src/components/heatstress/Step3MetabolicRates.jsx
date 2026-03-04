import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Plus, Trash2, Zap } from "lucide-react";

export default function Step3MetabolicRates({
  tasks,
  shiftHours,
  timeWeightedMetabolic,
  timeValidation,
  onTaskUpdate,
  onAddTask,
  onRemoveTask,
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-slate-600" />
          <Label className="text-base font-semibold text-slate-900">Task Breakdown</Label>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Define tasks performed during the {shiftHours}-hour shift
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Task Name</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Metabolic (W)</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">/hour</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Minutes</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Minutes/shift</th>
                <th className="text-center py-2 px-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {tasks.map((task, index) => {
                const minutesPerShift = (parseFloat(task.tasksPerHour) || 0) *
                  (parseFloat(task.minutesPerTask) || 0);
                return (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="py-2 px-3">
                      <Input
                        type="text"
                        value={task.name}
                        onChange={(e) => onTaskUpdate(index, "name", e.target.value)}
                        placeholder="e.g., Loading"
                        className="h-9 text-sm"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <Input
                        type="number"
                        value={task.metabolic}
                        onChange={(e) => onTaskUpdate(index, "metabolic", e.target.value)}
                        placeholder="150"
                        className="h-9 text-sm"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <Input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={task.tasksPerHour}
                        onChange={(e) => onTaskUpdate(index, "tasksPerHour", e.target.value)}
                        placeholder="2"
                        className="h-9 text-sm"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <Input
                        type="number"
                        min="1"
                        value={task.minutesPerTask}
                        onChange={(e) => onTaskUpdate(index, "minutesPerTask", e.target.value)}
                        placeholder="30"
                        className="h-9 text-sm"
                      />
                    </td>
                    <td className="py-2 px-3 text-center font-semibold text-slate-700">
                      {minutesPerShift.toFixed(0)}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => onRemoveTask(index)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Button
          onClick={onAddTask}
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={tasks.length >= 6}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {!timeValidation.isValid && (
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-yellow-800 mb-1">Time allocation mismatch</p>
            <p className="text-yellow-700">
              Total allocated: {timeValidation.allocatedMinutes} min | Expected: {timeValidation.expectedMinutes} min | Difference: {timeValidation.difference > 0 ? '+' : ''}{timeValidation.difference} min
            </p>
          </div>
        </div>
      )}

      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <p className="text-sm text-slate-700 font-semibold mb-3">Calculated</p>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Time-Weighted Avg Metabolic Rate</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">{timeWeightedMetabolic}</span>
            <span className="text-slate-600 font-medium">W</span>
          </div>
        </div>
      </div>
    </div>
  );
}