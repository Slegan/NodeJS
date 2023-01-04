type User = {
  id: string,
  login: string,
  password: string,
  age: number,
  isDeleted: boolean,
}

type UserListRequest = {
  limit: number,
  login: string
}

export { User, UserListRequest,  }
