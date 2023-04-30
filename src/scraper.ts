import axios from "axios";
import { load } from "cheerio";
// import {}

const url = "https://www.lavuelta.es/en/rankings/stage-20";

interface RiderData {
	name: string;
	riderNo: number;
	team: string;
	hours: number;
	minutes: number;
	seconds: number;
}

const handler = async () => {
	const AxiosInstance = axios.create();
	let result = "";
	AxiosInstance.get(url)
		.then((res) => {
			const html = res.data;
			const $ = load(html);
			const rankingsTableRows = $(".rankingTable > tbody > tr");
			const rankings: RiderData[] = [];

			rankingsTableRows.each((i, elem) => {
				const name = $(elem)
					.find(".runner > a")
					.text()
					.replace(/(\r\n|\n\r)/gm, "")
					.trim();
				const riderNo = parseInt($(elem).find("td:nth-child(3)").text());
				const team = $(elem)
					.find("td.break-line.team")
					.text()
					.replace(/(\r\n|\n\r)/gm, "")
					.trim();
				const timeArray: number[] =
					$(elem)
						.find("td:nth-child(5)")
						.text()
						.match(/[0-9]+/g)
						?.map((val) => parseInt(val)) || [];
				rankings.push({
					name,
					riderNo,
					team,
					hours: timeArray[0],
					minutes: timeArray[1],
					seconds: timeArray[2],
				});
			});

			console.log({ rankings });
		})
		.catch(console.error);
	return result;
};

export default handler;
