const redis =require('redis');



class PubSub{
    constructor(){
        this.pub=redis.createClient();
        this.sub=redis.createClient();
    }

}