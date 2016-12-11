#!/usr/bin/env bash
./aws_set_env_prod.sh
./aws_deploy_func_to_prod.sh create-function HNSlackAuth ././../../functions/lambda/HNSlackAuth.js
./aws_deploy_func_to_prod.sh create-function HNSlackCommand ././../../functions/lambda/HNSlackCommand.js
./aws_deploy_func_to_prod.sh create-function HNSlackCommandHN ././../../functions/lambda/HNSlackCommandHN.js