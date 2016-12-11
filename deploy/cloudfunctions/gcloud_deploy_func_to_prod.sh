#!/bin/bash
absPath() {
    if [[ -d "$1" ]]; then
        cd "$1"
        echo "$(pwd -P)"
    else 
        cd "$(dirname "$1")"
        echo "$(pwd -P)/$(basename "$1")"
    fi
}

strindex() { 
  x="${1%%$2*}"
  [[ $x = $1 ]] && echo -1 || echo ${#x}
}

source ./gcloud_set_env_prod.sh
func_name=$1
func_file_name=$2
func_rel_file_name=$(echo $func_file_name | sed 's/.*\///')
func_rel_file_name=$(echo $func_rel_file_name | sed 's/\.[^.]*$//')
func_tmp_file_dir=$(echo $(dirname $(absPath ${BASH_SOURCE[0]}))'/release/prod/__'$func_rel_file_name'__')
func_tmp_file_name=$(echo $func_tmp_file_dir'/index.js')
mkdir -p $func_tmp_file_dir
pushd $(dirname $(absPath $func_file_name))
j2 $func_file_name > $func_tmp_file_name
popd
# create json file
param_first=true
param_json=$(echo "")
while read -r line; do
	param_name=$(echo $line | sed 's/^.*\:[ ]*\(.*\)$/\1/')
	if [ -n "$param_name" ]
	then
		if [ $param_first = true ]
		then
			param_first=false
			param_json=$(echo "{")
		else
			param_json=$(echo $param_json', ')
		fi
		param_value=$(cat ../../params/cloudfunctions/default_params_prod.txt | sed -n 's/^'$param_name'[^=]*=[ ]*\(.*\)$/\1/p')
		param_value=$(echo $param_value | sed "s/\'/\"/g")
		if [ $(strindex "$param_value" "{") == 0 ]
		then
			param_json=$(echo $param_json'"'$param_name'": '$param_value)
		else
			param_json=$(echo $param_json'"'$param_name'": "'$param_value'"')
		fi
	fi
done <<< "$(grep -E '\$DefaultParam\:[ ]*.*' $func_tmp_file_name)"
if [ $param_first = false ]
then
	param_json=$(echo $param_json' }')
fi
func_json_file_name=$(echo $func_tmp_file_dir'/config.json')
rm -rf $func_json_file_name
touch $func_json_file_name
if [ $param_first = false ]
then
	echo $param_json > $func_json_file_name
else
	echo '{}' > $func_json_file_name
fi
# cd into func dir and run
pushd $func_tmp_file_dir
gcloud_cmd=$(echo gcloud alpha functions deploy $func_name --stage-bucket slack-hn-cloud-functions --trigger-http)
echo $gcloud_cmd
eval $gcloud_cmd
popd