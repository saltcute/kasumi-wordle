import Kasumi, { BaseMenu } from "kasumi.js"
import "./event"
import RepeatKmdCommand from "commands/kmd"

export default class AppMenu extends BaseMenu {
    name = "echo"
    prefix = "./!"

    init(client: Kasumi<any>, loggerSequence: string[]): void {
        super.init(client, loggerSequence)

        this.load(new RepeatKmdCommand())
    }
}
