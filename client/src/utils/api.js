export const createUser = (userData) => {
	return fetch('/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

export const login = (userData) => {
	return fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

export const saveContent = (userData) => {
	console.log(userData);
	return fetch('/api/users/addProject', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});
};

export const findAllProjects = (token) => {
	return fetch(`api/users/findAllProjects/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	});
};

// export const deleteProject = (id, projectId) => {
//   return fetch(`api/users/deleteProject/${id}`,{
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       // authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(projectId),
//   });
// };

// export const getMe = (token) => {
// 	return fetch('/api/users/me', {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			authorization: `Bearer ${token}`,
// 		},
// 	});
// };
