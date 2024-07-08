import { CustomStorage } from "config/type"
import Kasumi, { BaseCommand, BaseSession, CommandFunction } from "kasumi.js"

export default class RepeatKmdCommand extends BaseCommand<
    Kasumi<CustomStorage>
> {
    name = "kmd"
    description = "复读传入的消息"
    func: CommandFunction<BaseSession, any> = async (session) => {
        if (session.args.length) await session.send(session.args.join(" "))
    }
}
