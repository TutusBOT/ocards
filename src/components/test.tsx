import { createWorker } from "tesseract.js";

const worker = createWorker({
	logger: (m) => console.log(m),
});

const imageReader = async (file: any) => {
	await worker.load();
	await worker.loadLanguage("eng+pol");
	await worker.initialize("eng+pol");
	const {
		data: { text },
	} = await worker.recognize(file);
	console.log(text);
	await worker.terminate;
};

const test = ({ file }: { file: any }) => {
	return (
		<button
			onClick={() => {
				console.log(file);

				const reader = new FileReader();
				reader.addEventListener("load", () => {
					if (file) imageReader(reader.result);
				});
				reader.readAsDataURL(file);
			}}
		>
			Test
		</button>
	);
};
export default test;
