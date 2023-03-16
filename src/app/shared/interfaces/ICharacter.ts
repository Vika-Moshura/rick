import { IResultResponse } from "./IResult";

export interface ICharacterResponse {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: null | string,
    },
    results: IResultResponse[],
}