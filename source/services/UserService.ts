import { pool } from "../models/postgres"

export default class UserService {
  getUsers = () => pool.query('SELECT * FROM users')
  getUserById = (id: number) => pool.query('SELECT * FROM users WHERE id = $1', [id])
  createUser = (
      age: number,
      id: string,
      isDeleted: boolean,
      login: string,
      password: string
    ) => pool.query(
      'INSERT INTO users (age, id, "isDeleted", login, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [ age, id, isDeleted, login, password ]
    )
  updateUser = (
    age: number,
    id: string,
    isDeleted: boolean,
    login: string,
    password: string
    ) => pool.query(
      'UPDATE users SET age = $1, "isDeleted" = $3, login = $4, password = $5 WHERE id = $2',
      [ age, id, isDeleted, login, password ]
    )
  deleteUser = (id: number) => pool.query(
      'UPDATE users SET "isDeleted" = $2 WHERE id = $1',
      [id, true],
    )
  createDefaultUsers = (
    age: number,
    id: string,
    isDeleted: boolean,
    login: string,
    password: string
    ) => pool.query(
      'INSERT INTO users (age, id, "isDeleted", login, password) VALUES ($1, $2, $3, $4, $5)',
      [ age, id, isDeleted, login, password ]
    )
  getUserByLoginAndPassword = (
    login: string,
    password: string
    ) => pool.query(
      'SELECT * FROM users WHERE login = $1 AND password = $2 LIMIT 1',
      [login, password]
    )
}