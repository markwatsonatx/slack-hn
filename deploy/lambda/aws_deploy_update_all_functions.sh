#!/usr/bin/env bash
./aws_set_env_prod.sh
./aws_deploy_func_to_prod.sh update-function-code HNSlackAuth ././../../functions/lambda/HNSlackAuth.js
./aws_deploy_func_to_prod.sh update-function-code HNSlackCommand ././../../functions/lambda/HNSlackCommand.js
./aws_deploy_func_to_prod.sh update-function-code HNSlackCommandHN ././../../functions/lambda/HNSlackCommandHN.js