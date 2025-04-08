// httpTodoService.js


import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://beanstalk.ssg-kdt.click/todo',   // Boot 서버에 반드시 CORS 설정 필수
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

// Todo 목록보기
export async function fetchFindAll(token) {

    const response = await instance.get(`/todos`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log("findAll.response:", response)

    return response;
}

// Todo 저장
export async function fetchSave(todo, token) {

    const response = await instance.post(`/todos`, todo,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

    console.log("fetchSave.response:", response)

    return response;
}

// Todo 자세히보기
export async function fetchFindById(id, token) {

    const response = await instance.get(`/todos/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

    console.log("findById.response:", response)

    return response;
}

// Todo 수정하기
export async function fetchUpdate(id, todo, token) {

    const response = await instance.put(`/todos/${id}`, todo,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log("fetchUpdate.response:", response)

    return response;

}

// Todo 삭제하기
export async function fetchRemove(id, token) {

    const response = await instance.delete(`/todos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`

        }
    });

    return response;
}