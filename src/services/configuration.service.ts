import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Constants } from "../constants.config";
import { Configuration } from "../entities/configuration.class";
import { ServerResponse } from "../entities/srvResponse.class";
// import * as priority from 'priority-web-sdk';
declare var login;

@Injectable()
export class ConfigurationService
{
    configuration: Configuration;

    constructor(private platform: Platform) { }


    /* Initialization.*/
    config(config: Configuration)
        {
            this.configuration = config;
            if (config.language == 1)
            {
                Constants.setRtlTranslations();
                this.platform.setDir('rtl',false);
            }
            else
            {
                Constants.setLtrTranslations();
                this.platform.setDir('ltr',false);
            }
    }

    /** Login - must be after initialization(config). **/
    logIn(username: string, password: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.configuration.username = username;
            this.configuration.password = password;
            login(this.configuration,
                () =>
                {
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    reject(reason.message);
                });
        });
    }

}