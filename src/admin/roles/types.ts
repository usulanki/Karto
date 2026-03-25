export interface CreateRoleDto {
  name: string;
  code: string;
  store_id?: number;
}

export interface UpdateRoleDto {
  name?: string;
  code?: string;
  store_id?: number;
}

export interface ChangeStatusDto {
  status: boolean;
}
