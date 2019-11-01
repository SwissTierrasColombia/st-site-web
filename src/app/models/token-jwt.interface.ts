export interface TokenJwt {
    jti: string;
    exp: number;
    nbf: number;
    iat: number;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    auth_time: number;
    session_state: string;
    acr: string;
    'allowed-origins': string[];
    realm_access: Realmaccess;
    resource_access: Resourceaccess;
    scope: string;
    email_verified: boolean;
    name: string;
    groups: any[];
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

export interface Resourceaccess {
}

export interface Realmaccess {
    roles: string[];
}