import axios from "axios";

export const makeApiRequest = async (
	base64image: string
): Promise<{ data?: string | null; error?: any }> => {
	if (!base64image) return { error: "no image was provided" };

	return await axios
		.post("http://localhost:8080/image2text", {
			image: base64image,
		})
		.then((response) => {
			console.log(
				"%c response: ",
				"color: mediumseagreen; font-weight: bold;",
				response
			);
			if (response.data) return { data: response.data };
			return { data: null };
		})
		.catch((error) => {
			console.log(
				"%c error: ",
				"color: mediumseagreen; font-weight: bold;",
				error
			);
			return { error };
		});
};
