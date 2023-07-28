# BNG Payment Spike
Spike to explore the potential usage of GOV.UK Pay within BNG.

## Prerequisites
* Node 16
* GOV.UK Pay Development Account

## Running Application
The following environment variables will need to be set before running the application:
| Name                 	| Description                        	| Required 	|
|----------------------	|------------------------------------	|----------	|
| PORT              	| Node server port                   	| No      	|
| PAYMENT_API_KEY    	| GOV UK Pay API Key                 	| Yes      	|

```bash
npm install
npm run build
npm run start:watch
```
