import { Request, Response  } from "express";
import { pool } from "../config/postgres"

import { User, UserListRequest } from '../interfaces/user';

const getUsers = (req: Request, res: Response) => {
  pool.query('SELECT * FROM users', (error: any, results: any) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error: any, results: any) => {
    if (error) {
      res.status(404).json({
        message: `User with id ${req.params.id} not exist, ${error}`
      })
    }
    res.status(200).json(results.rows)
  })
}

const createUser = (req: Request, res: Response) => {
  const { age, id, isDeleted, login, password } = req.body

  pool.query(
    'INSERT INTO users (age, id, "isDeleted", login, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [ age, id, isDeleted, login, password ],
    (error: any, results: any) => {
      if (error) {
        res.status(400).json({
          message: `${error}`
        })
      } else {
        res.status(201).send(`User added with ID: ${results?.rows[0].id}`)
      }
  })
}

const createDefaultUsers = (req: Request, res: Response) => {
  const list = [
    [5, 15, false, 'test1', 'test1'],
    [6, 16, false, 'test2', 'test2'],
    [7, 17, false, 'test3', 'test3'],
    [8, 18, false, 'test4', 'test4'],
    [9, 19, false, 'test5', 'test5']
  ]

  try {
    list.forEach(user => {
      pool.query(
        'INSERT INTO users (age, id, "isDeleted", login, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [ ...user],
        (error: any, results: any) => {
          if (error) {
            
          } else {
            res.status(201)
          }
      })
    })
  } catch (error) {
    res.status(400).json({
      message: `${error}`
    })
  }

  res.send(`Users default list was created`)
}

const updateUser = (req: Request, res: Response) => {
  const { age, id, isDeleted, login, password } = req.body

  pool.query(
    'UPDATE users SET age = $1, "isDeleted" = $3, login = $4, password = $5 WHERE id = $2',
    [age, id, isDeleted, login, password],
    (error: any) => {
      if (error) {
        res.status(400).json({
          message: `${error}`
        })
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  pool.query(
    'UPDATE users SET "isDeleted" = $2 WHERE id = $1',
    [id, true],
    (error: any, results: any) => {
    if (error) {
      res.status(400).json({
        message: `${error}`
      })
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

export {
  createDefaultUsers,
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
}