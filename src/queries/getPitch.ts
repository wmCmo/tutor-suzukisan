import * as cheerio from 'cheerio';
import type MoraDataType from '../types/MoraData';

export default async function getPitch(sentence: string) {
    try {
        const formData = new URLSearchParams();
        formData.append("_method", "POST");
        formData.append("data[Phrasing][text]", sentence);
        formData.append("data[Phrasing][curve]", "advanced");
        formData.append("data[Phrasing][accent]", "advanced");
        formData.append("data[Phrasing][accent_mark]", "all");
        formData.append("data[Phrasing][estimation]", "crf");
        formData.append("data[Phrasing][analyze]", 'true');
        formData.append("data[Phrasing][phrase_component]", 'invisible');
        formData.append("data[Phrasing][param]", 'invisible');
        formData.append("data[Phrasing][subscript]", 'visible');
        formData.append("data[Phrasing][jeita]", 'invisible');

        const res = await fetch(
            "/ojad/phrasing/index",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            }
        );

        const html = await res.text();
        const $ = cheerio.load(html);

        const moraData: MoraDataType[] = [];

        $('div.phrasing_text > span').each((_, element) => {
            const $span = $(element);
            const classes = $span.attr('class') || "";

            if (classes.includes("endspace")) return;

            const char = $span.find("span.char").text();

            moraData.push({
                char,
                isAccented: classes.includes('accent_top'),
                isUnvoiced: classes.includes('unvoiced')
            });
        });

        return { data: moraData, success: true };

    } catch (error) {
        console.error("Couldn't talk with the server", error);
        return { error, success: false };
    }
}
