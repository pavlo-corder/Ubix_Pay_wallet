#!/bin/sh

if [ ! -z $DEVENV ] && [ $DEVENV = "dev" ]; then
    echo  "replace ENV to dev = $@"
    sed -i 's@http://deva.ubix.network@https://account.dev20021.ubix.network@g' /app.js
fi

