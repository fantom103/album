const photoFactory = function ($http) {
	"ngInject";

	const getPhotos = () => {
		return $http.get('http://localhost:9090/api/album/');
	};

	const getPhoto = (id) => {
		return $http.get(`http://localhost:9090/api/album/${id}`);
	};

	const getPhotoDetails = (id) => {
		return $http.get(`http://localhost:9090/api/album/${id}/details`);
	};

	const addPhoto = (title, path) => {
		return $http.post('http://localhost:9090/api/album/', {title, path});
	};

	const updatePhoto = (id, title, path) => {
		return $http.put(`http://localhost:9090/api/album/${id}`, {title, path});
	};

	const deletePhoto = (id) => {
		return $http.delete(`http://localhost:9090/api/album/${id}`);
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
