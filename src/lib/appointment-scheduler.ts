/**
 * Intelligent Appointment Scheduling Logic
 * Clinic hours: 10:00 AM - 8:00 PM
 * Minimum 1 hour ahead, rounded to nearest 30-min slot
 */

export interface AppointmentSlot {
  date: Date;
  dateStr: string; // e.g. "Wednesday, 16 April 2025"
  timeStr: string; // e.g. "6:30 PM"
}

function roundUpTo30Min(date: Date): Date {
  const result = new Date(date);
  const minutes = result.getMinutes();
  if (minutes === 0 || minutes === 30) {
    // Already on a 30-min boundary
    return result;
  }
  if (minutes < 30) {
    result.setMinutes(30, 0, 0);
  } else {
    result.setHours(result.getHours() + 1, 0, 0, 0);
  }
  return result;
}

export function getNextAppointmentSlot(): AppointmentSlot {
  const now = new Date();
  
  // Add 1 hour minimum
  const earliest = new Date(now.getTime() + 60 * 60 * 1000);
  
  // Round up to nearest 30-min slot
  const rounded = roundUpTo30Min(earliest);
  
  const hour = rounded.getHours();
  const clinicOpen = 10;
  const clinicClose = 20; // 8:00 PM
  
  let appointmentDate: Date;
  
  if (hour >= clinicClose || hour < clinicOpen) {
    // Outside clinic hours → next day 10:30 AM
    appointmentDate = new Date(rounded);
    if (hour >= clinicClose) {
      appointmentDate.setDate(appointmentDate.getDate() + 1);
    }
    appointmentDate.setHours(10, 30, 0, 0);
  } else {
    appointmentDate = rounded;
  }
  
  // Format
  const dateStr = appointmentDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  
  const timeStr = appointmentDate.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  
  return { date: appointmentDate, dateStr, timeStr };
}
