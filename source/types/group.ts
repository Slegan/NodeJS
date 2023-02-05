type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

type Group = {
  id: string,
  name: string,
  permissions: Array<Permission>,
}

type UsersGroup = {
  users_id: string,
  group_id: string,
}


export { Group, Permission, UsersGroup }
