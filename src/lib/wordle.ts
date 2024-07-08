import * as fs from "fs";
import upath from "upath";
import crypto from "crypto";
import Kasumi from "kasumi.js";
import { WordleSession } from "./session";

export class Wordle {
    words: {
        [word: string]: {
            中释: string;
            英释: string;
        };
    } = {};
    dictionary: {
        [word: string]: 1;
    } = {};

    constructor() {
        const dictionaryPath = upath.join(__dirname, "..", "..", "dictionary");
        const files = fs.readdirSync(upath.join(dictionaryPath, "word_sets"));
        for (const file of files) {
            if (file.endsWith(".json") && file.includes("CET")) {
                const dictionaryRaw = fs.readFileSync(
                    upath.join(dictionaryPath, "word_sets", file),
                    { encoding: "utf-8" }
                );
                this.words = {
                    ...this.words,
                    ...JSON.parse(dictionaryRaw),
                };
            }
        }
        const dictionaryRaw = fs.readFileSync(
            upath.join(dictionaryPath, "valid_words.json"),
            { encoding: "utf8" }
        );
        this.dictionary = JSON.parse(dictionaryRaw);
    }

    channelSession: {
        [channelId: string]: WordleSession;
    } = {};

    public getSession(channelId: string): WordleSession | undefined {
        const session = this.channelSession[channelId];
        if (session && !session.failed) {
            return session;
        } else {
            this.finishGame(channelId);
        }
    }

    public checkWord(word: string) {
        return Object.keys(this.dictionary).includes(word);
    }

    public guess(channelId: string, guess: string, user: Buffer) {
        const session = this.getSession(channelId);
        if (session) {
            return session.guess(guess, user);
        }
    }

    public getRandomWord(length: number) {
        const filtered = Object.keys(this.words).filter(
            (v) => v.length == length
        );
        return filtered[crypto.randomInt(filtered.length)].toLowerCase();
    }

    public newGame(client: Kasumi<any>, channelId: string, length: number) {
        const session = this.getSession(channelId);
        if (session) {
            return false;
        } else {
            this.channelSession[channelId] = new WordleSession(
                client,
                this.getRandomWord(length),
                channelId
            );
            return true;
        }
    }

    public finishGame(channelId: string) {
        this.channelSession[channelId]?.job?.cancel();
        delete this.channelSession[channelId];
    }
}
