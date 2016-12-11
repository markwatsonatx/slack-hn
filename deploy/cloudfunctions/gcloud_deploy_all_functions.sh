#!/usr/bin/env bash
./gcloud_set_env_prod.sh
./gcloud_deploy_func_to_prod.sh HNSlackAuth ././../../functions/cloudfunctions/HNSlackAuth.js
./gcloud_deploy_func_to_prod.sh HNSlackCommand ././../../functions/cloudfunctions/HNSlackCommand.js
./gcloud_deploy_func_to_prod.sh HNSlackCommandHN ././../../functions/cloudfunctions/HNSlackCommandHN.js