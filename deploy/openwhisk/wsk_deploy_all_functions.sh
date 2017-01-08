#!/usr/bin/env bash
./wsk_set_env_prod.sh
./wsk_deploy_func_to_prod.sh HNSlackAuth ././../../functions/openwhisk/HNSlackAuth.js
./wsk_deploy_func_to_prod.sh HNSlackCommand ././../../functions/openwhisk/HNSlackCommand.js
./wsk_deploy_func_to_prod.sh HNSlackCommandTopStories ././../../functions/openwhisk/HNSlackCommandTopStories.js
./wsk_deploy_func_to_prod.sh HNSlackMessage ././../../functions/openwhisk/HNSlackMessage.js