export interface ResultItem {
    type: "correct" | "misplaced" | "wrong";
    character: string;
    author: Buffer;
}

export interface GuessResult {
    finished: boolean;
    win: boolean;
    items: ResultItem[];
}
