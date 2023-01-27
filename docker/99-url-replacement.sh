#!/bin/sh

if [ ! -z $DEVENV ] && [ $DEVENV = "dev" ]; then
    echo  "replace ENV to dev = $@"
    sed -i 's@http://devp.ubix@https://api.dev20021.ubix@g' /usr/share/nginx/html/js/*
fi

