const useGenerateId = () => {
	return Date.now().toString() + Math.random().toString();
};

export default useGenerateId;
