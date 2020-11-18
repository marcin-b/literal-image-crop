import { useEffect, useState, useRef } from "react";

export const useDrawingOnCanvas = (image: HTMLImageElement | null) => {
	const width = window.innerWidth;
	const canvasRef = useRef(null);
	const [coorinates, setCoordinates] = useState([]);
	const [canvasWidth, setCanvasWidth] = useState(0);
	const [canvasHeight, setCanvasHeight] = useState(0);

	console.log(
		"%c image: ",
		"color: mediumseagreen; font-weight: bold;",
		image
	);

	useEffect(() => {
		if (image) {
			const canvas: any = canvasRef.current;
			// setCanvasWidth(canvas.width);
			// setCanvasHeight(canvas.height);
			const ctx = canvas.getContext("2d");
			// ctx.drawImage(image, image.width, image.height);
		}
		return void null;
	}, [image]);

	return { coorinates, setCoordinates, canvasRef, canvasWidth, canvasHeight };
};
