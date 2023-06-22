import {Knex} from 'knex';

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      user: string,
      password: string,
      created_at: string,
      session_id?: string
    }
  }

  export interface Tables {
    meals: {
      id: string
      user_id: string,
      name: string
      description: string,
      date: string,
      hour: string,
      isInDiet: number,
      created_at: string,
      session_id?: string
    }
  }  
}
