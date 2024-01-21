import { Response, Request } from "express"

enum getDataFrom {
    'BODY' = 1,
    'HEADERS' = 2,
    'PARAMS' = 3,
}
export const getResponseServiceUtil = (res: Response, messageToSend: string, responseToSend: number) => {
    return res.status(responseToSend).send({ message: messageToSend })
}

export const getDataFromRequestUtil = (req: Request, getDataFrom: getDataFrom) => {
    if (getDataFrom == 1) {
        return req.body;
    } else if (getDataFrom == 2) {
        return req.headers;
    } else {
        return req.params;
    }
}