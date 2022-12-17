const useSearch = (
	array: Array<{ [key: string]: string | number }>,
	value: string,
	excludedKeys: string[] = []
) => {
	return array.filter((el) => {
		const keys = Object.keys(el).filter((key) => {
			for (const excludedKey of excludedKeys) {
				if (excludedKey === key) {
					return false;
				}
			}
			return true;
		});
		for (const key of keys) {
			if (el[key].toString().toLowerCase().startsWith(value.toLowerCase())) {
				return el;
			}
		}
	});
};

export default useSearch;
