import { Response, Request } from "express"

enum getDataFrom {
    'BODY' = 1,
    'PARAMS' = 2,
    'QUERY' = 3,
}
export const getResponseServiceUtil = (res: Response, messageToSend: string, responseToSend: number) => {
    return res.status(responseToSend).send({ message: messageToSend })
}

export const getDataFromResponseUtil = (req: Request, getDataFrom: getDataFrom) => {
    if (getDataFrom == 1) {
        return req.body;
    } else if (getDataFrom == 2) {
        return req.params;
    } else {
        return req.query;
    }
}