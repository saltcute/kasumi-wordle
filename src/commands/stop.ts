import Kasumi, {
    BaseCommand,
    BaseSession,
    Card,
    CommandFunction,
} from "kasumi.js";
import { CustomStorage } from "@/config/type";
import wordle from "../lib";

export default class WordleStopCommand extends BaseCommand<
    Kasumi<CustomStorage>
> {
    name = "stop";
    description = "强制停止 Wordle 游戏";
    func: CommandFunction<BaseSession, any> = async (session) => {
        wordle.finishGame(session.channelId);
        session.reply(new Card().addTitle("已停止游戏"));
    };
}
