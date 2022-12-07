const useSearch = (
	array: Array<any>,
	value: string,
	excludedKeys: string[] = []
) => {
	return array.filter((el) => {
		const keys = Object.keys(el).filter((key) => {
			for (let excludedKey of excludedKeys) {
				if (excludedKey === key) {
					return false;
				}
			}
			return true;
		});
		for (let key of keys) {
			if (el[key].toString().toLowerCase().startsWith(value.toLowerCase())) {
				return el;
			}
		}
	});
};

export default useSearch;
