import { Button } from "@mui/material";
import { useCallback, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 1280,
	height: 720,
	facingMode: { exact: "environment" },
};

const Camera = () => {
	const webcamRef = useRef<Webcam>(null);

	const capture = useCallback(() => {
		if (webcamRef.current) {
			const imageSrc = webcamRef.current.getScreenshot();
			console.log(imageSrc);
		}
	}, [webcamRef]);

	return (
		<>
			<Webcam
				audio={false}
				height={720}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				width={1280}
			/>
			<Button onClick={capture}>Capture</Button>
		</>
	);
};
export default Camera;
