#!/usr/bin/env bash
./wsk_set_env_prod.sh
./wsk_deploy_func_to_prod.sh update HNSlackAuth ././../../functions/openwhisk/HNSlackAuth.js
./wsk_deploy_func_to_prod.sh update HNSlackCommand ././../../functions/openwhisk/HNSlackCommand.js
./wsk_deploy_func_to_prod.sh update HNSlackCommandHN ././../../functions/openwhisk/HNSlackCommandHN.js