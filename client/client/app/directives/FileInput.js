const fileInput = ($http) => {
	"ngInject";
	return {
		restrict: 'E',
		scope: {
			url: '@',
			onUploaded: '&onUploaded'
		},
		link: (scope, el, attrs) => {
			el.bind('change', () => {

				const formData = new FormData();
				const fileField = el.children()[0];
				formData.append('image', fileField.files[0]);
				el.children().eq(0).val('');

				$http({
					url: scope.url,
					method: 'POST',
					data: formData,
					headers: {
						'Content-Type': undefined
					}
				}).then((response) => {
					scope.onUploaded({
						path: response.data.path
					});
				});
			});
		},
		template: '<input type="file" />'
	};
};

export default fileInput;
