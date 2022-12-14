import { createWorker, ImageLike } from "tesseract.js";

const worker = createWorker({
	logger: (m) => console.log(m),
});

const imageReader = async (file: ImageLike) => {
	await worker.load();
	await worker.loadLanguage("eng+pol");
	await worker.initialize("eng+pol");
	const {
		data: { text },
	} = await worker.recognize(file);
	console.log(text);
	worker.terminate;
};

export default imageReader;
