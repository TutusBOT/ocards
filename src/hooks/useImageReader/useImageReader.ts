import { createWorker, ImageLike } from "tesseract.js";

const worker = createWorker({
	logger: (m) => console.log(m),
});

interface imageReader {
	file: ImageLike;
	separators: string[];
}

const imageReader = async ({ file, separators }: imageReader) => {
	await worker.load();
	await worker.loadLanguage("eng+pol");
	await worker.initialize("eng+pol");
	const {
		data: { text },
	} = await worker.recognize(file);
	worker.terminate;
	let array = text.split("\n").filter((t) => t);

	separators.forEach((separator) => {
		array = array.map((card) => card.split(separator)).flat();
	});

	return array.map((text) => text.trim());
};

export default imageReader;
