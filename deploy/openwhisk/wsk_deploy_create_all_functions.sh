#!/usr/bin/env bash
./wsk_set_env_prod.sh
./wsk_deploy_func_to_prod.sh create HNSlackAuth ././../../functions/openwhisk/HNSlackAuth.js
./wsk_deploy_func_to_prod.sh create HNSlackCommand ././../../functions/openwhisk/HNSlackCommand.js
./wsk_deploy_func_to_prod.sh create HNSlackCommandHN ././../../functions/openwhisk/HNSlackCommandHN.js