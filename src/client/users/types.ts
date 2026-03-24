export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
}
