export interface Profile {
  id?: number;
  name: string;
  focusTime: number;
  break: number;
  longBreak: number;
}


export interface ProfileContainer {
  id: number;
  userId: number;
  lastProfile: number;
  profileStored: Profile[];
  createdAt: Date;
  updatedAt: Date;
}


export interface ProfileResponse {
  id: number;
  user_id: number;
  lastProfile: number;
  profileStored: Profile[];
  created_at: string;
  updated_at: string;
}
