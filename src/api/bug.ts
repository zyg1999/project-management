import request from './ajax';

type ListParams = {
  limit: number;
  offset: number;
  status?: number;
  priority_status?: number;
  begin_time?: number;
  end_time?: number;
  solve_type?: number;
  type?: number;
  opportunity?: number;
  user_id?: string;
  is_assign: number;
};
export const getBugList = (params: ListParams) => request.get('/api/bug/list', params);

type AddBugParams = {
  system_id: number;
  demand_id: number;
  title: string;
  priority_status: number;
  reporter_id: string;
  handler_id: string;
  type: number;
  opportunity: number;
  solve_type: number;
  desc: string;
};
export const addBug = (params: AddBugParams) => request.post('/api/bug/add', params);

type Solve = {
  bug_id: number;
  solve_type: number;
  status: number;
};
export const solveBug = (params: Solve) => request.post('/api/bug/solve', params);
