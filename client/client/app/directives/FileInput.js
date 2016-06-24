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

				let formData = new FormData();
				let fileField = el.children()[0];
				formData.append('image', fileField.files[0]);
				el.children().eq(0).val('');

				$http({
					url: scope.url,
					method: 'POST',
					data: formData,
					headers: {
						'Content-Type': undefined
					}
				}).success((data) => {
					scope.onUploaded({
						path: data.path
					});
				});
			});
		},
		template: '<input type="file" />'
	};
};

export default fileInput;
