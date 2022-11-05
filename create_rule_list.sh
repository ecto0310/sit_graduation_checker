rules="[]"

for file_path in $(find "public/rules" -type f | sort | gawk -F/ '{print $NF}'); do
  title=$(cat "public/rules/${file_path}" | jq -r .title)

  rules=$(
    echo ${rules} |
      jq '. |= .+[{"title":"'"${title}"'","name":"'"${file_path}"'"}]'
  )
done

echo $(echo ${rules} | jq '{"ruleFiles":'"${rules}"'}') > "./public/ruleFiles.json"
