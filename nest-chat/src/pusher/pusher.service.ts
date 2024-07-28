import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';


@Injectable()
export class PusherService {

    Pusher: Pusher;

    constructor() {
        this.Pusher = new Pusher({
            appId: process.env.appId,
            key: process.env.key,
            secret: process.env.secret,
            cluster: "ap2",
            useTLS: true,
        });
    }
    async trigger(channel: string, event: string, data: any){
        await this.Pusher.trigger(channel,event,data);
    }
}
