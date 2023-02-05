import { pool } from "../models/postgres";
import { Permission } from "../types/group"; 

export default class GroupService {
  getGroups = () => pool.query('SELECT * FROM groups')
  getGroupById = (id: number) => pool.query('SELECT * FROM groups WHERE id = $1', [id])
  createGroup = (
      id: string,
      name: string,
      permissions: Array<Permission>
    ) => pool.query(
      'INSERT INTO groups (id, name, permissions) VALUES ($1, $2, $3) RETURNING *',
      [ id, name, permissions ]
    )
  updateGroup = (
      id: string,
      name: string,
      permissions: Array<Permission>
    ) => pool.query(
      'UPDATE groups SET name = $2, permissions = $3 WHERE id = $1',
      [ id, name, permissions ]
    )
  deleteGroup = (id: number) => pool.query(
      'DELETE FROM groups WHERE id = $1',
      [id],
    )
  addUsersToGroup = (users_id: string[], group_id: string) => {
    const queryArray: string[] = [];

    users_id.forEach((user_id) => queryArray.push(`INSERT INTO "users_groups" (${user_id}, ${group_id}) VALUES ($1, $2)`));
    const finalQuery = queryArray.join('; ');
    console.log(finalQuery);

    const la = `INSERT INTO users_groups (user_id, group_id) VALUES ($1, $2)`
    console.log(la);
    
    
    return pool.query(
      // 'INSERT INTO users_groups (user_id, group_id) VALUES ($1, $2) RETURNING *',
      // `BEGIN;
      // ${finalQuery},
      // COMMIT;`,
      finalQuery,
      [users_id, group_id]
    )
  }
  // pool.query(
  //   // 'INSERT INTO users_groups (user_id, group_id) VALUES ($1, $2) RETURNING *',
  //   `BEGIN;
  //   INSERT INTO users_groups (user_id, group_id) SELECT 1 as user_id, unnest(users_id) AS user_id;
  //   COMMIT;`,
  //   [users_id, group_id]
  // )
}