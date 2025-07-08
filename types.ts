
export interface User {
  id: string;
  name: string;
}

export interface AttendanceRecord {
  id: number;
  clockIn: string; // ISO string
  clockOut: string | null; // ISO string or null
}
