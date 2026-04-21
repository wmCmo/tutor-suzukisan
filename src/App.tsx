import { useState } from "react";
import getPitch from "./queries/getPitch";
import type MoraDataType from "./types/MoraData";

export default function App() {
  const [guide, setGuide] = useState<MoraDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sentence, setSentence] = useState('');

  async function handleSubmit() {
    const payLoad = sentence.trim();
    if (payLoad.length < 1) return;
    setIsLoading(true);
    const res = await getPitch(payLoad);
    if (res.data) {
      setGuide(res.data);
    }
    setIsLoading(false);
  }

  return (
    <div className="relative h-dvh text-text flex flex-col items-center justify-center px-4 space-y-4 max-w-md mx-auto">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-semibold text-center">Prosody Tutor <span className="font-black text-main">Suzuki-san</span></h1>
        <img className="h-6" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f363.svg" alt="Notion's sushi emoji" />
      </div>
      {
        guide.length > 0 &&
        <div className="flex flex-wrap mt-4 px-4 py-2 rounded-lg border border-subAlt justify-center">
          {guide.map((mora, index) => {
            return (
              <div key={index} className={`${mora.isAccented && "text-error"} ${mora.isUnvoiced && "text-sub"} font-semibold`}>
                {mora.char}
              </div>
            );
          })}
        </div>
      }
      <textarea className="py-2 px-4 outline-none bg-white rounded-lg border border-subAlt resize min-w-full sm:min-w-xs min-h-12 max-w-full" name="sentence" id="sentence" onChange={e => setSentence(e.target.value)} placeholder="Your Japanese sentence here..."></textarea>
      <button className={`rounded-full font-bold ${isLoading ? "bg-main/80" : "cursor-pointer bg-main"} px-6 py-2 text-white hover:translate-y-0.5 active:translate-y-1 transition duration-200 ease-out`} type="button" onClick={handleSubmit} disabled={isLoading} >{isLoading ? "loading..." : "Submit"}</button>
      <a href="https://www.gavo.t.u-tokyo.ac.jp/ojad/eng/phrasing/index" rel="noopener noreferrer" target="_blank"  className="absolute bottom-4 text-sub text-center hover:underline underline-offset-2 cursor-pointer">Original Website</a>
    </div>
  );
}
