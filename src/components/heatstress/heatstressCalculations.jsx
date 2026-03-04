export const ACGIH_REFERENCE_TEMP = 28; // Reference WBGT in °C for standard conditions

export const clothingOptions = [
  { id: "typical", label: "Typical Work Clothes", caf: 0 },
  { id: "coveralls", label: "Coveralls", caf: 1 },
  { id: "double", label: "Double-Layer Clothing", caf: 2 },
  { id: "vapor", label: "Vapor Barrier / Impermeable", caf: 4 }
];

export const getClothingCAF = (clothingId) => {
  const option = clothingOptions.find(o => o.id === clothingId);
  return option ? option.caf : 0;
};

export const calculateEffectiveWBGT = (wbgt, caf) => {
  return wbgt + caf;
};

export const calculateTimeWeightedMetabolicRate = (tasks) => {
  if (tasks.length === 0) return 0;
  
  let totalMinutes = 0;
  let totalWeightedMetabolic = 0;

  tasks.forEach(task => {
    const metabolic = parseFloat(task.metabolic) || 0;
    const tasksPerHour = parseFloat(task.tasksPerHour) || 0;
    const minutesPerTask = parseFloat(task.minutesPerTask) || 0;
    
    const minutesPerShift = tasksPerHour * minutesPerTask;
    
    totalWeightedMetabolic += metabolic * minutesPerShift;
    totalMinutes += minutesPerShift;
  });

  if (totalMinutes === 0) return 0;
  return Math.round(totalWeightedMetabolic / totalMinutes);
};

export const getTotalShiftMinutes = (shiftHours) => {
  return shiftHours * 60;
};

export const validateTimeAllocation = (tasks, shiftHours) => {
  const totalMinutes = getTotalShiftMinutes(shiftHours);
  const allocatedMinutes = tasks.reduce((sum, task) => {
    const tasksPerHour = parseFloat(task.tasksPerHour) || 0;
    const minutesPerTask = parseFloat(task.minutesPerTask) || 0;
    return sum + (tasksPerHour * minutesPerTask);
  }, 0);

  const tolerance = totalMinutes * 0.1; // 10% tolerance
  const difference = Math.abs(allocatedMinutes - totalMinutes);
  
  return {
    isValid: difference <= tolerance,
    allocatedMinutes: Math.round(allocatedMinutes),
    expectedMinutes: totalMinutes,
    difference: Math.round(allocatedMinutes - totalMinutes)
  };
};

export const getScreeningZone = (effectiveWBGT, timeWeightedMetabolic) => {
  // Simplified ACGIH-style thresholds
  // These vary by metabolic rate; using moderate example
  
  let actionLevel, tlv;
  
  if (timeWeightedMetabolic < 116) { // Light work
    actionLevel = 32.2;
    tlv = 30.0;
  } else if (timeWeightedMetabolic < 232) { // Moderate work
    actionLevel = 29.4;
    tlv = 26.7;
  } else if (timeWeightedMetabolic < 348) { // Heavy work
    actionLevel = 26.7;
    tlv = 23.3;
  } else { // Very heavy work
    actionLevel = 25.0;
    tlv = 20.6;
  }

  if (effectiveWBGT <= tlv) {
    return {
      zone: "below-al",
      label: "Below Action Level",
      color: "bg-green-100 border-green-300",
      textColor: "text-green-700",
      actionLevel,
      tlv
    };
  } else if (effectiveWBGT <= actionLevel) {
    return {
      zone: "between",
      label: "Between Action Level and TLV",
      color: "bg-yellow-100 border-yellow-300",
      textColor: "text-yellow-700",
      actionLevel,
      tlv
    };
  } else {
    return {
      zone: "exceeds-tlv",
      label: "Exceeds TLV",
      color: "bg-red-100 border-red-300",
      textColor: "text-red-700",
      actionLevel,
      tlv
    };
  }
};

export const getZoneGuidance = (zone) => {
  const guidance = {
    "below-al": [
      "Conditions are within acceptable limits.",
      "Continue monitoring if conditions change.",
      "Regular breaks and hydration remain important."
    ],
    "between": [
      "Review work/rest cycles and hydration protocols.",
      "Implement administrative controls (rotate workers, adjust schedules).",
      "Monitor for early heat illness symptoms."
    ],
    "exceeds-tlv": [
      "Immediate controls are needed — consider work relocation, timing, or PPE changes.",
      "Consult a qualified occupational hygiene professional.",
      "Document all controls and reassess conditions regularly."
    ]
  };
  
  return guidance[zone] || [];
};