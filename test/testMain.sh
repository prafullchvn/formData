#! /bin/bash

function expectedData(){
  echo '{"name":"Prafull","dob":"2001-05-31","hobbies":["running","walking"],"ph_no":"1234567890","address":"line1\nline2"}'
}

function testMain(){
node ./fillForm.js << eof > /dev/null
Prafull
2001-05-31
running,walking
1234567890
line1
line2
eof

  local testResult='❌'
  if [[ "$(cat './person.json')" == "$( expectedData )" ]] 
  then
    testResult='✅'
  fi
  echo "Main"
  echo -e "\t${testResult} Should register all the responses given."
}

testMain
