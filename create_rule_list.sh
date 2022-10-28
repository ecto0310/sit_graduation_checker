rules="[]"

for file_path in $(find "public/rule" -type f | gawk -F/ '{print $NF}'); do
  title=$(cat "public/rule/${file_path}" | jq -r .title)

  rules=$(
    echo ${rules} |
      jq '. |= .+[{"title":"'"${title}"'","name":"'"${file_path}"'"}]'
  )
done

echo ${rules} > "./public/rules.json"
