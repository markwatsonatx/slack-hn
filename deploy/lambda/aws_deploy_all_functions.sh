#!/usr/bin/env bash
./aws_set_env_prod.sh
./aws_deploy_func_to_prod.sh HNSlackAuth ././../../functions/lambda/HNSlackAuth.js
./aws_deploy_func_to_prod.sh HNSlackCommand ././../../functions/lambda/HNSlackCommand.js
./aws_deploy_func_to_prod.sh HNSlackCommandTopStories ././../../functions/lambda/HNSlackCommandTopStories.js
./aws_deploy_func_to_prod.sh HNSlackMessage ././../../functions/lambda/HNSlackMessage.js