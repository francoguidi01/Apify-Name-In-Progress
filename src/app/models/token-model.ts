export class TokenModel {
    access_token: string = '';
    expires_in: number = 3600;
    token_type: string = "Bearer";


    constructor(data: any) {
        this.access_token = data.access_token;
        this.token_type = data.token_type;
        this.expires_in = data.expires_in;
    }
}
