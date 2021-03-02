import request from './ajax'

export const getBugList = () => {
  request.get('/get_bug_list').then(res=>{
    console.log(res, 'res')
  })
}
getBugList()