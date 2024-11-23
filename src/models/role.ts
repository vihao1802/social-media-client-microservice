export interface RoleBase {
  roleName: string;
}

export interface Role extends RoleBase {
  id: string;
}

export interface RoleRequest extends RoleBase {}
