import {Knex} from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      user: string,
      password: string,
      created_at: string
      session_id?: string
    }
  }
}
