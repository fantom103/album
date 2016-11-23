const photoFactory = function ($http, config) {
	"ngInject";

	const {api} = config;

	const getPhotos = () => {
		return $http.get(`${api}/album/`);
	};

	const getPhoto = (id) => {
		return $http.get(`${api}/album/${id}`);
	};

	const getPhotoDetails = (id) => {
		return $http.get(`${api}/album/${id}/details`);
	};

	const addPhoto = (title, path) => {
		return $http.post(`${api}/album/`, {title, path});
	};

	const updatePhoto = (id, title, path) => {
		return $http.put(`${api}/album/${id}`, {title, path});
	};

	const deletePhoto = (id) => {
		return $http.delete(`${api}/album/${id}`);
	};

	return {
		getPhotos,
		getPhoto,
		getPhotoDetails,
		addPhoto,
		updatePhoto,
		deletePhoto
	}
};

export default photoFactory;
