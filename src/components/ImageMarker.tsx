import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { makeApiRequest } from "./makeApiRequest";
// import { useDrawingOnCanvas } from "../hooks"
// import "./ImageMarker.css";

const pixelRatio = window.devicePixelRatio || 1;

function ImageMarker() {
	const [curImg, setCurImg] = useState("")
	const imgRef = useRef(null)
	const canvasRef = useRef(null);
	const [crop, setCrop] = useState({ unit: "%" } as Crop);
	const [completedCrop, setCompletedCrop] = useState(null as unknown as Crop);

	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener("load", () => setCurImg(reader.result as any));
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const onClick = async (canvasRef: any) => {
		if (canvasRef.current) {
			// Split off metadata for google vision api
			const base64Image = canvasRef.current.toDataURL("image/png").split(",")[1];
			const { data, error } = await makeApiRequest(base64Image)
			console.log('%c data: ', 'color: mediumseagreen; font-weight: bold;', data)
		}
		else return null
	}

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		if (!completedCrop || !canvasRef.current || !imgRef.current) {
			return;
		}
		const image = imgRef.current as any;
		const canvas = canvasRef.current as HTMLCanvasElement | null as any;
		const crop = completedCrop as any;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext("2d");

		canvas.width = crop.width * pixelRatio;
		canvas.height = crop.height * pixelRatio;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = "high";

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);
		return void null;
	}, [completedCrop]);

	return (
		<div>

			<div>
				<p>Datei Auswählen</p>
				<div>
					<input type="file" accept="image/*" onChange={onSelectFile} />
				</div>
			</div>
			<p>
				Markiere ein Segmet um es zu extrahieren, oder Nichts um den gesamten Text zu erfassen.
        	</p>
			<ReactCrop
				src={curImg}
				onImageLoaded={onLoad}
				crop={crop}
				onChange={(c: any) => setCrop(c)}
				onComplete={(c: any) => setCompletedCrop(c)}
			/>
			<div>
				{/* <img ref={imgRef} src={img} alt="your text" id="photo-of-text" /> */}
				<canvas ref={canvasRef} style={{
					width: Math.round(completedCrop?.width ?? 0),
					height: Math.round(completedCrop?.height ?? 0)
				}} />
				{/* <img src={img} alt="your text" id="photo-of-text" /> */}
				<button
					type="button"
					disabled={!completedCrop?.width || !completedCrop?.height}
					onClick={() => {
						onClick(canvasRef)
					}}
				>
					Download cropped image
     			</button>
			</div>

		</div>
	);
}

export { ImageMarker };
