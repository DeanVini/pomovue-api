// Individual task interface (for JSON storage)
export interface Task {
  id?: number;
  description: string;
  finished: boolean;
  show: boolean;
}

export interface TaskContainer {
  id: number;
  userId: number;
  taskStored: Task[];
  createdAt: Date;
  updatedAt: Date;
}

// Task response interface (for API responses)
export interface TaskResponse {
  id: number;
  user_id: number;
  taskStored: Task[];
  created_at: string;
  updated_at: string;
}
