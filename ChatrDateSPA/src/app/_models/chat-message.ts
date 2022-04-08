export class ChatMessage {
    $key?: string;
    userName?: string;
    userReceived?: string;
    idSent?: number;
    photoUrl?: string;
    seen?: boolean;
    message?: string;
    timeSent?: Date = new Date();
}